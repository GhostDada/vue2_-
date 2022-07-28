//当前模块：统一管理API接口
import request from './request';
import mockRequest from './mockAjax';
export const reqCategoryList = function () {
    return request({ url: '/product/getBaseCategoryList', method: 'get' });
}
//获取banner（Home首页轮播图接口）
export const reqGetBannerList = function () {
    return mockRequest.get('/banner');
}

//获取floor组件的数据
export const reqGetFloorList = function () {
    return mockRequest.get('/floor');
}

//获取search模块的数据
export const reqGetSearchInfo = function (params) {
    return request({
        url: '/list',
        method: 'post',
        data: params
    });
}

//获取detail详情页的数据
export const reqGetGoodsInfo = function (skuId) {
    return request({
        url: `/item/${skuId}`,
        method: 'get',
    });
}

//加入购物车时，发送请求
export const reqAddOrUpdateCar = function (skuId, skuNum) {
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    });
}

//点击结算购物车时，再次发送请求,获取购物车列表
export const reqGetCartList = function () {
    return request({
        url: '/cart/cartList',
        method: 'get'
    });
}

//点击删除时，发送请求，删除购物车接口
export const reqDeleteCartById = function (skuId) {
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    });
}

//修改购物车选中状态
export const reqUpdateCheckedById = function (skuId, isChecked) {
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    });
}

//获取验证码
export const reqGetCode = function (phone) {
    return request({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    });
}

//用户注册
export const reqUserRegiter = function (data) {
    return request({
        url: '/user/passport/register',
        method: 'post',
        data
    });
}

//用户登录
export const reqUserLogin = function (data) {
    return request({
        url: '/user/passport/login',
        method: 'post',
        data
    });
}

//获取用户登录信息
export const reqGetUserInfo = function () {
    return request({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    });
}

//退出登录
export const reqLogOut = function () {
    return request({
        url: '/user/passport/logout',
        mehtod: 'get'
    });
}

//获取用户地址信息
export const reqAddressInfo = function(){
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    });
}

//获取订单信息
export const reqOrderInfo = function (){
    return request({
        url:'/order/auth/trade',
        method:'get'
    });
}

//获取订单接口
export const reqSubmitOrder = function(tradeNo,data){
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    });
}

//获取支付信息
export const reqPayInfo = function(orderId){
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    });
}

//获取支付状态信息
export const reqPayStatus = function(orderId){
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    });
}

//获取订单列表
export const reqOrderList = function(page,limit){
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    });
}