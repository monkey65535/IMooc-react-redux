import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
function getLastItemByTime(items = []) {
    return items.sort((a, b) => b.create_time - a.create_time)[0];
}

@connect(state => state, null)
class Message extends Component {
    render() {
        let chatMes = {};
        this
            .props
            .chat
            .chatmsg
            .forEach(el => {
                if (!chatMes[el.chatid]) {
                    chatMes[el.chatid] = [];
                }
                chatMes[el.chatid].push(el);
            });
        const chatUsers = Object.keys(chatMes);
        const userId = this.props.user._id;
        const userInfo = this.props.chat.users;
        return (
            <div>
                {chatUsers.map((el, i) => {
                    const lastMessage = getLastItemByTime(chatMes[el]);
                    const targetId = lastMessage.from === userId
                        ? lastMessage.to
                        : lastMessage.from;
                    const unReadNum = chatMes[el]
                        .filter(e => !e.read && e.to === userId)
                        .length;
                    if (!userInfo[targetId]) 
                        return null;
                    if (!lastMessage.content) 
                        return null;
                    return (
                        <List key={i}>
                            <Item
                                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                                arrow={`horizontal`}
                                multipleLine={true}
                                extra={<Badge text={unReadNum}></Badge>}
                                onClick={() => {
                                this
                                    .props
                                    .history
                                    .push(`/chat/${targetId}`)
                            }}>
                                {lastMessage.content}
                                <Brief>{userInfo[targetId].name}</Brief>
                            </Item>
                        </List>
                    );
                })}
            </div>
        );
    }
}

export default Message;