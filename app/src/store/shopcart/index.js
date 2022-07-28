import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
    cartList: []
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqGetCartList();
        if (result.code == 200) {
            commit('CARTLIST', result.data);
        }
    },
    //删除购物车一个接口
    async DeleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "成功";
        } else {
            return Promise.reject(new Error('失败'));
        }
    },
    //修改购物车选中状态
    async UpdateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "成功";
        } else {
            return Promise.reject(new Error('失败'));
        }
    },
    //删除选中的全部产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context：小仓库 ,commit【提交mutations修改state】 dispatch【派发actions】 getters【计算属性】 state【当前仓库数据】
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('DeleteCartById', item.skuId) : '';
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    },
    //修改全选状态
    updateAllCartIsChecked({ state,dispatch }, isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked });
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    }
}
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}