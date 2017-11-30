import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, List,Modal} from 'antd-mobile';
import BrowerCookies from 'browser-cookies';
import {Redirect} from 'react-router-dom';

import {logoutSubmit} from '../../redux/user.redux';

@connect(state => state.user, {logoutSubmit})
class User extends Component {
    constructor(){
        super();
        this.handlelogout = this.handlelogout.bind(this);
    }
    handlelogout(){
        const alert = Modal.alert;
        alert('注销','确认退出么？',[
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                BrowerCookies.erase('userid');
                this.props.logoutSubmit();
            }}
        ])
    }
    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                <Result 
                title={props.user}
                message={props.type === 'boss' ? props.company : null} 
                img={<img src={require(`../img/${props.avatar}.png`)} width='30' height='30' alt='用户头像'></img>}
                ></Result>

                <List renderHeader={()=>'用户简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map((el,i) => (<Brief key={i}>{el}</Brief>))}
                        {props.money?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>

                <List renderHeader={()=>'操作'}>
                <Item onClick={this.handlelogout}>
                    退出登录
                </Item>
            </List>
            </div>
        ) : <Redirect to='/login'></Redirect>;
    }
}

export default User;