import { reqGetCode,reqUserRegiter,reqUserLogin,reqGetUserInfo,reqLogOut } from "@/api"
import { setToken,removeToken } from "@/utils/token";
const state = {
    //验证码
    code:'',
    //用户登录的唯一标识符（令牌）
    token:localStorage.getItem('TOKEN'),
    //用户登录信息
    userInfo:{}
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200 ){
            commit('GETCODE',result.data);
            return "成功";
        }else{
            return Promise.reject(new Error('失败'));
        }
    },
    //用户注册
    async userRegiter({commit},user){
        let result = await reqUserRegiter(user);
        if(result.code == 200 ){
            return "成功";
        }else{
            return Promise.reject(new Error('失败'));
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if(result.code == 200 ){
            commit('USERLOGIN',result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return "成功";
        }else{
            return Promise.reject(new Error("失败"));
        }
    },
    //获取用户登录信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo();
        if(result.code == 200 ){
            commit('GETUSERINFO',result.data);
            return "成功";
        }else{
            return Promise.reject(new Error("失败"));
        }
    },
    //退出登录(清除用户信息,和token)
    async logOut({commit}){
        let result = await reqLogOut();
        if(result.code == 200 ){
            commit('CLEAR');
            return "成功";
        }else{
            return Promise.reject(new Error('失败'));
        }
    }
}
const mutations = {
    //验证码
    GETCODE(state,code){
        state.code = code;
    },
    //用户登录
    USERLOGIN(state,token){
        state.token = token;
    },
    //获取用户登录信息
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    //退出登录（清除用户信息和token）
    CLEAR(state){
        state.userInfo = '';
        state.token = '';
        removeToken();
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}