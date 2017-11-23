import Axios from 'axios';
import {getRedirectPach} from '../util';
// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// reducer
const initState = {
    isAuth: '',
    mag: '',
    user: '',
    pwd: '',
    type: '',
    redirectTo:''
}
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: '',
                isAuth: true,
                redirectTo:getRedirectPach(action.payload),
                ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.msg
            }
        default:
            return state;
    }
}

// actionCreater
function registerSuccess(data) {
    return {payload: data.data, type: REGISTER_SUCCESS}
}
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}
// thunk action
export function register({user, pwd, confirmPwd, type}) {
    if (!user || !pwd || !confirmPwd || !type) {
        return errorMsg('请填写用户名/密码');
    }
    if (pwd !== confirmPwd) {
        return errorMsg('两次输入的密码不一致');
    }
    return (dispatch) => {
        Axios
            .post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}