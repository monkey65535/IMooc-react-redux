import Axios from 'axios';
import {Toast} from 'antd-mobile';

Axios.interceptors.request.use(config => {
    Toast.loading('加载中', 0);
    return config;
});

Axios.interceptors.response.use(config => {
    Toast.hide();
    return config;
});