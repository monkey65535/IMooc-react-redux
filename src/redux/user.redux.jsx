import Axios from 'axios';

// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// reducer
const initState = {
    isAuth: '',
    mag: '',
    user: '',
    pwd: '',
    type: ''
}
export function user(state = initState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

// actionCreater
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}
// thunk action
export function register({user, pwd, confrimPwd, type}) {
    if (!user.trim() || !pwd.trim() || !type.trim()) {
        return errorMsg('请填写用户名/密码');
    }
    if (pwd.trim() !== confrimPwd.trim()) {
        return errorMsg('两次输入的密码不一致');
    }
    return (dispatch) => {
        Axios
            .post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({})
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}