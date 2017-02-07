import React, {Component} from 'react';
import { Affix, Button, Steps } from 'antd'
const Step = Steps.Step;

class MyStep extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        let current = this.props.current
        return (
            <Affix offsetTop={10}>
                <Steps current={current}>
                    <Step title="基本资料" description="根据提示完成基本资料的填写" />
                    <Step title="上传图片" description="怎么能少的了图片呢~~~" />
                    <Step title="提交 " description="如果你写完了,那就该轮到我了." />
                </Steps>
            </Affix>
        );
    }
}

export default MyStep;