import React, {Component} from 'react';
import {Card, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
@withRouter
class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick({user,_id}){
        this.props.history.push(`/chat/${_id}`);
    }
    render() {
        const {userlist} = this.props;
        return (
            <div>
                {userlist.length > 0 ? userlist.map(el=>(
                    el.avatar ? (<div className="card-Item" key={el._id}>
                    <Card onClick={()=>{this.handleClick(el)}}>
                        <Card.Header title={el.user} thumb={require(`../img/${el.avatar}.png`)} extra={<span>{el.title}</span>}></Card.Header>
                        <Card.Body>
                            {el.type === 'boss' ? <div>公司：{el.company}</div> : null}
                            {el.desc.split('\n').map(e=>(<div key={e}>{e}</div>))}
                            {el.type === 'boss' ? <div>薪资：{el.money}</div> : null}
                        </Card.Body>
                    </Card>
                    <WhiteSpace></WhiteSpace>
                </div>) : null
                )) : null}
            </div>
        );
    }
}

export default UserCard;