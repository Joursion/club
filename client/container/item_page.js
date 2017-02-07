import React, { Component } from 'react';
import { Carousel, Col, Button, Icon, Spin, Popconfirm , message} from 'antd'
import Comment from '../components/comment'
import SideBar from '../components/sidebar'
import HotCard from '../components/hotcard'
import MarkDown from '../components/markd'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import Actions from '../actions/index'
import Store from '../store/index'


import { handle, handleGetComments, handleHot} from '../tools/index'


class ItemPage extends Component {
    constructor(props, context) {
        super(props, context)
        this.arrayToImgDiv = this.arrayToImgDiv.bind(this)
        this.onChange = this.onChange.bind(this)
        this.reply = this.reply.bind(this);
        this.renderPage = this.renderPage.bind(this)
        this.init = this.init.bind(this)
        this.handleDelItem = this.handleDelItem.bind(this)
        this.state = {
            comments: [],
            data: {},
            hot:[]
        }
    }


    componentDidMount() {
        console.log('this.props', this.props);
        this.init()
    }

    componentWillReceiveProps(){
        //this.init()
    }

     componentDidUpdate (prevProps) {
        // 上面步骤3，通过参数更新数据
        let oldID = prevProps.params.id
        let newID = this.props.params.id
        //console.log('didupdate===', oldID, newID )
        if(oldID !== newID) {
            this.init()
        }
     }

     init() {
        let id = this.props.params.id;
        handle(`item/${id}`, 'GET', [], 'JSON').then(data => {
            //console.log('我在ask中收到的消息', data);
            this.setState({ data: data });
        })
        handleGetComments(id).then(data => {
            //console.log('获取到的pinglun', data);
            this.setState({ comments: data })
        })
        handleHot('hotitem').then(data =>{
            this.setState({hot:data})
        })
     }

    


    reply(data) {
        if (!data) return;
        let id = this.props.params.id;
        if (!id) {
            message.error('参数错误，请稍候重试。。');
            return;
        }
        data.id = id;
        data.type = 'item';
        handle('comment', 'POST', data, 'JSON').then(data => {
            console.log('我在good_page ', data)
        })
        data.avatar = this.props.user.avatar;
        let comments = this.state.comments;
        comments.push(data)
        this.setState({ comments: comments });
    }

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    arrayToImgDiv(data, className) {
        let items = [];
        if (data instanceof Array) {
            data.forEach((v, index) => {
                items.push(<div key={`className-${index}`} className={className} ><img src={v} style={{ width: '100%', maxHeight: '30em' }} /></div>)
            })
        }
        if (items.length == 0) {
            return <div>因为我害羞，我的主人还没有上传我的照片哦～～～～</div>
        }
        console.log('最后的items');
        return items;
    }

    handleDelItem() {
        let id = this.props.params.id;
        handle('item', 'delete', {id}, 'json').then(data => {
            console.log('即将要删除。。');
            if(data.err) {
                message.error('服务器繁忙');
            } else {
                this.props.history.push('/item');
            }
        })
    }

    renderItem(item) {
        console.warn('渲染次数..');
        let {user} = this.props;
        let isCreator = false;
        if(user && user.username && user.username == item.creator) {
            isCreator = true;
        }
        let date = new Date(item.create_at);
        date = date.toLocaleDateString()
        return (
            <div className="item-info animated slideInUp">
                
                <Col xs={24} sm={24} md={18} lg={18} className="item-detail">
                    <h1 className="item-name">
                        {item.title}
                    </h1>
                    <div className="item-other">
                        <span className="creator">{item.creator} </span>&nbsp;
                        发布于:&nbsp;{date} &nbsp;&nbsp;<Icon type="eye-o" />&nbsp;{item.pv}&nbsp;<Icon type="message" />&nbsp;{item.comment}
                        {
                            isCreator ? ( 
                            <Popconfirm title="确定要删除吗？？" okText="确定" cancelText="取消" onConfirm={this.handleDelItem}>
                                <a href='#' className="delbtn">删除</a>
                            </Popconfirm>) : <div></div>
                        }
                    </div>
                    <Col xs={24} sm={24} md={24} lg={24} className="item-show-img">
                    <Carousel afterChange={this.onChange}>
                        {
                            this.arrayToImgDiv(item.img, 'show-img')
                        }
                    </Carousel>
                    </Col>
                    <div className="item-price">
                        <span className="price-only">
                        价格&nbsp;<Icon type="pay-circle-o" />&nbsp;:&nbsp; 
                        </span>
                        {item.price}
                    </div>
                    <div className="describe-only">描述:&nbsp;</div>
                    <div className="item-describe">
                        <MarkDown content={item.content} />
                    </div>
                   
                </Col>
            </div>
        )
    }

    renderPage() {
        let item = this.state.data;
        let date = new Date(item.create_at);
        date = date.toLocaleDateString()
        let {user} = this.props;
        if ((item.create_at == undefined)) {
            return (
                <div className="loading"> <Spin size='large'></Spin>
                </div>
            ) 
        };
        return (
            <div className="animated  item-page">
                <Col xs={24} sm={24} md={18} lg={18} >
                    {
                        this.renderItem(item)
                    }
                    <Comment comments={this.state.comments} reply={this.reply} user={user}/>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <SideBar desc={item.creator || ''}  avatar={item.avatar || ''}/>
                    <HotCard content={this.state.hot} type={'item'} title={'热门'}/>
                </Col>
            </div>
        )
    }

    render() {
        return (
            <div>
            {
                this.renderPage()
            }
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
)(ItemPage)