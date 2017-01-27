/**
 * Created by m on 16-3-5.
 */


var tmp = "hjyqeimpjeizbcbj";

var nodemailer = require('nodemailer');
var config = require('../config').default;

console.log('===', config);

var smtpTransport = nodemailer.createTransport("SMTP",{
    host: config.mail.host,
    port: config.mail.port,    // SMTP 端口
    auth: config.mail.auth
    
});


exports.send = function (name, receiver, checkNum) {
    var html = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
         name + ' 您好:</br>'+
        '&nbsp;&nbsp;&nbsp;&nbsp; 欢迎您使用nbut.club,&nbsp;以下是注册nbut.club的验证码</br>' +
        '&nbsp;&nbsp;'+ "<div style='color:#1054c3'>"+ checkNum + "</div>"
        '</br>' + '【此邮件请勿回复】';

    //var mailOptions = config.mail.mailOptions;
    
    var mailOptions = {
            from: "869595931@qq.com",
            to: receiver,
            subject: "nbut.club 验证码",
            html: html
    };

    smtpTransport.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.log("sent success!",res.response);
        }
    });
};
