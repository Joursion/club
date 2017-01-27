import React, { Component, ProtoType } from 'react';
import { Row, Col, Upload, Button, Icon, message } from 'antd';


export default class MyUpload extends Component{
    constructor(props, context) {
        super(props, context);
        this.handelChange = this.handelChange.bind(this);
        //this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    }

    handelChange(info, event) {
        if(info.file.status == 'error') {
            message.error('服务器繁忙,不如先做点其他事情吧');
            return;
        }
        if(info.file.status == 'done') {
            message.success('上传成功~~~~',3)
            console.log(info.file.response);
        }
        let fileList = info.fileList;
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        console.log('--info', info);
        fileList = fileList.slice(-2);
        this.props.upload(fileList); 
    }

    // handleChangeAvatar(e){
    //     let fileBtn = e.target;
    //     console.log(e.target);
    //     let imgFile = fileBtn.files[0],
    //         formdata = new FormData(),
    //         user = this.props.user,
    //         isImgReg = /image\/\w+/;
    //     if(!imgFile || !isImgReg.test(imgFile.type)){
    //         console.log('imgFile is not image');
    //     } else{
    //         if(imgFile.size > 1*1024*1024){
    //             alert('文件过大');
    //         } else{
    //             formdata.append('smfile',imgFile);
    //             fetch("http://localhost:5000/upload",{
    //                 method: 'POST',
    //                 body: formdata
    //             }).then(res=> console.log(res))
    //             .catch(e => console.log('handleRegister error',e));
    //         }
    //     }
    // }

    render() {
        let {upload, fileList} = this.props;
        let isSelf = true;
        const props = {
            name: 'file',
            action: 'http://localhost:5000/v1/api/upload',
            headers: {
                authorization: 'authorization-avatar',
            },
            listType: 'picture',
            beforeUpload(file) {
                let type = file.type;
                if (type !== 'image/jpeg' && type !== 'image/png') {
                    message.error('只能上传 JPG 和 PNG 文件哦！');
                    return false;
                }
                if(file.size >= 1000000) {
                    message.error('只能上传小于1M的图片');
                    return false;
                }
                return true;
            }
            
        };

        return (
            <div className="info-upload">
                <Upload {...props} fileList={fileList} onChange={this.handelChange}>
                    <Button type="ghost">
                        <Icon type="upload" /> 点击上传图片
                    </Button>
                </Upload>
            </div>
        )
    }
}


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