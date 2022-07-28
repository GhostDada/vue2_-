//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
//引入路由信息
import routes from "./routes";
//引入仓库
import store from "@/store"
//使用插件
Vue.use(VueRouter);
// 创建路由
let router = new VueRouter({
    routes,
    //跳转路由时，滚动条跳到顶部
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    },
});
//全局前置路由守卫（路由跳转前）
router.beforeEach(async (to,from,next)=>{
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //已经登录
    if(token){
        //判断是去login||register
        if(to.path == '/login' || to.path =='/register' ){
            next('/home');//回到home首页
        }else{
            //不是去login登录页
            //判断还存在用户信息？
            if(name){
                next();//放行
            }else{
                try {
                    //没有用户信息，需要重新发送请求获取用户信息
                    await store.dispatch('getUserInfo');
                    next();//放行
                } catch (error) {
                    //token失效了，发送请求清除token
                    await store.dispatch('logOut');
                    next('/login');
                }
            }
        }
    }else{
        //没有登录
        let toPath = to.path;
        //支付相关的路由 回到登录页
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') !=-1 || toPath.indexOf('/paysuccess') !=-1 || toPath.indexOf('/center') !=-1){
            next('/login?redirect='+toPath);
        }else{
            //除了支付相关路由 其他都放行
            next();
        }
    }
});


export default router;