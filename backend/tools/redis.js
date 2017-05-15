const config = require('../config').default;
const redis = require('ioredis');
//const logger = require('./logger')

var redisConfig = config.redis;

var client = new redis({
    port: redisConfig.port,
    host: redisConfig.host,
    db: redisConfig.db,
   // password: redisConfig.password
});

client.on('error', function (err) {
    if (err) {
        console.error('connect to redis error, check your redis config', err, redisConfig);
        process.exit(1);
    }
})

exports = module.exports = client;

