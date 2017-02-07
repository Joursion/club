import { apiUrl } from '../config/index'
import marked from 'marked'
import React from 'react'

const TYPE = {
    'JSON': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

/** POST/GET data */
export const handle = (url, method, data, type) => {
    method = method.toLocaleUpperCase()
    type = type.toLocaleUpperCase()
    //console.log('=====', method);
    if(method == 'POST' || method == 'DELETE') {
        return new Promise((resolve, reject) => {
            fetch(apiUrl + url, {
                credentials: 'include',
                mode:'cors',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(res => {
                //console.log('提交data之后收到的',res);
                if (res.err) {
                    // return reject(new Error(`${method} to ${url} error`));
                    return resolve(res)
                }
                return resolve(res.data)
            }).catch(e => {
                console.error(' tool / handle error',method, url, e);
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            fetch(apiUrl + url,{
                credentials: 'include',
                mode:'cors',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res => {
                //console.log('res....', res);
                if (res.err) {
                    return resolve(res)
                    //console.log('error', res);
                    // return reject(new Error(`${method} to ${url} error`));
                }
                return resolve(res.data)
            }).catch(e => {
                console.error(' tool / handle error',method, url,e);
            })
        })
    }
}


export const handleGetComments = (id) =>{
    return new Promise((resolve, reject) =>{
        handle(`comment/${id}`,'get',[],'json').then(data =>{
            
            if(!data.err) {
                return resolve(data);
            } else {
                return  reject({err: `get comments === ${id} error`});
            }
           // return resovle(data);
        }).catch(e => {
            console.error(' handleGetComments error',e);
        })
    })
}

export const handleHot = (type) => {
    return new Promise((resolve, reject) => {
        //console.log('我要获取的热门是',type);
        handle(type, 'GET',[],'json').then(data =>{
            if(!data.err) {
                return resolve(data)
            } else {
                return reject({err: `get${type} error`})
            }
        }).catch(e => {
            console.error(' handleHot error', e);
        })
    })
}



export const toMD = (string) => {
    let markedStr = marked(string);
    return React.creatClass({
        render() {
            return <span dangerouslySetInnerHTML = {markedStr}> </span>
        }
    })
}