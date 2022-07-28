//对axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';
//中仓库中引入游客的id
import store from '@/store';
//创建axios实例
const requests = axios.create({
    baseURL:'/api',
    //请求时间超过5000
    timeout:5000
});

//请求拦截器---发送请求之前可以做一些事情
requests.interceptors.request.use((config)=>{
    //判断是否存在游客id
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段:userTempId(不能随便写)
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //把token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    //进度条开始
    nprogress.start();
    return config;
});
//响应拦截器----请求回来后可以做一些事
requests.interceptors.response.use((response)=>{
    //进度条结束
    nprogress.done();
    return response.data;
},(error)=>{
    return Promise.reject(new Error(error));
});

export default requests;