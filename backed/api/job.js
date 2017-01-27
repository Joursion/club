"use strict"

const Job = require('../lib/job');

exports.getJobs = function *() {
    let jobs = yield Job.getJob();
    console.log('jobs', jobs)
    this.body = {
        data: jobs
    }
}

exports.getHotJobs = function*() {
    this.body = {
        
    }
}

exports.getJobById = function *(){
    let id = this.params.id
    if(id) {
        let job = yield Job.getJobById(id)
        this.body = {
            data: job
        }
    } else {
        this.body = {
            err: 'this id is invalid'
        }
    }
}

exports.createJob = function *(){
    let body = this.request.body
    yield Job.addJob(body);
    this.body = {
        data: 'ok'
    }
}
