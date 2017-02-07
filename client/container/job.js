import React, {Component} from 'react';
import {Col, Icon} from 'antd'
import {Link} from 'react-router'
import SideBar from '../components/sidebar'
import HotCard from '../components/hotcard'
//import config from '../../config.default'
//console.log(config)

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Store from '../store/index'
import Actions from '../actions/index'
//const Store = require('../store/index.js')
//const Actions = require('../actions/index.js')
import { handle, handleGetComments, handleHot} from '../tools/index'


class Job extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            jobs: [],
            hot: []
        }
    }

    componentDidMount() {
        handle('job', 'get', [], 'json').then(data =>{
            console.log('我的job数据',data)
            this.setState({jobs: data})
        })
        // handleHot('hotjob').then(data =>{
        //     this.setState({hot: data})
        // })
    }

    renderJob(jobs) {
        console.log('jobs', jobs)
        //let jobConfig = config.job
        if(!(jobs instanceof Array)) {
            return null
        }
        return jobs.map((v, index) => {
            return (
                <Col xs={24} sm={24} md={24} lg={24} className="one-job" key={`good:${index}`}>
                    {/*<a href={`/good/${v.url}`} className='good-hover'>*/}
                    <a target='new_blank' href={`http://nbut.jysd.com/${v.id}`}>
                    <h2 className="job-title">
                    {
                        v.istop ? <span><Icon type="pushpin" /> </span>: null 
                    }
                    {v.title}
                    </h2>
                    <div> 发布于： {v.date}</div>
                    </a>
                </Col>
            )
        })
    }

    render() {
        let jobs = this.state.jobs
        let {user} = this.props;
        user = user || {avatar:'', username: ''}
        return (
            <div style={{width:'90%', margin:'auto', background:'white',marginTop: 20 }} className="animated zoomIn">
                <Col xs={24} sm={24} md={18} lg={18} className="job-index">
                {
                    this.renderJob(jobs)
                }
                </Col>

                <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                    <div className={`hot top`}>
                        <div className={`hot-title`}>推荐</div>
                        <div style={{padding:'1em'}}>
                            <a target='new_blank' href='http://nbut.jysd.com/'>宁波工程学院就业信息网</a>
                        </div>
                    </div>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs
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
)(Job)


//<SideBar avatar={user.avatar || ''} desc={user.username || ''}/>