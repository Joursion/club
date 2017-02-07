import React, { Component, ProtoType } from 'react';
import { Row, Col } from 'antd';

import User from '../components/user'
import Footer from '../components/footer'
import Header from '../components/header'

export default class Index extends Component{
    render(){
        return (
            <div className="app">
                <div className="animated zoomIn first">
                    <div className="pro">
                        <p className="intro">一个专属nbut的分享社区</p>
                        <p className="desc">你可以在这里发布你的闲置，活动，问答</p>
                    </div>
                </div>
                <div className="animated zoomIn second">
                    <div className="pro">
                        <p className="intro">分享,发现</p>
                        <p className="desc">生活，如此多娇</p>
                    </div>
                </div>
            </div>
        )
    }
}
