const schedule = require('node-schedule')
const Job = require('../api/job')


/**
second (0 - 59, OPTIONAL)
minute (0 - 59)
hour (0 - 23)
day of month (1 - 31)
month (1 - 12)
week 7 is Sun)
  */
var jobScrapeTask = schedule.scheduleJob('0 0 2 * *', function() {
    Job.scriperJob()
})

jobScrapeTask()
