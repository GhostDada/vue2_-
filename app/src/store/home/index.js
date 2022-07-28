//home 模块小仓库
import { reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api"
//数据存储仓库
const state={
    //home仓库中三级菜单的数据
    categoryList:[],
    //存储轮播图的数据
    bannerList:[],
    //存储floor的数据
    floorList:[]
}
//可以写自己的逻辑
const actions={
    //发送请求获取三级菜单的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code === 200){
            commit('CATEGORYLIST',result.data);
        }
    },
    //发送请求获取轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200 ){
            commit('GETBANNERLIST',result.data);
        }
    },
    //发送请求获取floor的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code == 200){
            commit('GETFLOORLIST',result.data);
        }
    }
}
//唯一能修改state的地方
const mutations={
    //三级菜单
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    //轮播图的数据
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    //floor的数据
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
}
const getters={}

export default {
    state,
    actions,
    mutations,
    getters,
}