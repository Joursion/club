'use strict';

var Koa = require('koa');
var Send = require('koa-send');
var path = require('path');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var errorHandler = require('koa-errorhandler');
var serve = require('koa-static');
var logger = require('koa-logger');
var fs = require('fs');
var gzip = require('koa-gzip');


const app = Koa();
const port = 4000;

app.use(serve(__dirname));
app.use(logger());

app.use(function *(){
    if(this.path.match(/\./) === null) {
        yield Send(this, 'index.html',{
            maxage: 1000*60*60*24,
            gzip: true
        })
    }
});

app.use(errorHandler());
app.use(bodyParser());


app.use(gzip());

app.listen(port, function () {
    console.log('Server listening at port %d', port);
});
