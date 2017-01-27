/**表情模块 */

import React, { Component, ProtoType } from 'react'
import {Button} from 'antd'

var emotion = require('./emotion-emotion.js');

export default class Emotion extends Component {
    
    constructor() {
        super();
        this.state = {
            emotions: true
        }
        this.choose_emotion = this.choose_emotion.bind(this);
        this.init_emotions = this.init_emotions.bind(this);
    }

    init_emotions(emotions, handleClick, style) {
        return emotions.map(function (e, index) {
            return <div key = {index} className="o-emotions" style = { style.emotions } onClick = { 
                () => handleClick(`${e}`) }
            > {e} </div>
        })
    }

    init_emoticon(emoticon, handleClick, style) {
        return emoticon.map(function (e, index) {
            return <div key = {index} className="o-emoticon" style = { style.emoticon } onClick = { 
                () => handleClick(`${e}`) }
            > {e} </div>
        })
    }

    choose_emotion(){
        let status = this.state.emotions
        this.setState({emotions: !status});
    }

    render () {
        let {open, handleClick} = this.props;
        let style = {
            emotion: {
                display: open
            },
            emotions: {
                width: 40,
                height: 40,
                background: "white",
                fontSize: "1.5rem",
                border: "none",
                display: 'inline-block',
                textAlign: 'center',
                cursor: 'default'
            },
            emoticon:{
                padding: '0.5em',
                background: "white",
                fontSize: "0.8rem",
                border: "none",
                display: 'inline-block',
                textAlign: 'center',
                cursor: 'default'

            }
        }
        let emotions = emotion.emotions;
        let emoticon = emotion.emoticon;
        return (
            <div className = "emotions" style = { style.emotion }>
                <div id="emotions">
                    {
                        console.log(this.state.emotions,'emotion状态')
                        
                    }
                    {
                        this.state.emotions ? this.init_emotions(emotions,handleClick,style) : this.init_emoticon(emoticon, handleClick, style)
                    }
                    
                </div>
                <div className = "choose_emotion" id ="choose_emotion" onClick ={this.choose_emotion}>
                {

                    //<div className = "choose_option" onClick ={this.choose_emotion}>😀</div>
                    //<div className = "choose_option" onClick ={this.choose_emotion} >(･ิω･ิ)</div>
                }
                😀 {"<==>"} (･ิω･ิ)
                </div>
            </div>
        )
    }
}