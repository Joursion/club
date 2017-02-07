import React, { Component } from 'react';
import { Col, Upload, Input, Select, Button, Icon, Spin, Popconfirm } from 'antd';
import MyUpload from '../components/upload'
import Step from '../components/step'
import Comment from '../components/comment'
import HotCard from '../components/hotcard'
import SideBar from '../components/sidebar'
import Tips from '../components/tips'
import MarkDown from '../components/markd'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import Actions from '../actions/index'
import Store from '../store/index'

import { handle, handleGetComments, handleHot, toMD} from '../tools/index'

class AskPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.reply = this.reply.bind(this);
        this.init = this.init.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.state = {
            comments: [],
            data: {},
            newAsk: []
        }
    }

    componentDidMount() {
        this.init()
    }
    // componentWillAmount(){
    //     this.init()
    // }

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
        handle(`ask/${id}`, 'GET', { t: 1 }, 'JSON').then(data => {
            this.setState({ data: data });
        })
        handleGetComments(id).then(data =>{
            this.setState({comments: data})
        })
        handleHot('newask').then(data =>{
            this.setState({newAsk: data})
        })
    }

    reply(data) {
        if(!data) return;
        let id = this.props.params.id;
        if (!id) {
            message.error('参数错误，请稍候重试。。');
            return;
        }
        data.id = id;
        data.type = 'ask';
        handle(`comment`, 'POST', data, 'JSON').then(data => {
            console.log('我在ask_page ', data)
        })
        data.avatar = this.props.user.avatar;
        let comments = this.state.comments;
        comments.push(data)
        this.setState({ comments: comments });
    }

    handleDel() {
        let id = this.props.params.id;
        handle('ask', 'delete', {id}, 'json').then(data =>{
            if(data.err) {
                message.error('服务器繁忙～')
            } else {
                this.props.history.push('/ask')
            }
        })
    }

    renderAsk(ask) {
        
        let date = new Date(ask.create_at);
        let {user} = this.props;
        let isCreator = false;
        if(user && user.username && user.username == ask.creator) {
            isCreator = true;
        }
        date = date.toLocaleDateString()
        return <div className="ask animated slideInUp">
            <h2>{ask.title}</h2>
            <div className="ask-info">
                <span className="creator">{ask.creator}</span>&nbsp;创建于:&nbsp;{date} &nbsp;<Icon type="eye-o" />&nbsp;{ask.pv}&nbsp;<Icon type="message" />&nbsp;{ask.comment}&nbsp;&nbsp;
                {
                    isCreator ? ( 
                    <Popconfirm title="确定要删除吗？？" okText="确定" cancelText="取消" onConfirm={this.handleDel}>
                        <a href='#' className="delbtn">删除</a>
                    </Popconfirm>) : <div></div>
                }
            </div>
            <div className="line" />
            <div className="ask-content">
                <MarkDown content={ask.content} o={'ask.content'}/>
            </div>
        </div>
    }

    render() {
        let { comments , user } = this.props;
        let ask = this.state.data;
        user = user || {avatar:'', username: ''}
        if(! (ask && ask.creator)) {
            console.warn('暂时没有数据')
            return <div className="loading"> <Spin size='large'></Spin>
             
            </div>
        }
        return (
            <div className="ask-page animated slideInUp">
                <Col xs={24} sm={24} md={18} lg={18} >
                    {
                        this.renderAsk(ask)
                    }
                    <Comment comments={this.state.comments} reply={this.reply} user={user}/>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <SideBar desc={ask.creator|| user.username} avatar={ask.avatar|| user.url}/>
                    <HotCard content={this.state.newAsk} type={'ask'} title={'最新'}/>
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
)(AskPage)
