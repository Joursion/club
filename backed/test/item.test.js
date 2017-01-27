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


describe('test mail.js api', function(){
    if('should return a checkNum, length 6', function(done) {
        api.post('/v1/api/mail')
        .set('Accept', 'application/json')
        .send({
            
        })
        .end(function(err,res) {
            
            done()
        })
    })
});