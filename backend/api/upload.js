"use strict"

var qiniu = require("qiniu");

var parse = require('co-busboy');
var uuid = require('node-uuid');
var fs = require('fs');

var config = {
    qiniu:{
        ACCESS_KEY : 'qgEdPE_-N9w0Ln_ckceM6B1PoJhl0-BCkTnuQKre',
        SECRET_KEY : 'QXemEA4LSNpywF3BiUNYkID5L0ur3-dfKYeVrr8N',
        bucket: 'nbut-club'
    }
}


exports.upload = function *(){
    console.log('-----');
    var parts = parse(this);
    var part;
    var file_src;
    while (part = yield parts) {
        var stream = fs.createWriteStream('tmp/' + part.filename);
        file_src = "tmp/" + part.filename;
        part.pipe(stream);
        console.log('uploading %s -> %s', part.filename, stream.path);
    }

    /*使用qiniu*/
    qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;
    var bucket = config.qiniu.bucket;
    var key = uuid.v4() + '.jpg';
    var cbdata;
    //构建上传策略函数
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        return putPolicy.token();
    }
    //生成上传 Token
    var token = uptoken(bucket, key);
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.key);
                cbdata = ret.key;
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
  //  调用uploadFile上传
    uploadFile(token, key, file_src);
    //this.redirect('back');
    this.status = 200;
    this.body = {data: key}
    //this.body = Date.now();
}