import React, {Component} from 'react';
import {Icon, Col} from 'antd'

import SideBar from '../components/sidebar'
import HotCard from '../components/hotcard'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Store from '../store/index'
import Actions from '../actions/index'

import {handle} from '../tools/index'

class JobPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            job: {}
        }
    }

    transDate(str){
        let time = new Date(str)
        return time.toLocaleDateString();
    }

    // initJob() {
    //     let params = this.props.params
    //     let hotContent = ''
    //     console.log('params', this.props)
    //     let index = jobs.findIndex(v => v._id == params.id)
    //     console.log('index', index)
    //     if(index !== - 1){
    //         let job = jobs[index];
    //         this.renderJob(job)
    //     }else {
    //         //fetch(`/job/${params.id}`, )
    //     }
    // }

    componentDidMount() {
        let id = this.props.params.id;
        handle(`job/${id}`, 'GET', [], 'JSON').then(data => {
            console.log('我在ask中收到的消息', data);
            this.setState({ job: data });
        })
    }

    renderJob(job) {
        if(!job) return null;
        return (
            <Col xs={24} sm={24} md={18} lg={18} >
                
                <div className="job-title">
                    {
                        job.isTop ? <Icon type="pushpin" /> : null
                    }
                    {job.title}
                </div>
                <div className="job-info">
                发布于：&nbsp;
                    {
                        this.transDate(job.create_at)
                    }
                    &nbsp;<Icon type="eye-o" />&nbsp; {job.pv}
                </div>
                <div className="job-content"> {job.content}</div>
            </Col>
           
        )
    }

    render() {
        let job = this.state.job;
        let hotContent = ''
        return (
            <div className="job-page animated slideInUp">
            {
                this.renderJob(job)
            }
            <Col xs={24} sm={24} md={6} lg={6} className="sidebar">
                <SideBar avatar={'12'} desc={'Admin'} info={'信息来自学工网'}/>
                <HotCard content={hotContent} name={'good'}/>
            </Col>
            </div>
        );
    }
}

export default JobPage;
// const mapStateToProps = (state) => {
//     return {
//         jobs: state.jobs
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(Actions, dispatch)
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(JobPage)
