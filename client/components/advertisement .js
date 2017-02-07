import React, {Components} from 'react'
import { Carousel } from 'antd'

export default class Advertisement extends Components {
    constructor(ctx, props) {
        super(ctx, props)
    }

    render(){
        let {advertisements} = this.props 
        return (
            <div className="advertisement">
            <Carousel autoplay>
            {
                advertisements.map((v, index) => {
                    return (
                        <div key={index} className="oneAd">
                            <a href={v.url}></a>
                            <img src = {v.imgUrl} />
                        </div>
                    )
                })
            }
            </Carousel>
            </div>
        )
    }
}
