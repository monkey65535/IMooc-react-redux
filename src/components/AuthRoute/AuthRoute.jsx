import React, {Component} from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends Component {
    componentDidMount() {
        //    判断当前打开页面
        const publicList = ['/login', '/reigster'];
        const {pathname} = this.props.location;
        if (publicList.indexOf(pathname) !== -1) return;

        //    获取用户信息
        Axios.get('/user/info').then(res => {
            if (res.status === 200) {
                const {code} = res.data;
                if (code === 0) {
                    //    有登陆信息
                    this.props.history.push('/register');
                } else {
                    //    没有登陆信息
                    this.props.history.push('/login');
                }
            }
        })
        //    判断用户是否登录
        //    用户的身份判断
        //    用户是否完善信息（选择头像，个人简介）

    }

    render() {
        return null
    }
}

export default AuthRoute;