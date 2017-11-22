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
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import AuthRoute from './components/AuthRoute/AuthRoute';


const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;

const store = createStore(Reducers, compose(applyMiddleware(thunk), reduxDevtools));

const BOSSPAGE = ()=>(<h2>BOOS page</h2>)
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
           <div>
               <AuthRoute></AuthRoute>
               <Route path='/boss' component={BOSSPAGE}></Route>
               <Route path='/login' component={Login}></Route>
               <Route path='/register' component={Register}></Route>
           </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));