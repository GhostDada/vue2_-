//对axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';
//创建axios实例
const mockAjax = axios.create({
    baseURL:'/mock',
    //请求时间超过5000
    timeout:5000
});

//请求拦截器---发送请求之前可以做一些事情
mockAjax.interceptors.request.use((config)=>{
    //进度条开始
    nprogress.start();
    return config;
});
//响应拦截器----请求回来后可以做一些事
mockAjax.interceptors.response.use((response)=>{
    //进度条结束
    nprogress.done();
    return response.data;
},(error)=>{
    return Promise.reject(new Error(error));
});

export default mockAjax;