import React, {Component} from 'react';
import {Link} from 'react-router'

class HotCard extends Component {

    renderHotCard(type, content) {
        console.warn('即将要渲染的热门===', content, content instanceof Array, content.length)
        if(content) {
            return (
                content.map((v,index) => {
                    return <div className={`hot-content`} key={`hot-${type}-${index}`}> 
                            <Link to={`/${type}/${v._id}`}> {v.title}</Link>
                        </div>
                })
            )
        } else {
            return <div className="hot-content">暂无数据～～</div>
        }
    }

    render() {
        let {type, content, title} = this.props;
        return (
            <div className={`hot`}>
            <div className={`hot-title`}>{title}</div>
            <div style={{padding:'1em'}}>
            {
                this.renderHotCard(type, content)
            }
            </div>
            </div>
        );
    }
}

export default HotCard;