// 定义常量
const ADD_GUN = '加';
const REMOVE_GUN = '减'
// 定义reducer
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return state = 10;
    }
}

//定义actionCreater

export function addGun() {
    return {type: ADD_GUN}
}
export function removeGun() {
    return {type: REMOVE_GUN}
}

export function addAsync(){
    return dispatch => {
        setTimeout(()=>{
            dispatch(addGun())
        },2000)
    }
}