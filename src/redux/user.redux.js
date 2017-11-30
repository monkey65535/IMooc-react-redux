import Axios from 'axios';
import {getRedirectPach} from '../util';
// action
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT_SUBMIT = 'LOGOUT_SUBMIT';

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
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
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
        case LOGOUT_SUBMIT:
            return {
                ...initState,
                redirectTo: '/login'
            }
        default:
            return state;
    }
}

// actionCreater
function authSuccess(data) {
    return {payload: data.data, type: AUTH_SUCCESS}
}
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

export function logoutSubmit() {
    return {type: LOGOUT_SUBMIT}
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
                    dispatch(authSuccess(res.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function update(data) {
    return dispatch => {
        Axios
            .post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
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
                    dispatch(authSuccess(res.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
