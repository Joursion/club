"use strict"

//var app = require('../index.js')
var mocha = require('mocha');
//var _request = require('supertest')(app);
var supertest = require('supertest');
var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
var assert = chai.assert;
var api = supertest('http://localhost:5000')

describe('test /v1/api/user.test.js', function(){
    it('should create a new user', function(done) {
        api.post('/v1/api/signup')
        .set('Accept', 'application/json')
        .send({
            username: 'ysl',
            password: 'ysl123',
            email: '123@12.com'
        })
        .expect(200)
        .end(function(err, res) {
            if(err) {
                return err
            }
            console.log('res=',res);
            
            //res.body.should.have.property('ok')
            done()
        })
    })

    it('should return err ', function(done) {
        api.post('/v1/api/signup')
        .set('Accept', 'application/json')
        .send({
            username: 'ysl',
            password: 'ysl123',
            email: '123@12.com'
        })
        .expect(200)
        .end(function(err, res) {
            res.body.should.have.property('err')
            done()
        })
    })

    it('should signin', function(done) {
        api.post('/v1/api/signin')
        .set('Accept', 'application/json')
        .send({
            username : 'ysl',
            password: 'ysl123'
        })
        .expect(200)
        .end(function(err, res) {
            res.body.should.have.property('err')
            done()
        })
    })
})