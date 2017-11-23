import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import {register} from '../../redux/user.redux';
import {
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Radio,
    Button
} from 'antd-mobile';

const RadioItem = Radio.RadioItem;

@connect(state => state.user, {register})
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
        this
            .props
            .register(this.state);
    }
    render() {
        return (
            <div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg
                            ? (
                                <div
                                    style={{
                                    textAlign: 'center',
                                    color: '#f00',
                                    margin: '10px 0'
                                }}>{this.props.msg}</div>
                            )
                            : null}
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