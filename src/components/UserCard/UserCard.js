import React, {Component} from 'react';
import {Card, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';
class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    render() {
        const {userlist} = this.props;
        return (
            <div>
                {userlist.length > 0 ? userlist.map(el=>(
                    el.avatar ? (<div className="card-Item" key={el._id}>
                    <Card>
                        <Card.Header title={el.user} thumb={require(`../img/${el.avatar}.png`)} extra={<span>{el.title}</span>}></Card.Header>
                        <Card.Body>{
                            el.desc.split('\n').map(e=>(<div key={e}>{e}</div>))
                        }</Card.Body>
                    </Card>
                    <WhiteSpace></WhiteSpace>
                </div>) : null
                )) : null}
            </div>
        );
    }
}

export default UserCard;