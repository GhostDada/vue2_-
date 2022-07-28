//引入API接口
import { reqGetGoodsInfo ,reqAddOrUpdateCar } from "@/api"
import { getUUID } from "@/utils/uuid_token";

const state = {
    goodsInfo:{},
    uuid_token:getUUID()
}
const actions = {
    async getGoodsInfo({commit},skuId){
        let result = await reqGetGoodsInfo(skuId);
        if(result.code == 200){
            commit('GETGOODSINFO',result.data);
        }
    },
    //加入购物车时||更新购物车时，发送请求
    async addOrUpdateCar({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateCar(skuId,skuNum);
        //加入购物车成功
        if(result.code == 200){
            return "成功";
        }else{
            return Promise.reject(new Error('失败'));
        }
    }
}
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo;
    }
}
//为了优化数据而生
const getters = {
    //导航栏数据优化
    categoryView(state){
        return state.goodsInfo.categoryView || {};
    },
    //产品属性数据优化
    skuInfo(state){
        return state.goodsInfo.skuInfo || {};
    },
    //售卖属性数据优化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || [];
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
}
