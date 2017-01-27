import Actions from '../actions'
import * as types from '../constants'

function reducer (state = {}, action) {   
    switch(action.type) {
        case types.GET_MESSAGE: {
            return state
        }
        case types.SET_USER: {
            return Object.assign({}, state, {
                user: action.data
            })
        }
        case types.SET_MSG: {
            return Object.assign({}, state, {
                msg: action.data
            })
        }
        default: 
            return state
    }
}

module.exports = reducer;