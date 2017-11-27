import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Reducers from './reducers';

//引入axios拦截器
import './config';
//引入页面组件

// 注册登录相关
import AuthRoute from './components/AuthRoute/AuthRoute';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

// 完善个人信息

import BossInfo from './containers/BossInfo/Bossinfo';
import GeniusInfo from './containers/GeniusInfo/GeniusInfo';



const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;

const store = createStore(Reducers, compose(applyMiddleware(thunk), reduxDevtools));

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
           <div>
               <AuthRoute></AuthRoute>
               <Route path='/login' component={Login}></Route>
               <Route path='/register' component={Register}></Route>
               <Route path='/bossinfo' component={BossInfo}></Route>
               <Route path='/geniusInfo' component={GeniusInfo}></Route>
           </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));