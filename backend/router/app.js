"use strict"

/**lib */
const Job = require('../api/job')
const Admin = require('../api/admin')
const Activity = require('../api/activity')
const Ask = require('../api/ask')
const Item = require('../api/item')
const Upload = require('../api/upload')
const User = require('../api/user')
const Comment = require('../api/comment')
const Msg = require('../api/message')

const Cache = require('../tools/cache');
/**middlewares */
const Auth = require('../middlewares/auth');

module.exports = function (app, router) {

    /**upload */
    router.post('/v1/api/upload', Upload.upload)

    /**Comment */
    router.post('/v1/api/comment', Auth.userCheck, Comment.addComment)
    router.get('/v1/api/comment/:id', Comment.getComments)

    /** Job */
    router.get('/v1/api/job', Job.getJobs)
   // router.get('/v1/api/hotjob', Job.getHotJobs)

   // router.get('/v1/api/job/:id', Job.getJobByID)

    router.post('/v1/api/job', Job.createJob)
    router.get('/v1/api/job/:id', Job.getJobById);

    /**Item */
    router.post('/v1/api/item', Auth.userCheck, Item.createItem)
    router.del('/v1/api/item', Auth.userCheck, Item.delItem)
    router.get('/v1/api/item/:id', Item.getItemByID)
    router.get('/v1/api/item/:tab/:p', Item.getItems)
    router.get('/v1/api/item/p/:p', Item.getItems)
    router.get('/v1/api/item', Item.getItems);
    router.get('/v1/api/hotitem', Item.getHotItem);


    // /** Activity */

    router.get('/v1/api/activity/p/:p', Activity.getActivitiesByPage)
    router.get('/v1/api/activity', Activity.getActivitiesByPage);
    router.del('/v1/api/activity', Auth.userCheck, Activity.delActivity)
    router.get('/v1/api/activity/:id', Auth.isSignin, Activity.getActivityByID)
    router.post('/v1/api/activity', Auth.userCheck, Activity.createActivity)
    router.get('/v1/api/hotactivity', Activity.getHotActivity)
    router.post('/v1/api/join', Auth.userCheck, Activity.joinActivity);
    router.get('/v1/api/join/:id', Activity.getActivityJoinData)
    router.post('/v1/api/deljoin', Auth.userCheck, Activity.delJoinActivity)

    /** User */
    router.post('/v1/api/signin', User.signin)
    router.post('/v1/api/signup', User.signup)
    router.post('/v1/api/signout', User.signout)
    //router.get('/v1/api/u/:name', User.signin);
    router.get('/v1/api/check', User.check);
    router.post('/v1/api/checknum', User.getCheckNum);
    router.post('/v1/api/avatar', Auth.userCheck, User.changeAvatar)
    router.get('/v1/api/user', Auth.userCheck, User.getUser)

    
    /** Ask */
    router.get('/v1/api/ask', Ask.getAsks)
    router.post('/v1/api/ask', Auth.userCheck, Ask.createAsk);
    router.del('/v1/api/ask', Auth.userCheck, Ask.delAsk)
    router.get('/v1/api/ask/:id', Ask.getAskById);
    router.get('/v1/api/newask', Ask.getNewAsks);


    /**Message */
    router.get('/v1/api/message', Auth.userCheck, Msg.getMessage)
    router.del('/v1/api/message', Auth.userCheck, Msg.delMessage)
    

    app.use(router.routes()).use(router.allowedMethods());
}