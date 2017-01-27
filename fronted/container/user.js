import React, { Component, ProtoType } from 'react';
import { Row, Col, Upload, Button, Icon, message } from 'antd';
import Avatar from '../components/avatar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'

import Actions from '../actions/index'
import Store from '../store/index'

const imgUrl = 'http://7xrkb1.com1.z0.glb.clouddn.com/'

import { handle, handleGetComments, handleHot} from '../tools/index'

export default class User extends Component{
    constructor(props, context) {
        super(props, context);
        //this.handelChange = this.handelChange.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.renderUserInfo = this.renderUserInfo.bind(this)
        this.state = {
            avatarUrl: 'http://7xrkb1.com1.z0.glb.clouddn.com/2a591fc8-eae7-44b3-9b95-485d03134f57.jpg',
            info: '',
            publish: []
        }
    }

    componentDidMount(){
        handle('user', 'get', [], 'json').then(data =>{
            if(data.err){
                message.error('服务器繁忙')
                return;
            }
            let info = data.info;
            let publish = data.publish;
            this.setState({info: info, publish: publish, avatarUrl: info.url})
        })
    }

    // handelChange(info) {
    //     console.log(info);
    //     if(info.file.status == 'done') {
    //         message.success('头像上传成功~')
    //         console.log(info.file.response);
    //     }
    //     if(info.file.status == 'error') {
    //         message.error('服务器繁忙,不如先做点其他事情吧');
    //     }
    //     let fileList = info.fileList;
    //     fileList = [];
    //     this.setState({fileList: fileList})
    // }

    handleChangeAvatar(e) {
        let fileBtn = e.target;
        
        let imgFile = fileBtn.files[0],
            formdata = new FormData(),
            user = this.props.user,
            isImgReg = /image\/\w+/;
        if (!imgFile || !isImgReg.test(imgFile.type)) {
            console.log('imgFile is not image');
        } else {
            if (imgFile.size > 1 * 1024 * 1024) {
                alert('文件过大');
            } else {
                formdata.append('smfile', imgFile);

                fetch("http://localhost:5000/v1/api/upload", {
                    method: 'POST',
                    body: formdata
                }).then(res => {
                    console.log(res)
                    return res.json()
                })
                .then(res => {
                    console.log('上传头像之后的链接', res)
                    let avatarUrl = imgUrl + res.data;
                    console.warn('=', avatarUrl, user);
                    this.setState({ avatarUrl: avatarUrl })
                    handle('avatar','post',{url: avatarUrl},'json').then(data =>{
                        if(data.err) {
                            message.error('服务器繁忙')
                        }
                        console.log('更换的头像链接',data);
                        this.props.actions.setUser({username: user.username, avatar: data});
                    })
                })
                .catch(e => console.log('handleRegister error', e));
            }
        }
    }

    renderUserInfo() {
        let {user} = this.props;
        if(!user || !user.username) {
            this.props.history.push('/')
            return;
        }
        let info = this.state.info;
        let publish = this.state.publish;
        console.log('即将要渲染的个人--', info, publish)
        let reg_date = info.reg_date;
        let date = new Date(reg_date).toLocaleString()
        return (
            <div className="user-info">
                <div className="info"> 
                    <h3>基本资料</h3>
                    <p>用户名：{info.username}</p>
                    <p>注册邮箱：{info.email}</p>
                    <p>注册于: {date}</p>
                </div>
                <div className="publish">
                    <h3>我发布的</h3>
                    {
                        publish.map((v,index) => {
                            return <div className="one" key={`publish${index}`}>
                                <Link to = {`/${v.type}/${v._id}`}>{v.title}</Link>
                            </div>
                        })
                    }
                </div>
            </div>
        )
        
    }

    render() {
        return (
            <div className="user-page">
                <div className="user-avatar">
                    <Avatar avatarUrl={this.state.avatarUrl}/>
                    <input className = 'info-card-input-file' type='file' onChange = {(e)=>{this.handleChangeAvatar(e)}} /> 
                </div>
                {
                    this.renderUserInfo()
                }
            </div>
        )
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
)(User)



        // defaultFileList: [{
        //     uid: -1,
        //     name: 'xxx.png',
        //     status: 'done',
        //     url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        //     thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        // }, {
        //     uid: -2,
        //     name: 'yyy.png',
        //     status: 'done',
        //     url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        //     thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        // }],

            // <Upload {...props} fileList={this.state.fileList}>
            //         <Button type="ghost">
            //             <Icon type="upload" /> 点击上传
            //         </Button>
            //         </Upload>
            //     <input className = 'info-card-input-file' type='file' onChange = {(e)=>{this.handleChange1(e)}}/>