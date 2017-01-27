import React, {Component} from 'react';
import {Col, Upload, Input, Select, Button ,message} from 'antd';
import MyUpload from '../components/upload'
import Step from '../components/step'
import HotCard from '../components/hotcard'
import Sidebar from '../components/sidebar'
import Tips from '../components/tips'
import {selectConfig} from '../config/index'
import {handle} from '../tools/index'
const Option = Select.Option


class CreateAsk extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleCreateAsk = this.handleCreateAsk.bind(this);
    }

    handleCreateAsk() {
        let title = this.refs.title.refs.input.value;
        let content = this.refs.inputContent.value;
        console.log('正要创建的ask', title, content);
        if(!title || !content) {
            message.error('人家还没写完呢～～～');
            return;
        }

        handle('ask','POST', {title, content}, 'json').then(data =>{
            console.log('我创建了新的ask',data);
            console.log('this', this.context);
            if(!data.err && data._id) {
                this.props.history.push(`/ask/${data._id}`);
            } else {
                message.error('请稍候重试。。。');
            }
        })
        
    }

    
    render() {
        let content = ""
        return (
            <div>
            <Col xs={24} sm={24} md={18} lg={18} className="animated fadeInDown create">
                <Input size="large" placeholder="请输入你的问题~~" ref='title' className="input-title"/>
                <textarea
                    type = 'text'
                    className = 'input-message'
                    ref = 'inputContent'
                    maxLength = {512}
                    onKeyDown={ e => {
                        if (!e.ctrlKey && e.keyCode == 13) {
                            //let msg = this.getMessage.bind(this)();
                            //e.preventDefault();
                            //handleSendMessage(msg.message, msg.Mto, user, msg.time);
                        }
                    }}
                />
                <br/>
                <Button onClick={this.handleCreateAsk}>确认发布</Button>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                <Tips/>
            </Col>
            </div>
        );
    }
}

export default CreateAsk;