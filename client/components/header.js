"use strict"
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Badge, Menu, Icon, Col} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from '../actions/index'
import Store from '../store/index'

import { handle } from '../tools/index'

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        // this.renderUserNotSigned = this.renderUserNotSigned.bind(this);
        this.renderSignedOrNot = this.renderSignedOrNot.bind(this)
        //this.renderUserSigned = this.renderUserSigned.bind(this);
        this.state = {
            current: ''
        }
    }

    componentDidMount(){
        // let token = document.cookie;
        // if(token) {
        // }
        handle('check', 'get', [], 'josn').then(data => {
            if(!data.err) {
                console.log('我的登录状态',data);
                this.props.actions.setUser(data);
            }
        })

        handle('message', 'get', [], 'json').then(data => {
            if(!data.err) {
                this.props.actions.setMsg(data.num)
            }
        })
        // let cookie = document.cookie;
        // if(cookie && cookie) {
        //     let user = 
        //     this.props.actions.setUser()
        // }
    }

    handleClick(e) {
        console.log('click ', e);
        if(e.key == 'setting:signout') {
            // this.props.history.push('/item');
            console.log('this.prop---',this.props);
            handle('signout', 'post', {t:1}, 'json').then(data => {
                console.log('我退出登录的消息',data);
                if(!data.err) {
                    this.props.actions.setUser(undefined);
                }
            })
        }
        this.setState({
            current: e.key,
        });
    }

    renderSignedOrNot(messageCount, user){
        if(typeof user == 'object'){
            let username = user.username;
            return (
                <Menu onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                    <Menu.Item key="about">
                        <Link to="/about">关于</Link>
                    </Menu.Item>
                    <Menu.Item key="message">
                    <Link to="/message">
                        <Badge count={messageCount}>
                            <span className="head-example">消息</span>
                        </Badge>
                    </Link>
                    </Menu.Item>
                    <SubMenu title={<span>{username}</span>}>
                        <MenuItemGroup title="发布">
                            <Menu.Item key="create:item"><Link to="/create_item">闲置</Link></Menu.Item>
                            <Menu.Item key="create:activity"><Link to="/create_activity">活动</Link></Menu.Item>
                            <Menu.Item key="create:ask"><Link to="/create_ask">你答</Link></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置">
                            <Menu.Item key="setting:my">
                            <Link to="/user">我的</Link>
                            </Menu.Item>
                            <Menu.Item key="setting:signout" >退出登陆</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            )
        }
        return (
            <Menu onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                <Menu.Item key="about">
                    <Link to="/about">关于</Link>
                </Menu.Item>
                <Menu.Item key="signin">
                    <Link to="/signin">
                        登录
                    </Link>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link to="/signup">
                        注册
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }
    
    render() {
        let {user, msg} = this.props;
        //user = user || 'xiaoming';
        //console.log('header-connect', user);
        msg = msg || 0
        return (
            <header className="header">
            <Col xs={24} sm={24} md={18} lg={18} className="nav-left">
                 
                 <Menu onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                 >
                    <Menu.Item className="logo" key="logo" style={{fontStyle:'oblique', fontSize:'2rem'}}><Link to="/">N</Link></Menu.Item>
                    <Menu.Item key="item"><Link to="/item">闲置</Link></Menu.Item>
                    <Menu.Item key="activity">
                        <Link to="/activity">活动</Link>
                    </Menu.Item>
                    <Menu.Item key="ask">
                        <Link to="/ask">你答</Link>
                    </Menu.Item>
                    <Menu.Item key="job">
                        <Link to="/job">Job</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            <Col xs={0} sm={0} md={5} lg={4} className="nav-right">
            {
                this.renderSignedOrNot(msg, user)
            }
            </Col>
                
            </header>
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
)(Header)

