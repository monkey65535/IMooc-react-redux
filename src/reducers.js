import {combineReducers} from 'redux';
import {counter} from './index.redux';
import {AuthReducer} from './Auth.redux';

export default combineReducers({counter,AuthReducer});