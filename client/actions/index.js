import * as types from '../constants'

export default {
    getMessage: function (msg) {
        return {
            type : types.GET_MESSAGE,
            msg
        }
    },

    setUser: function(data) {
        return {
            type : types.SET_USER,
            data
        }
    },
    
    setMsg: function(data) {
        return {
            type: types.SET_MSG,
            data
        }
    }
}