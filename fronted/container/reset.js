import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Col ,notification } from 'antd';

import { handle } from '../tools/index'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from '../actions/index'
import Store from '../store/index'

const FormItem = Form.Item;

class Reset extends Component {

    openNotification () {
        const args = {
            message: 'Notification Title',
            description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
            duration: 0,
        };
        notification.open(args);
    };

    constructor(props, context) {
        super(props, context);
        this.getCheckNum = this.getCheckNum.bind(this)
    }

    getCheckNum() {
        let email = this.refs.email.refs.input.value;
        let re = new RegExp('/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/');
        if(!email || re.test(email)) {
            message.error('请检查您的邮箱是否正确')
        }
        handle('checknum', 'post', {email}, 'json').then(data => {
            if(data.err) {
                message.error(data.err)
            }
        })
    }
    

    render() {
        return (
              <div className="signin animated rollIn">
                <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }}>
                <Form className="login-form">
                    <FormItem>
                        <Input addonBefore={<Icon type="user" />} placeholder="注册的邮箱" />
                    </FormItem>
                    <FormItem>
                        <Input addonBefore={<Icon type="lock" />}  placeholder="验证码" />
                        <Button onClick={this.getCheckNum}>发送验证码</Button>
                    </FormItem>
                    <FormItem>
                        <Input ref="password" addonBefore={<Icon type="lock" />} type="password" placeholder="请输入新密码" />
                    </FormItem>
                    <FormItem>
                        <Input ref="rpassword" addonBefore={<Icon type="lock" />} type="password" placeholder="请重复密码" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            确定重置密码
                        </Button>
                    </FormItem>
                </Form>
                </Col>
            </div>
        );
    }
}

export default Reset;