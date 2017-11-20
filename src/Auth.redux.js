// 定义action
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';


// 定义reducer
export const AuthReducer = (state={isLogin:false,username:'AAA'},action)=>{
    switch(action.type){
        case 'LOGIN':
        return {...state,isLogin:true};
        case 'LOGOUT':
        return {...state,isLogin:false};
        default:
        return state;
    }
}


// 定义actionCreater

export const login = ()=>({type:LOGIN});
export const logout = ()=>({type:LOGOUT});
