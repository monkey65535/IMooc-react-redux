import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from './Auth.redux';
@connect((state) => ({isLogin: state.AuthReducer.isLogin}), {login})
class Auth extends Component {
    render() {
        const {isLogin,login} = this.props;
        const defaultDom = (
            <button onClick={login}>登录</button>
        )
        const toDashBoard = <Redirect to='/dashboard'></Redirect>
        return (
            <div>
                {isLogin ? toDashBoard : defaultDom}
            </div>
        );
    }
}

export default Auth;