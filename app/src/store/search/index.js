import { reqGetSearchInfo } from "@/api"
//search 模块小仓库
const state = {
    searchList: {}
}
const actions = {
    //params至少是一个空对象
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
}
//计算属性，在项目当中，为了优化数据而生
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}