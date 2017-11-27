import Axios from 'axios';
import {getRedirectPach} from '../util';
// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGON_SUCCESS = 'LOGON_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

// reducer
const initState = {
    isAuth: '',
    mag: '',
    user: '',
    pwd: '',
    type: '',
    redirectTo: ''
}
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: '',
                isAuth: true,
                redirectTo: getRedirectPach(action.payload),
                ...action.payload
            }
        case LOGON_SUCCESS:
            return {
                ...state,
                msg: '',
                isAuth: true,
                redirectTo: getRedirectPach(action.payload),
                ...action.payload
            }
        case LOAD_DATA:
            return {
                ...state,
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
function loginSuccess(data) {
    return {payload: data.data, type: LOGON_SUCCESS}
}
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

export function loadData(userinfo) {
    return {type: LOAD_DATA,payload:userinfo}
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

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('请填写用户名/密码');
    }
    return (dispatch) => {
        Axios
            .post('/user/login', {user, pwd})
            .then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
