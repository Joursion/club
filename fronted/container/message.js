import React, {Component} from 'react';
import {Col, Button, message} from 'antd';
import {Link} from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from '../actions/index'
import Store from '../store/index'

import { handle, handleGetComments, handleHot} from '../tools/index'

class Message extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.delMsg = this.delMsg.bind(this)
        this.state = {
            msg: []
        }
    }
    

    componentDidMount() {
        handle('message', 'get', [], 'json').then(data =>{
            if(data) {
                console.log('我的消息记录',data)
                let msg = data.msg;
                if(! (msg instanceof Array)) {
                    msg = [msg]
                }
                this.setState({msg: msg})
            }
        })
    }

    renderMsg() {
        let msg = this.state.msg;
        console.log('jijiang yao xuanran de  msg', msg)
        if(!msg || !msg instanceof Array) return null;
        let type = '回复了你的'
        return msg.map((v, index) => {
            if(v.type == 'join') {
                type = '参加了你的活动'
            }
            return <div className="one-msg" key={`msg:${index}`}>
                {v.f} {type} <Link to={`${v.url}`} >{v.title}</Link>
            </div>
        })
    }

    delMsg() {
        handle('message', 'delete', {}, 'json').then(data =>{
            if(!data.err) {
                this.setState({msg:[]})
                this.props.actions.setMsg(0)
            } else {
                message.error('服务器繁忙，请稍候重试～')
            }
        })
    }


    render() {
        let msg = this.state.msg;
        return (
            <div className="message">
            <div className="Button"><Button onClick={this.delMsg}> 清空消息 </Button></div>
            {
                this.renderMsg()
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        msg: state.msg
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
)(Message)