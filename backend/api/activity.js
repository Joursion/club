"use strict"

const Activity = require('../lib/activity')
const Cache = require('../tools/cache')
const User = require('../lib/user')
const imgUrl = 'http://7xrkb1.com1.z0.glb.clouddn.com/'


exports.getActivitiesByPage = function*(){
    let p = this.params.p || 1;
    let data = yield Activity.getActivityByPage(p)
    if(data) {
        this.body = {
            data : data
        }
    }
}

exports.getHotActivity = function*(){
    let hotActivities = yield Cache.get('hot-activity');
    if(!hotActivities) {
        hotActivities = yield Activity.getHotActivity()
        Cache.set('hot-activity', JSON.stringify(hotActivities), 60*60)
        this.body = {
            data: hotActivities
        }
    } else {
        this.body = {
            data: JSON.parse(hotActivities)
        }
    }
}

exports.getActivityByID = function*(){
    let id = this.params.id
    let user = this.user;
    if(id) {
        let activity = yield Activity.getActivityById(id);
        let creator = activity.creator;
        let avatar = yield Cache.get(`avatar:${creator}`);
        console.log('avatar=', avatar)
        let sendData = {
            start: activity.start,
            end: activity.end,
            avatar: avatar,
            creator: activity.creator,
            content: activity.content,
            pv: activity.pv,
            comment: activity.comment,
            top: activity.top,
            _id: activity._id,
            img: activity.img,
            create_at: activity.create_at,
            join: activity.join,
            title : activity.title
        }
        let tmpJoinData = yield Cache.smembers(`activity:${id}`) // {k-v,k-v}
        let JoinData = [];
        let isJoin = false;
        for(let v of tmpJoinData) {
            let avatar = yield Cache.get(`avatar:${v}`);
            if(user == v) {{
                isJoin = true;
            }}
            JoinData.push({
                name: v,
                avatar: avatar|| ''
            })
        }
        //activity.avatar = avatar;
        //console.log('avtivity ===', activity, avatar);
        if(activity) {
            this.body = {
                data: {
                    activity: sendData,
                    join: JoinData,
                    isJoin: isJoin
                }
            }
        } else {
            this.body = {
                err: '服务器繁忙'
            }
        }
    } else {
        this.body = {
            err: '不存在这个活动～'
        }
    }
}

/**创建活动
 * @param body {Object} 
 */
exports.createActivity = function*(){
    let body = this.request.body;
    let tmpList = body.fileList;
    if(!tmpList) {
        this.body = {err:'请上传几张照片吧～'};
    }
    let fileList;
    if(tmpList instanceof Array) {
        fileList = tmpList.map((v, index) => {
            return `${imgUrl}${v.data.toString()}`
        })
    }
    let data = body;
    data.img = fileList;
    data.creator = this.user;

    let status = yield Activity.addActivity(data);
    if(status) {
        let _id = status._id;
        this.body = {
            data: {_id: _id}
        }
    }
}

exports.delActivity = function*(){
    let id = this.request.body.id;
    let user = this.user;
    let activityInfo = yield Activity.getActivityById(id)
    if(activityInfo) {
        if(activityInfo.creator == user) {
            Cache.del(`activity:${id}`)
            let stat = yield Activity.deleteActivity(id)
            if(stat) {
                this.body = {
                    data: 'ok'
                }
            } else {
                this.body = {
                    err: '参数错误'
                }
            }
        } else {
            let userRole = Cache.get(`user:${user}`);
            if(userRole.role == 5) {
                Activity.deleteActivity(id)
                this.body = {
                    data: 'ok'
                }
            } else {
                this.body = {
                    err: '您没有权限'
                }
            }
        }
    } else {
        this.body = {
            err: '参数错误'
        }
    }
}

/**参加活动 */
exports.joinActivity = function* () {
    let body = this.request.body;
    let id = body.id;
    let user = this.user;
    console.log('参加活动==', user, id)
    if(user && id) {
        let userInfo = yield User.getUserByName(user);
        let url = userInfo.url || ''
        let state =  yield Cache.sadd(`activity:${id}`, user);// let joinState = yield
        Cache.sadd(`joinu:${user}`, id);
        Activity.incJoinById(id);
        if(state) {
            this.body = {
                data: 'ok'
            }
        } else {
            this.body = {
                err: '服务器繁忙'
            }
        }
    }
}

/**取消参加活动 */
exports.delJoinActivity = function* () {
    let user = this.user;
    let id = this.request.body.id;
    if(user && id) {
        let state = yield Cache.srem(`activity:${id}`, user);
        Activity.subJoinById(id)
        //Cache.hdel(`joinu:${user}`, activityName);
        if(state) {
            this.body = {
                data: 'ok'
            }
        } else {
            this.body = {
                err: '服务器繁忙'
            }
        }
    } else {
        this.body = {
            err: '服务器繁忙'
        }
    }
}

/**获取一个活动的参加信息 */
exports.getActivityJoinData = function*(){
    let id = this.params.id;
    if(id) {
        let data = yield Cache.smembers(`activity:${id}`) // {k-v,k-v}
        let resData = [];
        for(let v of data) {
            let avatar = yield Cache.get(`avatar:${v}`);
            resData.push({
                name: v,
                avatar: avatar|| ''
            })
        }
        //console.log('参加的信息---',data, resData);
        this.body = {
            data: resData
        }
    } else {
        this.body = {
            err: '获取活动参加信息失败～'
        }
    }
}

/**设置活动置顶 */
exports.setActivityToTop = function*(){
    let id = this.request.body.id;
    if(id) {
        Activity.setTop(id, 1)
        this.body = {
            data : 'ok'
        }
    }
}

exports.pullActivityToTop = function*() {
    let id = this.request.body.id;
    if(id) {
        Activity.setTop(id, 0)
        this.body = {
            data : 'ok'
        }
    }
}



// exports.get_activity_by_id = function* () {
//     var id = this.params.id;
//     var user = "";
//     var st = "";
//     if (this.session.user) {
//         user = this.session.user;
//         st = yield Join.IsJoin(user.name, id);
//     }
//     console.log(typeof (st));
//     var join = 0;
//     if (st.length == 0) {
//         join = 0;
//     } else {
//         join = 1;
//     }

//     var MessageCount = 0;
//     if (this.session.user) {
//         MessageCount = yield Message.CountMyMessage(this.session.user.name);
//     }
//     yield this.render('activity', {
//         activity: Activity.getActivityById(id),
//         activity_comments: ActivityComment.getActivityComment(id),
//         isJoin: join,
//         joiners: Join.getJoinById(id),
//         messageCount: MessageCount,
//         HotActivity: Activity.getHotActivity()
//     });
// }

// exports.activity_comment_submit = function* () {
//     var data = this.request.body || {};
//     data.user = this.session.user;
//     // data.user.tx_url = this.session.user.tx_url;
//     data.create_at = Date.now();

//     if (data.activity_founder !== data.user.name)
//         var message = {
//             type: "回复了你的活动",
//             sender: this.session.user.name,
//             target: data.activity_founder,
//             url: "/activity/" + data.activity_id,
//             content: data.activity_title,
//             has_read: false,
//             create_at: Date.now()
//         };

//     yield [
//         ActivityComment.addActivityComment(data),
//         Activity.incCommentById(data.activity_id),
//         Message.addMessage(message)
//     ];
//     this.redirect('back');
//     this.status = 200;
//     this.body = data;
// }





    //activity 修改
    /*router.get('/activity_edit/:id', function *() {
        var id = this.params.id;
        var MessageCount = 0;
        if (this.session.user) {
            MessageCount = yield Message.CountMyMessage(this.session.user.name);
        }
        yield this.render('activity_edit', {
            activity: Activity.getActivityById(id),
            messageCount : MessageCount
        });
    });*/

   /* router.post('/activity_edit/:id', function *() {
        var id = this.params.id;
        var data = this.request.body;
        data.update_date = Date.now();
        console.log(data);
        yield Activity.editActivity(id, data);
        this.flash = {success: '修改活动成功'};
        this.redirect('/activity/'+ id);
    });*/
