import React, {Component} from 'react';
import {Col, Upload, Input, Select, Button, DatePicker, message} from 'antd';
import MyUpload from '../components/upload'
import Step from '../components/step'
import HotCard from '../components/hotcard'
import Tips from '../components/tips'
import Sidebar from '../components/sidebar'
import {selectConfig} from '../config/index'
const RangePicker = DatePicker.RangePicker
//import moment from 'moment-timezone/moment-timezone'
const Option = Select.Option

import {handle} from '../tools/index'


class CreateGood extends Component {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this)
        this.handleCreateActivity = this.handleCreateActivity.bind(this)
        this.upload = this.upload.bind(this);
        this.state = {
            current: 1,
            start: '',
            end: '',
            fileList: []
        }
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    componentDidMount(){
        
    }

    onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1], typeof dates[0]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        this.setState({start: dates[0], end: dates[1]});
    }

    handleCreateActivity() {
        let start = this.state.start;
        let end = this.state.end;
        let title = this.refs.title.refs.input.value;
        let content = this.refs.inputContent.value;
        if(!title || !content) {
            message.error('请填写活动详情～~');
            return;
        }
        if(!start || !end) {
            message.error('请选择活动日期');
            return;
        }
        let fileList = this.state.fileList;
        if(!fileList || !fileList.length) {
            message.error('做人，一定要有图有真相嘛。。');
            return;
        }
        fileList = fileList.map((v,index) => v.response);
        handle('activity', 'POST', {start,end,title, content, fileList}, 'json').then(data =>{
            console.log('我创建了activity',data)
            if(!data.err && data._id) {
                this.props.history.push(`/activity/${data._id}`);
            } else {
                message.error('请稍候重试。。。');
            }
        })
    }

    upload(data) {
        let fileList = this.state.fileList;
        //fileList.push(data);
        console.log('我现在的图片列表', fileList);
        this.setState({fileList: data})
    }

    
    render() {
        let content = ""
        return (
            <div>
            <Col xs={24} sm={24} md={18} lg={18} className="animated fadeInDown create">
                <Input size="large" placeholder="请输入活动的标题~~" ref='title' className="input-title"/>

                <div style={{marginTop: 10}}>
                    <label>选择活动日期:</label>
                    <span>&nbsp;&nbsp;</span>
                    <RangePicker style={{ width: 200 }} onChange={this.onChange} />
                </div>
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
                <MyUpload upload = {this.upload} fileList = {this.state.fileList}/>
                <br/>
                <Button onClick={this.handleCreateActivity}>确认发布</Button>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                <Tips/>
            </Col>
            </div>
        );
    }
}

export default CreateGood;