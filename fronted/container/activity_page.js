import React, { Component } from 'react';
import { Carousel, Col, Button, Icon, message, Popconfirm, Spin } from 'antd'
import Comment from '../components/comment'
import SideBar from '../components/sidebar'
import HotCard from '../components/hotcard'
import Avatar  from '../components/avatar'
import MarkDown from '../components/markd'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import Actions from '../actions/index'
import Store from '../store/index'

import { handle, handleGetComments ,handleHot } from '../tools/index'


class ActivityPage extends Component {
    constructor(props, context) {
        super(props, context)
        this.arrayToImgDiv = this.arrayToImgDiv.bind(this)
        this.onChange = this.onChange.bind(this)
        this.reply = this.reply.bind(this);
        this.handleJoinActivity = this.handleJoinActivity.bind(this)
        this.init = this.init.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.state = {
            comments: [],
            activity: {},
            hot: {},
            joinData: [],
            join:false
        }
    }

    componentDidMount() {
        this.init()
    }

    shouldComponentUpdate(nextProps,  nextState){
        return true;
    }

    componentDidUpdate (prevProps) {
        let oldID = prevProps.params.id
        let newID = this.props.params.id
        //console.log('didupdate===', oldID, newID )
        if(oldID !== newID) {
            this.init()
        }
    }

    init() {
        let id = this.props.params.id;
        let {user} = this.props;
        handle(`activity/${id}`, 'GET', [], 'JSON').then(data => {
            this.setState({joinData: data.join, join: data.isJoin, activity: data.activity})
        })
        handleGetComments(id).then(data => {
            this.setState({ comments: data })
        })
        handleHot('hotactivity').then(data =>{
            console.log('hotactivity===', data);
            if(data.err) {
                message.error(data.err)
            } else {
                this.setState({hot: data})
            }
        })
    }


    onChange(a, b, c) {
        console.log(a, b, c);
    }

    handleJoinActivity(){
        let id = this.props.params.id;
        let join = this.state.join;
        let joinData = this.state.joinData;
        let {user} = this.props;
        if(!user || !user.username) {
            // this.prorps.history.push('/signin');
            this.props.history.push('/signin');
            return;
        }
        if(join) {
            handle('deljoin', 'post', {id}, 'JSON').then(data => {
                console.log('参加活动之后的信息',data);
                if(!data.err) {
                    if(user && joinData && joinData.length) {
                        let index = joinData.findIndex(v => v.name == user.username);
                        if(index !== -1) {
                            joinData.splice(index,1);
                            this.setState({joinData: joinData});
                        }
                    }
                    this.setState({join:false})
                } else {
                    message.error(data.err);
                }
            })
        } else {
            handle('join', 'post', {id}, 'JSON').then(data => {
                if(!data.err) {
                    if(user && user.username && joinData) {
                        joinData.push({
                            name: user.username,
                            avatar: user.avatar
                        })
                        this.setState({joinData: joinData})
                    }
                    this.setState({join:true})
                } else {
                    message.error(data.err)
                }
            })
        }
    }

    arrayToImgDiv(data, className) {
        let items = [];
        if (data instanceof Array) {
            data.forEach((v, index) => {
                items.push(<div key={`className-${index}`} className={className} ><img src={v} style={{ width: '100%' }} /></div>)
            })
        }
        return items;
    }

    reply(data) {
        if (!data) return;
        let id = this.props.params.id;
        if (!id) {
            message.error('参数错误，请稍候重试。。');
            return;
        }
        data.id = id;
        data.type = 'activity';
        handle('comment', 'POST', data, 'JSON').then(data => {
            console.log('我在good_page ', data)
        })
        data.avatar = this.props.user.avatar;
        let comments = this.state.comments;
        comments.push(data)
        this.setState({ comments: comments });
    }

    renderJoinData(joinData) {
        //console.log('render joinData', joinData)
        if(!joinData || joinData.length == 0) {
            return null
        }
        return joinData.map((v,index) => {
            return <div className="one-join" title={v.name} key={`join-${index}`}>
            <Avatar avatarUrl={v.avatar}/>
            </div>
        })
    }
    
    handleDel() {
        let id = this.props.params.id;
        handle('activity', 'delete', {id}, 'json').then(data =>{
            if(data.err) {
                message.error('服务器繁忙')
            } else {
                this.props.history.push('/activity')
            }
        })
    }

    renderActivity(activity) {
        
        let {user} = this.props;
        let isCreator = false;
        if(user && user.username && user.username == activity.creator) {
            isCreator = true;
        }
        let date = new Date(activity.create_at);
        date = date.toLocaleDateString();
        let start = new Date(activity.start).toLocaleDateString()
        let end = new Date(activity.end).toLocaleDateString()
        return (
            <div className="activity-info">
                <Col xs={24} sm={24} md={18} lg={18} className="activity-show-img">
                    <Carousel afterChange={this.onChange}>
                        {
                            this.arrayToImgDiv(activity.img, 'show-img')
                        }
                    </Carousel>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} className="activity-detail">
                    <h1 className="activity-name">
                        {activity.title}
                    </h1>
                    <div className="activity-other">
                        创建于：&nbsp;{date} &nbsp;&nbsp;<Icon type="user" /> {activity.join} &nbsp;<Icon type="message" /> &nbsp;{activity.comment}&nbsp; <Icon type="eye-o" /> &nbsp;{activity.pv}
                        {
                            isCreator ? ( 
                            <Popconfirm title="确定要删除吗？？" okText="确定" cancelText="取消" onConfirm={this.handleDel}>
                                <a href='#' className="delbtn">删除</a>
                            </Popconfirm>) : <div></div>
                        }
                    </div>
                    <div className="activity-date">活动时间: &nbsp;&nbsp;&nbsp;{start}--{end} </div>
                    <div className="activity-describe">
                        {//<MarkDown content={activity.content} />
                    }
                    {activity.content}
                    </div>
                    
                </Col>
            </div>
        )
    }

    render() {
        let activity = this.state.activity;
        let joinData = this.state.joinData
        let { user } = this.props;
        if (!(activity && activity.creator)) {
            console.warn('没有数据');
            return <div className="loading"> <Spin size='large'></Spin></div>
        };
        return (
            <div className="activity-page">
                <Col xs={24} sm={24} md={18} lg={18} >
                    {
                        this.renderActivity(activity)
                    }
                    <Col xs={24} sm={24} md={24} lg={24} className="join-data">
                    <div className="join-desc">
                        已经参加的人
                        <Button onClick={this.handleJoinActivity} > {this.state.join ? '取消参加' : '我要参加'}</Button>
                    </div>
                    <div className="join-user">
                        {
                            this.renderJoinData(joinData)
                        }
                    </div>
                    </Col>
                    <Comment comments={this.state.comments} reply={this.reply} user = {user}/>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <SideBar desc={activity.creator || ''} avatar={activity.avatar}/>
                    <HotCard content={this.state.hot} type={'activity'} title={'热门活动'}/>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityPage)
