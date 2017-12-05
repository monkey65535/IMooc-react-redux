import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
@withRouter
@connect(state => state.chat, null)
class NavLink extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        const {navList} = this.props;
        const {pathname} = this.props.location;
        const filterList = navList.filter(e => !e.hide)
        return (
            <TabBar>
                {filterList.map((el) => ( < TabBar.Item key = {
                    el.text
                }
                title = {
                    el.text
                }
                badge = {
                    el.path === '/msg'
                        ? this.props.unRead
                        : 0
                }
                icon = {
                    require(`./img/${el.icon}.png`)
                }
                selectedIcon = {
                    require(`./img/${el.icon}-active.png`)
                }
                selected = {
                    el.path === pathname
                }
                onPress = {
                    (ev) => {
                        this
                            .props
                            .history
                            .push(el.path)
                    }
                } > </TabBar.Item>))}
            </TabBar>
        );
    }
}

export default NavLink;