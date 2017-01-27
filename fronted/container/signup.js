import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Col, message} from 'antd';
import {Link} from 'react-router'
const FormItem = Form.Item;

import {handle} from '../tools/index'

class Signup extends Component {
    
    constructor(props, context) {
        super(props, context);
        //this.check = this.check.bind(this);
        this.handleSignup = this.handleSignup.bind(this)
        this.getCheckNum = this.getCheckNum.bind(this)
        this.state = {
            checkUser: '',
            checkPass: '',
            checkRPass: '',
            checkRPassHelp: '',
            checkEmail: '',
            checkEmailHelp:'',
            checkNum: '',
            checkNumHelp: ''
        }
        
    }

    checkUser() {
        let user = this.refs.user.refs.input.value;
        if(!user) return;
        handle('check', 'POST', {user}, 'json').then(data =>{
            if(data.err) {
                this.setState()
            }
        })
    }

    checkLength(str, minL, maxL) {
        if(typeof str !== 'string') {
            return false;
        }
        let length = str.length;
        if(length < minL || length > maxL) {
            return false;
        }
        return true;
    }

    // check(type) {
    //      console.log('refs',this.refs, type);
    //      let username = this.refs.username;//.refs.input.value;
    //     console.log('username', username);
    //     if(this.checkLength(username, 5,10)) {
    //         this.setState({checkUser:'err',checkUserHelp:'11'})
    //     }else {
    //         this.setState({checkUser:'success'})
    //     }
        // console.log('user', this.refs.username);
        // switch(type) {
        //     case 'username': {
                
        //         break;
        //     }
        //     case 'password': {
        //         let password = this.refs.password.refs.input.value;
        //         if(this.checkLength(password, 6,20)) {
        //             this.setState({checkPass: 'error', checkPassHelp: '111'})
        //         } else {
        //             this.setState({checkPass:'success'})
        //         }
        //         break;
        //     }
        //     case 'rpassword': {
        //         let password = this.refs.password.refs.input.value;
        //         let rpassword = this.refs.rpassword.refs.input.value;
        //         if(password !== rpassword) {
        //             this.setState({checkRPass:'error', checkRPassHelp:'12'})
        //         } else {
        //             this.setState({checkRPass:'success'})
        //         }
        //         break;
        //     }
        //     case 'email' : {
        //         let email = this.refs.email.refs.input.value;
        //         this.setState({checkUser:'success'})
        //         break;
        //     }
        //     case 'checknum': {
        //         let checknum = this.refs.checknum.refs.input.value;
        //         if(!this.checkLength(checknum,6,6)) {
        //             this.setState({checkNum: 'error', checkNumHelp:'111'})
        //         } else {
        //             this.setState({checkNum:'success'})
        //         }
        //         break;
        //     }
        //     default: {
        //         console.log('check error');
        //     }
        // }
  //  }

    validCheck(username, password, rpassword, email, checknum) {
        // let checkUser = this.state.checkUser;
        // if(checkUser == 'error') return false;
        if(!this.checkLength(username, 5,10)) {
            this.setState({checkUser:'error'})
            return false;
        }else {
            this.setState({checkUser:'success'})
        }
        if(!this.checkLength(password, 6,20)) {
            this.setState({checkPass: 'error'})
            return false;
        } else {
            this.setState({checkPass:'success'})
        }
        if(password !== rpassword) {
            this.setState({checkRPass:'error', checkRPassHelp:'仔细检查一下啦，两次密码不一致哦～'})
            return false;
        } else {
            this.setState({checkRPass:'success', checkRPassHelp:''})
        }
        if(!email) {
            this.setState({checkEmail: 'error', checkEmailHelp:'请输入邮箱'})
            return false;
        }else {
            this.setState({checkEmail:'success', checkEmailHelp:''})
        }
        if(!this.checkLength(checknum,6,6)) {
            this.setState({checkNum: 'error', checkNumHelp:'请输入正确的验证码～～'})
            return false;
        } else {
            this.setState({checkNum:'success', checkNumHelp:''})
        }
        return true;
        //if()
    }

    handleSignup(){
        let username = this.refs.username.refs.input.value;
        let password = this.refs.password.refs.input.value;
        let rpassword = this.refs.rpassword.refs.input.value;
        let email = this.refs.email.refs.input.value;
        let checknum = this.refs.checknum.refs.input.value;
        console.log('==', username,password, rpassword, email, checknum);
        if(this.validCheck(username, password, rpassword, email, checknum)) {
            console.log('check success');
            handle('signup', 'POST', {username, password, email, checknum}, 'json').then(data =>{
                if(!data.err) {
                    console.log('我注册收到的消息',data);
                    this.props.history.push(`/item`);
                } else {
                    message.error(data.err)
                }
            })
        }
    }

    getCheckNum() {
        let email = this.refs.email.refs.input.value;
        // console.log('email', email);
        let re = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
        console.log('email', email, re.test(email));
        if(!email || !re.test(email)) {
            message.error('请检查您的邮箱是否正确')
            return;
        }
        handle('checknum', 'post', {email} , 'json').then(data => {
            if(data.err) {
                message.error(data.err)
            }
        })
    }
    
    render() {
        return (
            <div className="signup animated rollIn">
                <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }}>
                <Form className="login-form">
                    <FormItem 
                        validateStatus={this.state.checkUser}
                        hasFeedback = {true}
                        help='用户名长度为5~10,只能英文'
                    >
                        <Input ref='username' addonBefore={<Icon type="user" />} placeholder="用户名（仅限英文）" autofocus="autofocus" />
                   </FormItem>
                    <FormItem
                        validateStatus={this.state.checkPass}
                        hasFeedback
                        help='密码长度6～20'
                    >
                        <Input ref="password" addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                    </FormItem>
                    <FormItem
                        validateStatus={this.state.checkRPass}
                        hasFeedback
                        help={this.state.checkRPassHelp}
                    >
                        <Input ref="rpassword" addonBefore={<Icon type="lock" />} type="password" placeholder="请重复密码"/>
                    </FormItem>
                    <FormItem 
                        validateStatus={this.state.checkEmail}
                        hasFeedback
                        help={this.state.checkEmailHelp}
                        >
                        <Input ref="email" addonBefore={<Icon type="mail" />} placeholder="你的邮箱" type='email'/>
                    </FormItem>
                    <FormItem
                        label="收到的验证码"
                        validateStatus={this.state.checkNum}
                        hasFeedback
                        help={this.state.checkNumHelp}
                    >
                        <Input ref="checknum" placeholder="验证码" />
                        <Button onClick={this.getCheckNum}>发送验证码</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSignup}>
                            注册
                        </Button>
                        &nbsp; 已经有帐号了？直接<Link to="/signin">登录</Link>
                    </FormItem>
                </Form>
                </Col>
            </div>
        );
    }
}

export default Signup;