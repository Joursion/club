var koa = require('koa');
var router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');
var gzip = require('koa-gzip');
var st = require('./router/app.js');
var cors = require('koa-cors');
var Io = require('socket.io');
var Socket  = require('./api/message').online;
//var config = require('./config');

const app = koa();
const port = 5000;//config.port;

const options = {
    'credentials': true,
}

app.use(cors(options));
//app.use(serve(path.join(__dirname, 'public/')));
//app.use(serve(__dirname));
app.use(logger());

var server = require('http').createServer(app.callback());

//app.use(errorHandler());
app.use(bodyParser());

st(app, router);

app.use(gzip());

// var io = Io(server);
// Socket(io)


server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

process.on('caughtException', function(err) {
    console.error(err)
})

process.on('uncaughtException', function(err) {
    console.log(err)
})
// module.exports = app.callback();