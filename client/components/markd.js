import React, {Component} from 'react';
import marked from 'marked'

// marked.setOptions({
//   highlight: function (code) {
//     return require('highlight.js').highlightAuto(code).value;
//   }
// });


class MarkDown extends Component {

    createMarkup(content) {
        return {__html: content};
    }


    render() {
        let {content, o} = this.props;
        //console.log('即将要渲染的-', content, o);
        content = content || ''
        content = marked(content) || ''
        return (
            <span dangerouslySetInnerHTML = {this.createMarkup(content)}></span>
        );
    }
}

export default MarkDown;