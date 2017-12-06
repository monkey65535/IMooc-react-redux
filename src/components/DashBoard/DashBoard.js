import React, {Component} from 'react';
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import {getMsgList,recvMsg} from '../../redux/chat.redux';
// 组件
import Boss from '../Boss/Boss';
import Genius from '../Genius/Genius';
import User from '../User/User';
const Msg = () => (
    <div>Msg首页</div>
);

@connect(state => state, {getMsgList,recvMsg})
class DashBoard extends Component {
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render() {
        const {pathname} = this.props.location;
        const {type} = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: type === 'genius'
            }, {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: type === 'BOSS'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            }, {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];
        const pageName = navList.find(v => v.path === pathname);
        return (
            <div>
                <NavBar className='fixd-header' mode="dark">
                    {pageName
                        ? pageName.title
                        : null}
                </NavBar>
                <div
                    style={{
                    marginTop: '45px',
                    marginBottom: '50px'
                }}>
                    <Switch>
                        {navList.map(key => (
                            <Route key={key.title} path={key.path} component={key.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLink navList={navList}></NavLink>
            </div>
        );
    }
}

export default DashBoard;