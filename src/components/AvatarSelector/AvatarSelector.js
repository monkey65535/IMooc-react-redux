import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';
class AvatarSelector extends Component {
    static PropTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(){
        super();
        this.state = {
            avatar:''
        }
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map((e) => ({
                icon: require(`../img/${e}.png`),
                text:e
            }));
        
        const isActiveAvatar = this.state.avatar ? (<div>当前选择：<img src={require(`../img/${this.state.avatar}.png`)} width="20" alt=""/></div>) : '请选择头像'
        return (
            <div>
                <List renderHeader={isActiveAvatar}>
                    <Grid data={avatarList}
                    columnNum={5} onClick={el=>{
                        const chooseAvatar = el.text;
                        this.setState({avatar:chooseAvatar})
                        this.props.selectAvatar(chooseAvatar);
                    }}></Grid>
                </List>
            </div>
        );
    }
}

export default AvatarSelector;