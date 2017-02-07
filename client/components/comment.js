import React, {Component} from 'react';
import {Button, Icon, message} from 'antd';
import Avatar from './avatar';
import Emotion from './emotion';
import {handle} from '../tools/index'
import {Link} from 'react-router'

class Comment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: 'none'
        }
        this.comment_reply = this.comment_reply.bind(this);
        this.emotionBtn = this.emotionBtn.bind(this);
    }

    //回复楼中楼
    replyIn(id, to, content) {

    }

    //回复整个项目,支持emoji??
    comment_reply(reply) {
        console.log('this。。。',this)
        let input =  this.refs.inputContent;
        let value = this.handelContent(input.value)
        console.log('wo dianji le reply', value, this.props);
        let content = value || '12121212121';
        if(content && content.length && this.props.user) {
            let data = {
                content: content,
                username: this.props.user.username,
                create_at: Date.now()
            }
            this.props.reply(data);
        }else {
            message.error('回复的字符需要大于0')
        }
        //content.value = "";
        input.value = ""
    }

    //字符过滤
    handelContent(content) {
        return content.replace(/&/g,'&amp').replace(/\"/g,'&quot').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\'/g,'&apos;');
    }

    emotionBtn() {
        if (this.state.open == "inline-block") {
            this.setState({open: "none"});
        } else {
            this.setState({open: "inline-block"});
        }
        //this.state.now = !this.state.now;
    }
    
    addEmotion() {
        let input = this.refs.inputMessage;
        input.value += e.target.text;
    }
    
    componentDidMount(){
        document.addEventListener('click', (e) => {
           // e.target != this.refs.expressionBtn && this.props.isShowExpressions ? this.props.setExpressionHidden():null;
            let emotions = this.refs.emotions;
            let _this = this;
            let target = e.target.id
            console.log(target, typeof target);
            if(target == 'emotion-btn') {
                console.log('你点击了..');
                if (_this.state.open == "inline-block") {
                    _this.setState({open: "none"});
                } else {
                    _this.setState({open: "inline-block"});
                }
            } else if(target !== 'emotions' && target !== 'choose_emotion') {
                if(_this.state.open == 'inline-block') {
                    _this.setState({open: 'none'})
                }
            }
        })
    }

    insertAtCursor(myValue) {
        let input = this.refs.inputContent;
        if (input.selectionStart || input.selectionStart === '0') {
            let startpos = input.selectionStart;
            let endpos = input.selectionEnd;
            let restore = input.scrollTop;
            input.value  = input.value.substring(0, startpos) + myValue + input.value.substring(endpos, input.value.length);
            // if (restoreTop > 0) {
            //     input.scrollTop = restoreTop;
            // }
            input.focus();
            input.selectionStart = startpos + myValue.length;
            input.selectionEnd = startpos + myValue.length;
        } else {
            input.value += myValue;
            input.focus();
        }
    }

    //渲染评论
    renderComments(comments){
        if(comments instanceof Array) {
            return <div className="comments">
            {
                comments.map((v, index) => {
                    let date = new Date(v.create_at);
                    date = date.toLocaleString();
                    return (
                        <div key={`comments-${index}`} className="comment">
                            <div style={{display:'flex'}}>
                                <Avatar avatarUrl={v.avatar || ''}/>
                                <div className="comment-detail">
                                    <div className="comment-date">{v.username} &nbsp;&nbsp;{date}</div>
                                    <div className="comment-info">{index + 1}楼</div>
                                    <div className="comment-content">{v.content}</div>
                                    {
                                        // v.reply ? 
                                        // <div>
                                        // {
                                        //     v.reply.map((reply, i) => {
                                        //         return (
                                        //             <div className="comment-reply" key={`reply-${index}-${i}`}>
                                        //                 {reply.to}
                                        //                 {reply.content}
                                        //             </div>
                                        //             )
                                        //     })
                                        // }
                                        // </div>  : null
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        }
    }

    renderCommentBox(user){
        if(typeof user == 'object' && user.username) {
            return (
                <div className="comment-box" id="reply-box">
                    <textarea
                        type = 'text'
                        className = 'input-message'
                        ref = 'inputContent'
                        maxLength = {512}
                        onKeyDown={ e => {
                            if (!e.ctrlKey && e.keyCode == 13) {
                                //let msg = this.getMessage.bind(this)();
                                //e.preventDefault();
                                //handleSendMessage(msg.message, msg.Mto, user, msg.time);
                            }
                        } }
                        //onChange = {this.handleChange}
                    />
                    {//<button className="emotion-btn" id="emotion-btn" onClick={ this.emotionBtn.bind(this) } style= {{fontSize: "1.5rem", background: "white", border:"none"}}>😀</button>
                    }
                    <div className="emotion-c">
                        <div className="emotion-btn" id="emotion-btn" style= {{fontSize: "1.5rem", background: "white", border:"none"}} >
                            😀
                        </div>
                        <Button className="comment-reply-btn" onClick={this.comment_reply}>发布(ctrl+Enter)</Button>
                    </div>
                    <Emotion  open = {this.state.open} handleClick = { this.insertAtCursor.bind(this) } ref ='emotions'>
                    </Emotion>
                </div>
            )
        } else {
            return (
                <div className="comment-box">
                    您目前还没登录， {<Link to='/signin'>登录</Link>} 或 {<Link to='/signup'>注册</Link>}参与讨论
                </div>
            )
        }
    }

    render() {
        let {comments, reply, user } = this.props 
        
        return (
            <div className="comments-box">
                {
                    this.renderComments(comments)
                }
                {
                    this.renderCommentBox(user)
                }
            </div>
        );
    }
}

export default Comment
