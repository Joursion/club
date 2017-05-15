"use strict"
//const $Good = require('../lib/good')
const Item = require('../lib/item');
const Cache = require('../tools/cache');

const numPerPage = 12;//

const imgUrl = 'http://7xrkb1.com1.z0.glb.clouddn.com/'

    /*测试good的restful*/
// exports.getItemByTab = function*(){
//     let tab = this.params.tab;
//     let p = this.params.p;
//     let items = $Good.GetGoodByTab(tab, p)
//     yield this.render('good_index',{
//         goods: $Good.GetGoodByTab(tab, p),
//         messageCount: MessageCount,
//         Goodcounts: $Good.getGoodsCount(tab),
//         HotGoods: $Good.getHotGoods()
//     });
// }

exports.getItems = function*(){
    let tab = this.params.tab;
    let p = this.params.p || 1;
    let data = yield Item.getItemByTab('all', p, numPerPage);
    if(!data) {
        this.body = {data:[]}
    }
    this.body = {data: data}
}

exports.createItem = function*(){
    let body = this.request.body;
    let tmpList = body.fileList;
    if(!tmpList) {
        this.body = {err:'请上传几张照片吧～'};
    }
    let fileList;
    console.log('tmpList', tmpList);
    if(tmpList instanceof Array) {
        fileList = tmpList.map((v, index) => {
            console.log('======', v);
            return `${imgUrl}${v.data.toString()}`
        })
    }
    let data = body;
    data.img = fileList;
    data.creator = this.user;
    
    let status = yield Item.addItem(data);
    if(status) {
        let _id = status._id;
        this.body = {
            data: {_id: _id}
        }
    }
}

exports.getItemByID = function*(){
    let id = this.params.id;
    let data = yield Item.getItemById(id);
    if(!data) {
        this.body = {err: `getItem ${id} error`}
    } else {
        let creator = data.creator;
        let avatar = yield Cache.get(`avatar:${creator}`);
        let resData = {
            content: data.content,
            avatar: avatar,
            creator: data.creator,
            img: data.img,
            price: data.price,
            pv: data.pv,
            comment: data.comment,
            title: data.title,
            _id: data._id,
            create_at: data.create_at
        }
        // resData['avatar'] = avatar;
        // data.avatar = avatar;
        // data.s = 1;
        // console.log('item--',resData, data, data.avatar);
        this.body = {data: resData}
    }
}

exports.delItem = function*(){
    let id = this.request.body.id;
    let user = this.user;
    let itemInfo = yield Item.getItemById(id);
    console.log('delitem==', itemInfo, user);
    if(itemInfo) {
        if(itemInfo.creator == user) {
            let stat = yield Item.delItem(id);
            if(stat) {
                this.body = {
                    data: 'ok'
                }
            }else {
                this.body = {
                    err: `delItem error ${id}`
                }
            }
        } else {
            let userRole = Cache.get(`user:${user}`);
            if(userRole.role == 5) {
                Item.delItem(id)
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

exports.getHotItem = function*(){
    let items = yield Cache.get('hot-item');
    //console.log('redis 中的热门item', items)
    if(!items) {
        items = yield Item.getHotItems()
        Cache.set('hot-item', items, 60*60);
    }
    this.body = {
        data : items
    }
}