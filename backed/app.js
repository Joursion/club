var Koa = require('koa');
var path = require('path');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');
var errorHandler = require('koa-errorhandler');
var gzip = require('koa-gzip');
var fs = require('fs');
var st = require('./router/app.js');
var cors = require('koa-cors');
var cache = require('./tools/cache');
// var config = require('./config.js');

const app = Koa();
const port = 5000;

const options = {
    'credentials': true,
}
app.use(cors(options));
//app.use(serve(path.join(__dirname, 'public/')));
//app.use(serve(__dirname));
app.use(logger());

//cache.set('swh', '123', 1);

// app.use(function*(){
    
// })

var server = require('http').createServer(app.callback());

app.use(errorHandler());
app.use(bodyParser());

st(app, router);

app.use(gzip());

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});
