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
    users:{},
    unRead: 0
};
// reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: [...action.payload.msg],
                unRead:action.payload.msg.filter(v =>!v.read).length,
                users:{...action.payload.users}
            };
        case MSG_REVC:
            return {
                ...state,
                chatmsg: [...state.chatmsg,action.payload],
                unRead:state.unRead + 1
            };
        case MSG_READ:
            return {
                ...state,
            };
        default:
            return state;
    }
}

// create action 获取信息列表
const msgList = ({msg,users}) => ({type: MSG_LIST, payload:{msg,users}})
export function getMsgList() {
    return dispatch => {
        Axios
            .get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res);
                    dispatch(msgList({msg:res.data.msgs,users:res.data.users}));
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
const msgRecv = data => ({type: MSG_REVC, payload: data})
export function recvMsg() {
    return dispatch => {
        socket
            .on('recvmsg', function (data) {
                console.log('recvmsg', data);
                dispatch(msgRecv(data));
            })
    }
}