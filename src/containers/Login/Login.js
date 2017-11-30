import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import {login} from '../../redux/user.redux';

@connect(state => state.user, {login})
class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pwd: ''
        }
        //绑定事件
        this.goRegister = this
            .goRegister
            .bind(this);
        this.handleChnage = this
            .handleChnage
            .bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    goRegister() {
        const {history} = this.props;
        history.push('/register');
    }
    handleChnage(key, value) {
        this.setState({[key]: value})
    }
    handleLogin(){
        this.props.login(this.state);
    }
    render() {
        return (
            <div>
            {(this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname) ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChnage('user', v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v => this.handleChnage('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;