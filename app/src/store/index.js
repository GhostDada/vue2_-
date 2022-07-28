//Vuex仓库
import Vue from "vue";
import Vuex from "vuex";
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
Vue.use(Vuex);

//vuex 模块化管理
export default new Vuex.Store({
    namespaced: true,
    //小仓库合并大仓库
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});