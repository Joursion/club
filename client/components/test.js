import React, { Component, ProtoType } from 'react';
import { Row, Col } from 'antd';


export default class Test extends Component{
    render(){
        let data = [
            {
                "name": "剃须刀",
                "price": 12,
                "desc": "这是一把全新的剃须刀!!!",
                "img": "https://avatars1.githubusercontent.com/u/10599678?v=3&s=460"
            },
            {
                "name": "剃须刀",
                "price": 12,
                "desc": "这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!"
                +"这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!",
                "img": "https://avatars1.githubusercontent.com/u/10599678?v=3&s=460"
            },
            {
                "name": "剃须刀",
                "price": 12,
                "desc": "这是一把全新的剃须刀!!!",
                "img": "https://avatars1.githubusercontent.com/u/10599678?v=3&s=460"
            },
            {
                "name": "剃须刀",
                "price": 12,
                "desc": "这是一把全新的剃须刀!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!!!",
                "img": "https://avatars1.githubusercontent.com/u/10599678?v=3&s=460"
            },
            {
                "name": "剃须刀",
                "price": 12,
                "desc": "这是一把全新的这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!这是一把全新的剃须刀!!!剃须刀!!!",
                "img": "https://avatars1.githubusercontent.com/u/10599678?v=3&s=460"
            }
        ]
        return (
            <div className="gutter-example">
                {
                    data.map((v, index) =>{
                        return (
                            <a>
                                <Col xs={24} sm={12} md={8} lg={8} key={`goods${index}`} className="testcol">
                                    <h3>{v.name}</h3>
                                    <p>{v.price}</p>
                                    <div>{v.desc}</div>
                                    <div>
                                    <img src={v.img} width="100" height="100"/>
                                    </div>
                                </Col>
                            </a>
                        )
                    })
                }
                
            </div>
        )
    }
}

 


