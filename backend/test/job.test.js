'use strict';

//var app = require('../index.js')
// var mocha = require('mocha');
//var _request = require('supertest')(app);
var supertest = require('supertest');
var chai = require('chai');
// var should = chai.should;
var expect = chai.expect;
// var assert = chai.assert;
var api = supertest('http://localhost:5000');


describe('test job api', function () {
    it('sholud create a new job', function(done) {
        api.post('/v1/api/job')
        .set('Accept', 'application/json')
        .send({
            title: 'test job',
            content: 'zheshi yige xin de zhaopin de tiezi, huanying liulan',
            create_at: Date.now(),
            pv: 0,
            isTop: 1,
        })
        .end(function (err, res){
            expect(res.body).to.not.equal(null);
            done();
        });
    });

    it('should get jobs list', function(done){
        api.get('/v1/api/job')
        .end(function(err, res) {
            res.body.status.to.not.equal('err');
            done();
        });
    });
});