import React, {Component} from 'react';
import {List, InputItem, NavBar,Icon,Grid} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendMsg,getMsgList,recvMsg,readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';

@withRouter
@connect(state => state, {getMsgList,sendMsg,recvMsg,readMsg})
class Chat extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            msg: [],
            showEmoji:false
        }
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.handleShowEmoji = this.handleShowEmoji.bind(this);
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    componentWillUnmount(){
        this.props.readMsg(this.props.match.params.userId)
    }
    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const msg = this.state.text;
        this
            .props
            .sendMsg({from, to, msg});
        this.setState({text: ''})
    }
    handleShowEmoji(ev){
        ev.stopPropagation();
        this.setState({showEmoji:!this.state.showEmoji});
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    render() {
        const {userId} = this.props.match.params;
        const Item = List.Item;
        const {users} = this.props.chat;
        const chatMsg = this.props.chat.chatmsg.filter(el=>el.chatid === getChatId(userId,this.props.user._id));

        //emoji表情列表
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '.split(' ').filter(el => el).map(e=>({text:e}));
        if(!users[userId]) return null;
        return (
            <div id="chat-page">
                <NavBar 
                    model='dark' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    className='fixed-top-bar'
                >
                    {users[userId].name}
                </NavBar>
                <div className="chat-content" style={{margin:'50px 0'}}>
                {chatMsg.map((el, i) => {
                        const avatar = require(`../img/${users[el.from].avatar}.png`);
                        if(el.content){
                            return userId === el.from ? (
                                <List key={i}>
                                <Item
                                thumb={<img src={avatar} alt='用户头像'/>} 
                                >
                                    {`${el.content}`}
                                </Item>
                                </List>
                            ) : (
                                <List key={i}>
                                    <Item 
                                        className='chat-me'
                                        extra={<img src={avatar} alt='用户头像'/>}
                                    >
                                        {`${el.content}`}
                                    </Item>
                                </List>
                               
                            );
                        }else{
                            return null;
                        }
                    })}
                    </div>
                <div className="stick-footer fixed-bottom-bar">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            extra={<span> <span style={{marginRight:'10px'}} onClick={this.handleShowEmoji}>😀</span>   <span onClick={this.handleSubmit}>发送</span></span>}
                            onChange={v => this.setState({text: v})}>
                        </InputItem>
                    </List>
                    {this.state.showEmoji ? (<Grid 
                        data={emoji} 
                        columnNum={9}
                        isCarousel={true}
                        onClick={(e)=>{
                            console.log(e);
                            this.setState({text:`${this.state.text}${e.text}`})
                        }}
                    >
                    </Grid>) : null}
                    
                </div>
            </div>
        );
    }
}

export default Chat;