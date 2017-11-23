import React, {Component} from 'react';
import Logo from '../../components/Logo/Logo';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';

class Login extends Component {
    constructor() {
        super();
        //绑定事件
        this.goRegister = this.goRegister.bind(this);
    }

    goRegister() {
        const {history} = this.props;
        history.push('/register');
    }

    render() {
        return (<div>
            <Logo></Logo>
            <WingBlank>
                <List>
                    <InputItem>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem>
                </List>
                <WhiteSpace/>
                <Button type='primary'>登录</Button>
                <WhiteSpace/>
                <Button onClick={this.goRegister}>注册</Button>
            </WingBlank>
        </div>)
    }
}

export default Login;