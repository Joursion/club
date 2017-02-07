import React, {Component} from 'react';
import {Col, Icon} from 'antd'
import {Link} from 'react-router'
import SideBar from '../components/sidebar'
import HotCard from '../components/hotcard'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from '../actions/index'
import Store from '../store/index'

import {handle, handleHot } from '../tools/index'

const numPerPage = 10;

class Activity extends Component {
    constructor(props, context) {
        super(props, context);
        this.getData = this.getData.bind(this)
        this.renderNext = this.renderNext.bind(this)
        this.state = {
            activities: [],
            hot:[],
            hasNext: false,
            page: 0
        }
    }

    componentDidMount(){
        this.getData()
        handleHot('hotactivity').then(data =>{
            if(data.err) {
                message.error(data.err)
            } else {
                this.setState({hot: data})
            }
        })
    }

    getData() {
        let page = this.state.page;
        page ++;
        let activities = this.state.activities;
        handle(`activity/p/${page}`, 'get', [], 'json').then(data =>{
            if(!data.err) {
                if(data instanceof Array && data.length >= numPerPage){
                    console.log('还有下一页');
                    this.setState({hasNext:true, page: page})
                } else {
                    this.setState({hasNext: false})
                }
                activities = activities.concat(data)
                this.setState({activities: activities});
            } else {
                message.error('获取列表失败')
            }
        })
    }

    renderNext() {
        let hasNext = this.state.hasNext;
        if(hasNext) {
            return <div onClick={this.getData} className="next">加载更多</div>
        } else {
            return null
        }
    }

    renderAcrivities(activities) {
        if(!activities) return null;
        return activities.map((v,index) =>{
            let start = new Date(v.start).toLocaleDateString();
            let end = new Date(v.end).toLocaleDateString();
            let date = new Date(v.create_at);
            date = date.toLocaleDateString();
            return (
                <Col xs={24} sm={24} md={24} lg={24} className="one-activity" key={`activity:${index}`}>
                    {/*<a href={`/good/${v.url}`} className='good-hover'>*/}
                    <Link to={`/activity/${v._id}`} activeClassName="active">
                    <div style={{display:'flex'}}>
                        <div   className="activity-img" >
                            <img src={v.img[0]}  className="activity-img" />
                        </div>
                        <div className="activity-data">
                            <h2 className="activity-title">
                            {
                                v.isTop ? <span><Icon type="pushpin" /> </span>: null 
                            }
                            {v.title}
                            </h2>
                            <div className="activity-pre">
                            {v.content}
                            </div>
                            <div className="activity-info">
                            <Icon type="user" />&nbsp;{v.join} &nbsp;<Icon type="message" /> &nbsp;{v.comment} &nbsp;<Icon type="eye-o" />&nbsp; {v.pv}
                            </div>
                            <div className="activity-date">活动时间：&nbsp;{start} -- {end}</div>
                        </div>
                    </div>
                    </Link>
                </Col>
            )
        })
    }
    
    render() {
        let activities = this.state.activities;
        let {user} = this.props;
        user = user || {avatar:'', username: ''}
        return (
            <div style={{width:'90%', margin:'auto', background:'white',marginTop: 20 }} className="animated zoomIn">
                <Col xs={24} sm={24} md={18} lg={18} className="activity-index">
                <div>
                {
                    this.renderAcrivities(activities)
                }
                </div>
                {
                    this.renderNext()
                }
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <SideBar avatar={user.avatar || ''} desc={user.username || ''} publish='create_activity'/>
                    <HotCard content={this.state.hot} type={'activity'} title={'热门'}/>
                </Col>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Activity)