import React, {Component} from 'react';
import Avatar from './avatar';
import {Link} from 'react-router'
import {Button} from 'antd';

class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);
        this.renderOther = this.renderOther.bind(this)
        this.renderSideBar = this.renderSideBar.bind(this)
    }
    

    renderOther(publish, info){
        if(info) {
            return <div className="other">
                {info}
            </div>
        }
        if(publish) {
            return <div className="other">
            <Button><Link to={`/${publish}`}>我要发布</Link></Button>
            </div>
        }
        return <div className="other">这个家伙很懒，什么也没有留下～</div>
    }
    renderSideBar(){
        let {publish, info, avatar, desc} = this.props;
        desc = desc || '暂无信息'
        if(!avatar) {
            return (
                <div className="side-bar">
                您还没登录，请先<Link to='signin'>登录</Link>或者<Link to='signup'>注册</Link>
                </div>
            )
        }
        return (
            <div className="side-bar">
                <Avatar style={{width:'5em', height:'5em', borderRadius: '5em'}} avatarUrl = {avatar}/>
                <div className="desc">
                    {desc}
                </div>
                <div className="other">
                    {
                        this.renderOther(publish, info)
                    }
                </div>
            </div>
        )
    }

    render() {
        //let {avatar, desc , publish, info} = this.props;
        //desc = desc || '暂无信息～'
        
        return (
           this.renderSideBar()
        );
    }
}

export default Sidebar;