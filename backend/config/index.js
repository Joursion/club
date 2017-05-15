"use strict"

var configProduct = require('./config');   
var configDev = require('./config-dev'); //开发配置


var _ = require('lodash');
//var default_config = require('./default');
module.exports = (function () {
    var version = (process.env.CLUB_VERSION || 'dev').toLowerCase();
    var config = _.extend({"env.version" : version});
    config.config = process.env.CLUB_VERSION == 'dev'?  _.extend(config, configDev) : 
                    _.extend(config, configProduct);

    console.warn(config)
    return config;
})();




