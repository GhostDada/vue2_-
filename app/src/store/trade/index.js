import {reqAddressInfo,reqOrderInfo} from "@/api";
const state = {
    addressInfo:[],
    orderInfo:{}
}
const actions = {
    //获取用户地址信息
    async addressInfo({commit}){
        let result = await reqAddressInfo();
        if(result.code == 200){
            commit('ADDRESSINFO',result.data);
        }
    },
    //获取订单信息
    async orderInfo({commit}){
        let result = await reqOrderInfo();
        if(result.code == 200 ){
            commit('ORDERINFO',result.data);
        }
    }
}
const mutations = {
    //获取用户地址信息
    ADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo;
    },
    //获取订单信息
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo;
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}