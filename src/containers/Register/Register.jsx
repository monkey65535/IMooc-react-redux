import React, {Component} from 'react';
import Logo from '../../components/Logo/Logo';
import {
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Radio,
    Button,
    Toast
} from 'antd-mobile';
const RadioItem = Radio.RadioItem;

class Register extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pwd: '',
            confirmPwd: '',
            type: 'genius'
        }
        this.handleChnage = this
            .handleChnage
            .bind(this);
        this.handleRegister = this
            .handleRegister
            .bind(this);
    }
    handleChnage(key, value) {
        this.setState({[key]: value})
    }
    handleRegister() {
        console.log(this.state);
        const {user,pwd,confirmPwd} = this.state;
        if(!user.trim()){
            Toast.show('请输入用户名',1);
            return;
        }
        if(!pwd.trim()){
            Toast.show('请输入密码',1);
            return;
        }
        if(pwd !== confirmPwd){
            Toast.show('两次输入的密码不一致',1);
            return;
        }

    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChnage('user', v)}>用 户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v => this.handleChnage('pwd', v)}>密 码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v => this.handleChnage('confirmPwd', v)}>确认密码</InputItem>
                    </List>
                    <List renderHeader={() => '选择身份'}>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={v => this.handleChnage('type', 'genius')}>牛人</RadioItem>
                        <RadioItem
                            checked={this.state.type === 'BOSS'}
                            onChange={v => this.handleChnage('type', 'BOSS')}>BOSS</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <List>
                        <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    </List>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}

export default Register;