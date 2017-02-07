import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col , message} from 'antd';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import Actions from '../actions/index'
import Store from '../store/index'

import { handle } from '../tools/index'
const FormItem = Form.Item;

class Signin extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSignin = this.handleSignin.bind(this);
    }

    // vaildCheck(username, password) {
    //     let name_length = username.length;
    //     let pwd_length = password.length;
    //     console.log(name_length, pwd_length);
    //     if (name_length < 2 || name_length > 20) {
    //         this.setState({ err: "用户名需要大于2个字符小于20个字符" });
    //         return false;
    //     } else {
    //         this.setState({ err: undefined });
    //     }

    //     if (pwd_length < 6 || pwd_length > 12) {
    //         this.setState({ err: "密码应大于6位小于12位" });
    //         return false;
    //     } else {
    //         this.setState({ err: undefined });
    //     }
    //     return true;
    // }

    handleSignin() {
        let username = this.refs.username.refs.input.value;
        let password = this.refs.password.refs.input.value;
        if(!username || !password) {
            message.error('验证信息之后再登录～')
            return;
        }
        handle('signin', 'POST', {username, password}, 'json').then(data =>{
            if(!data.err) {
                console.log('我登录的信息', data);
                handle('message', 'get', [], 'json').then(data => {
                    // let length = data.length;
                    // console.log('消息个数', data, length);
                    // if(length) {
                    //     this.props.actions.setMsg(length);
                    // }
                    if(!data.err) {
                        this.props.actions.setMsg(data.num)
                    }
                })
                this.props.history.push('/item');
                this.props.actions.setUser(data);
            } else {
                console.log('error')
                message.error('帐号或者密码错误～，请重试')
            }
        })
    }

    render() {
        return (
              <div className="signin animated rollIn">
                <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }}>
                <Form className="login-form">
                    <FormItem>
                        <Input ref="username" addonBefore={<Icon type="user" />} placeholder="用户名" />
                    </FormItem>
                    <FormItem>
                        <Input ref="password" addonBefore={<Icon type="lock" />} type="password" placeholder="密码～" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.handleSignin}>
                            登录
                        </Button>
                        &nbsp;<Link to="/reset">忘记密码？</Link>
                        <br/>
                        &nbsp;还没有帐号？马上去&nbsp; <Link to="/signup">注册</Link>
                    </FormItem>
                </Form>
                </Col>
            </div>
        );
    }
}
//
//export default Signin;

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
)(Signin)