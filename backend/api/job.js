"use strict"

const Job = require('../lib/job');
const Cache = require('../tools/cache')
const scriper = require('../tools/scraper');

const DAY = 24 * 2600

exports.getJobs = function *() {
    let jobs = yield Cache.get('cacheJob');
    if(!jobs) {
        jobs = yield scriper.scriperJob()
        Cache.set('cacheJob', jobs, DAY * 2);
    }
    jobs = JSON.parse(jobs)
    console.log('jobs--', jobs);
    this.body = {
        data: jobs
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
