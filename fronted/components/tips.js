import React, {Component} from 'react';

class Tips extends Component {
    render() {
        return (
            <div className="tips">
            <div className="tips-title">小Tips</div>
            <div style={{padding:'1em'}}>
                <p>支持markdown~</p>
                <p>常用:</p>
                <p>### 单行的标题</p>
                <p>**粗体**</p>
                <p>`console.log('行内代码')`</p>
                <p>```js\n code \n``` 标记代码块</p>
                <p>注：暂不支持代码高亮</p>
            </div>
            </div>
        );
    }
}

export default Tips;