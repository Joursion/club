import React, {Component} from 'react';
import {Col, Icon, message} from 'antd'
import {Link} from 'react-router'
import SideBar from '../components/sidebar'
import HotCard from '../components/hotcard'
import Avatar from '../components/avatar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from '../actions/index'
import Store from '../store/index'

import {handle , handleHot} from '../tools/index'

class Ask extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            asks: [],
            newAsk: []
        }
    }

    componentDidMount(){
        handle('ask', 'get', [], 'json').then(data =>{
            if(!data.err) {
                this.setState({asks: data});
            } else {
                message.error('获取列表失败')
            }
        })
        handleHot('newask').then(data =>{
            this.setState({newAsk: data})
        })
    }

    componentShouldRecieve() {
        
    }

    renderAsk(asks) {
        if (!asks) return null;
        return asks.map((v, index) => {
            let date = new Date(v.create_at);
            date = date.toLocaleDateString()
            console.log('是否置顶',v.isTop)
            return (
                <Col xs={24} sm={24} md={24} lg={24} className="one-ask" key={`ask:${index}`}>
                    {/*<a href={`/good/${v.url}`} className='good-hover'>*/}
                    <Avatar style={{width:'5em',height:'5em'}} avatarUrl={v.avatar}/>
                    <Link to={`/ask/${v._id}`} activeClassName="active">
                    <div className="ask-data">
                        <h2 className="ask-title">
                        {
                            v.isTop ? <span><Icon type="pushpin" /> </span>: null 
                        }
                        {v.title}
                        </h2>
                        <div className="ask-pre">
                        {v.content}
                        </div>
                        <div><Icon type="message" /> &nbsp;{v.comment} &nbsp;<Icon type="eye-o" />&nbsp; {v.pv} &nbsp;创建于:{date}</div>
                    </div>
                    </Link>
                </Col>
            )
        })
    }
    
    render() {
        let asks = this.state.asks;
        let {user} = this.props;
        user = user || {avatar:'', username: ''}
        return (
            <div style={{width:'90%', margin:'auto', background:'white',marginTop: 20 }} className="animated zoomIn">
                <Col xs={24} sm={24} md={18} lg={18} className="ask-index">
                {
                    this.renderAsk(asks)
                }
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <SideBar avatar={user.avatar || ''} desc={user.username || ''} publish='create_ask'/>
                    <HotCard content={this.state.newAsk} type={'ask'} title={'最新的你答'}/>
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
)(Ask)