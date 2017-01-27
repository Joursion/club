import React, {Component} from 'react';
import {BackTop} from 'antd';

class componentName extends Component {
    
    render() {
        const style = {
            height: 40,
            width: 40,
            lineHeight: '20px',
            borderRadius: 4,
            backgroundColor: '#57c5f7',
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
        };

        return (
            <div>
                <BackTop style={{ bottom: 100 }}>
                    <div style={style}>返回顶部</div>
                </BackTop>
            </div>
        );
    }
}

export default componentName;