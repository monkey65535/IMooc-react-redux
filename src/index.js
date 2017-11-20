import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import App from './App';
import Error404 from './Error404';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Reducers from './reducers';

const reduxDevtools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f

const store = createStore(Reducers, compose(applyMiddleware(thunk), reduxDevtools));
console.log(store.getState());
ReactDom.render(
    <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App}></Route>
            <Route path='/login' component={Auth}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Route path='/404' component={Error404}></Route>
            <Redirect to='/404'></Redirect>
        </Switch>
    </BrowserRouter>

</Provider>, document.getElementById('root'));