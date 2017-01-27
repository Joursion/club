import React, {Component} from 'react';
import {Col, Upload, Input, Select, Button, message} from 'antd';
import MyUpload from '../components/upload'
import Step from '../components/step'
import HotCard from '../components/hotcard'
import Sidebar from '../components/sidebar'
import Tips from '../components/tips'
import {selectConfig} from '../config/index'
import {handle} from '../tools/index'

const Option = Select.Option

//import {Fetch} from '../tools/Fetch'


class CreateGood extends Component {
    constructor(props, context) {
        super(props, context);
        this.initSelectOptions = this.initSelectOptions.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.upload = this.upload.bind(this)
        this.handleCreateGood = this.handleCreateGood.bind(this)
        this.state = {
            current: 1,
            option: 'all',
            fileList: []
        }
    }

    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({option: value})
    }

    // 创建闲置物品
    handleCreateGood() {
        console.log('refs',this.refs);
        let title = this.refs.title.refs.input.value;
        let content = this.refs.inputContent.value
        let option = this.state.option;
        let price = this.refs.price.refs.input.value;
        let fileList = this.state.fileList

        if(!title || !content) {
            message.error('请输入闲置的名称');
            return;
        }
        if(!price) {
            message.error('主人， 难道我一文不值嘛？？')
            return;
        }
        if(!fileList || !fileList.length) {
            message.error('做人，一定要有图有真相嘛。。');
            return;
        }
        fileList = fileList.map((v,index) => v.response);

        console.log(title, content, option, price, fileList);
        handle('item', 'POST', { title, content, option, price, fileList }, 'json').then(data => {
            console.log('我创建了item', data)
            if(!data.err && data._id) {
                this.props.history.push(`/item/${data._id}`);
            } else {
                message.error('请稍候重试。。。');
            }
        });
        //Fetch.request('POST', 'create_good', {tilte, content}, 'json');
    }

    upload(data) {
        console.log('data===',data);
        let fileList = this.state.fileList;
        //fileList.push(data);
        console.log('我现在的图片列表', fileList);
        this.setState({fileList: data})
    }

    initSelectOptions() {
        return (
            <span>
                &nbsp;
                &nbsp;
                <Select size="large" defaultValue={selectConfig[0]} style={{ width: 120 }} onChange={this.handleChange}>
                {
                    // selectConfig.map(v => {
                    //     console.log('v',v);
                    //     return <Option value={`${v}`}> {v} </Option>
                    // })
                }
                <Option value ='全部'>全部</Option>
                </Select>
            </span>
        )
    }

    
    render() {
        let content = ""
        return (
            <div>
            <Col xs={24} sm={24} md={18} lg={18} className="animated fadeInDown create">
                
                <Input size="large" placeholder="请输入闲置的名称~~" ref='title' className="input-title"/>
                {
                    this.initSelectOptions()
                }
                <br/>
                <Input size="large" placeholder="请输入你想要的一个价格吧~" ref='price' className="input-price"/>
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
                <Button onClick={this.handleCreateGood} >确认发布</Button>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                <Tips />
            </Col>
            </div>
        );
    }
}

export default CreateGood;


//<Step current={this.state.current}/>