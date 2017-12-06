import IO from 'socket.io-client';
import {} from 'react-redux';
import Axios from 'axios';

const socket = IO('ws://localhost:9093');

// action 获取聊天信息
const MSG_LIST = 'MSG_LIST';
// 获取信息
const MSG_REVC = 'MSG_REVC';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    users: {},
    unRead: 0
};
// reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: [...action.payload.msg],
                unRead: action
                    .payload
                    .msg
                    .filter(v => !v.read && v.to === action.payload.userid)
                    .length,
                users: {
                    ...action.payload.users
                }
            };
        case MSG_REVC:
            const unReadNum = action.payload.to === action.userid
                ? 1
                : 0;
            console.log(unReadNum);
            return {
                ...state,
                chatmsg: [
                    ...state.chatmsg,
                    action.payload
                ],
                unRead: state.unRead + unReadNum
            };
        case MSG_READ:
            return {
                ...state
            };
        default:
            return state;
    }
}

// create action 获取信息列表
const msgList = ({msg, users, userid}) => ({
    type: MSG_LIST,
    payload: {
        msg,
        users,
        userid
    }
})
export function getMsgList() {
    return (dispatch, getState) => {
        Axios
            .get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id;
                    dispatch(msgList({userid, msg: res.data.msgs, users: res.data.users}));
                }
            })
    }
};

// 发送信息
export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg});
    }
}

// 接受信息
const msgRecv = (data, userid) => ({type: MSG_REVC, payload: data, userid: userid})
export function recvMsg() {
    return (dispatch, getState) => {
        socket
            .on('recvmsg', function (data) {
                const userid = getState().user._id;
                dispatch(msgRecv(data, userid));
            })
    }
}