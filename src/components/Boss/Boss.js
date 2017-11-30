import React, {Component} from 'react';
import {WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

import UserCard from '../UserCard/UserCard';
@connect(state=>(state.chatUser),{getUserList})
class Boss extends Component {
    componentDidMount(){
        this.props.getUserList('genius');
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    <UserCard userlist={this.props.userList}></UserCard>
                </WingBlank>
            </div>
        );
    }
}

export default Boss;