"use strict"

//var app = require('../index.js')
var mocha = require('mocha');
var app = require('../app.js')
var user = require('../api/user')
var co = require('co')
//var _request = require('supertest')(app);
var supertest = require('supertest');
var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
var assert = chai.assert;
var api = supertest(app)

describe('test /v1/api/user.test.js', function(){

    var userData = {
        username: 'ysl',
        password: 'ysl123',
        email: '123@12.com'
    }
    
    //craeta a checkNum 
    before(function(done) {
        let checkNum = co(user.getCheckNum())
    })

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
            console.log(err,res);
            if(err) {
                return err
            }
            res.body.should.have.property('ok')
            done()
        })
    })

    // it('should return err ', function(done) {
    //     api.post('/v1/api/signup')
    //     .set('Accept', 'application/json')
    //     .send({
    //         username: 'ysl',
    //         password: 'ysl123',
    //         email: '123@12.com'
    //     })
    //     .expect(200)
    //     .end(function(err, res) {
    //         res.body.should.have.property('err')
    //         done()
    //     })
    // })

    // it('should signin', function(done) {
    //     api.post('/v1/api/signin')
    //     .set('Accept', 'application/json')
    //     .send({
    //         username : 'ysl',
    //         password: 'ysl123'
    //     })
    //     .expect(200)
    //     .end(function(err, res) {
    //         res.body.should.have.property('err')
    //         done()
    //     })
    // })
})