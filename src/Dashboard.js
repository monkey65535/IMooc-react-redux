import React, {Component} from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import App from './App';
import {connect} from 'react-redux';
import {logout} from './Auth.redux';
const two = () => (
    <h2>two Page</h2>
);
const three = () => (
    <h3>three Page</h3>
);
@connect((state) => ({isLogin: state.AuthReducer.isLogin}), {logout})
class Dashboard extends Component {
    render() {
        const {isLogin, logout} = this.props;
        const doms = (
            <div>
                <div>Dashboard Page
                    <button onClick={logout}>Lougot</button>
                </div>
                <br/>
                <br/>
                <Link to='/dashboard/'>111111111111111</Link>
                <br/>
                <br/>
                <Link to='/dashboard/two'>22222222222222222</Link>
                <br/>
                <br/>
                <Link to='/dashboard/three'>3333333333333</Link>
                <br/>
                <br/>
                <div className="routerInfo">
                    <Route path='/dashboard/' exact component={App}></Route>
                    <Route path='/dashboard/two' component={two}></Route>
                    <Route path='/dashboard/three' component={three}></Route>
                </div>
            </div>
        )
        const toLogin = <Redirect to='/login'></Redirect>
        return (<div>
            {isLogin ? doms : toLogin}
            </div>);
    }
}

export default Dashboard;