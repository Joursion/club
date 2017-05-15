const request = require('request')
const cheerio = require('cheerio')
const jobConfig = require('../../config.default').job
const _ = require('lodash');

const url = jobConfig.scraperUrl
const tag = jobConfig.tag

function getHtml(url) {
    return new Promise((resolve, reject) => {
        return request(url, function(err, res, body) {
            if(err) {
                console.error('error getHtml', url, err);
                return reject('err', err)
            }
            return resolve(body)
        })
    })
}

exports.getHtml = getHtml

function scriperJob () {
    return new Promise((resolve, reject) => {
        getHtml(url).then(data => {
            const $ = cheerio.load(data);
            var jobData = [];
            $(`${tag}`).find('li')
            .each(function() {
                let tmpData = {};
                let title =  '【 ' +  $(this).children('.css-jobname').text() + ' 】' || '';
                tmpData.date = $(this).children('.pubdate').text() || new Date(Date.now()).toLocaleDateString()
                let tt = $(this).children()
                tt.each(function() {
                    let t = $(this).children()
                    t.each(function() {
                        tmpData.id = $(this).attr('href');
                        tmpData.title = title + $(this).text();
                        let data = _.cloneDeep(tmpData);
                        jobData.push(data);
                        tmpData.title = title;
                    })
                })
            })
            return resolve(JSON.stringify(jobData));
        }).catch((err) => {
            console.error('err',err)
            return reject('err', err)
        })
    })
}

exports.scriperJob = scriperJob

// function test(tmpData, title, text, id){
//     tmpData.title = title + text;
//     tmpData.id = id;
//     return tmpData;
// }