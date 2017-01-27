import React, { Component, ProtoType } from 'react';
import { Row, Col, Upload, Button, Icon } from 'antd';

export default class User extends Component{
    render() {

        const props = {
        action: '/upload',
        listType: 'picture',
        };

        return (
            <div className="touxiang">
                <div>
                    <Upload {...props}>
                    <Button type="ghost">
                        <Icon type="upload" /> 点击上传
                    </Button>
                    </Upload>
                    <br />
                    <br />
                    <Upload {...props} className="upload-list-inline">
                    <Button type="ghost">
                        <Icon type="upload" /> 点击上传
                    </Button>
                    </Upload>
                </div>
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