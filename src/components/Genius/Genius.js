import React, {Component} from 'react';
import {WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import UserCard from '../UserCard/UserCard';
import {getUserList} from '../../redux/chatuser.redux';


@connect(state=>(state.chatUser),{getUserList})
class Genius extends Component {
    componentDidMount(){
        this.props.getUserList('boss');
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                        <UserCard userlist={this.props.userList}></UserCard>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        );
    }
}

export default Genius;