import React, {Component} from 'react';
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';

import AvatarSelector from '../../components/AvatarSelector/AvatarSelector';
class Bossinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: ''
        }
    }
    handleChangeState(key, value) {
        this.setState({[key]: value});
    }
    render() {
        return (
            <div>
                <NavBar mode='dark'>完善BOSS信息</NavBar>
                <AvatarSelector></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={v => this.handleChangeState('title', v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChangeState('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChangeState('money', v)}>职位薪资</InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title='职位要求'
                    onChange={v => this.handleChangeState('desc', v)}></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Button type='primary'>保存</Button>
                </WingBlank>

            </div>
        );
    }
}

export default Bossinfo;