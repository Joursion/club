import React, {Component} from 'react';
import {Col, Icon} from 'antd';
import SideBar from '../components/sidebar'
import { Link } from 'react-router';
import HotCard from '../components/hotcard'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from '../actions/index'
import Store from '../store/index'

import {handle, handleHot} from '../tools/index'

const numPerPage = 12;

class Good extends Component {
    constructor(props, context) {
        super(props, context);
        this.getData = this.getData.bind(this)
        this.renderNext = this.renderNext.bind(this)
        this.state = {
            items: [],
            page: 0,
            hot:[],
            hasNext: false
        }
    }
    
    componentDidMount(){
        this.getData()
        handleHot('hotitem').then(data =>{
            this.setState({hot: data})
        })
    }

    getData(){
        let page = this.state.page;
        page ++;
        let items = this.state.items;
        handle(`item/p/${page}`, 'get', [], 'json').then(data =>{
            if(!data.err) {
                //console.log('我在ask首页的信息', data);
                if(data instanceof Array && data.length >= numPerPage){
                    console.log('还有下一页');
                    this.setState({hasNext:true, page: page})
                } else {
                    this.setState({hasNext: false})
                }
                items = items.concat(data)
                this.setState({items: items});
            } else {
                message.error('获取列表失败')
            }
        })
    }

    renderItems(items) {
        if(!items) return null;
        return items.map((v, index) => {
            return (
                <Col xs={24} sm={12} md={12} lg={8} className="one-item" key={`item:${index}`}>
                    <Link to={`/item/${v._id}`} activeClassName="active">
                    <img src = {v.img[0]} className="item-img"/>
                    <div className="item-name">{v.title}</div>
                    <div className="item-content">{v.content}</div>
                    <div className="item-price">¥:{v.price}</div>
                    <Icon type="message" />&nbsp;{v.comment}&nbsp;<Icon type="eye-o" />&nbsp;{v.pv}
                    </Link>
                </Col>
            )
        })
    }

    renderNext(){
        let hasNext = this.state.hasNext;
        if(hasNext) {
            return <div onClick={this.getData} className="next">加载更多</div>
        } else {
            return null
        }
    }

    render() {
        let items = this.state.items;
        let {user} = this.props;
        user = user || {avatar:'', username: ''}
        //console.log('react-connect', user);
        return (
            <div style={{width:'90%', margin:'auto', background:'white',marginTop: 20 }} className="animated zoomIn">
                <Col xs={24} sm={24} md={18} lg={18} className="index">
                <div>
                {
                    this.renderItems(items)
                }
                </div>
                {
                    this.renderNext()
                }
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <SideBar avatar={user.avatar || ''} desc={user.username || ''} publish='create_item'/>
                    <HotCard content={this.state.hot} type={'item'} title={'热门闲置'}/>
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
)(Good)