/**路由懒加载（当访问某个路由时，才会加载相应的组件）
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */
export default [
    //主页
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    //搜索页
    {
        name: 'search',
        path: '/search/:keyword?',//使用params传参 需要占位  ?表示可传参可不传参
        component: ()=>import('@/pages/Search'),
        meta: { show: true }
    },
    //注册
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    //登录
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    //详情页
    {
        path: '/detail/:skuId',//传递params传参 需要占位符
        component: ()=>import('@/pages/Detail'),
        meta: { show: false }
    },
    //加入购物车
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    //购物车
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: true }
    },
    //结算页
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //从购物车进来
            if(from.path == '/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    //支付
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    //支付成功
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    //个人中心
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: { show: true },
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/MyOrder')
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/GroupOrder')
            },
            //路由重定向
            {
                path:'center',
                redirect:'center/myorder'
            }
        ]
    },
    //路由重定向,当项目打开时候，访问/，立马跳转到首页
    {
        path: '/',
        redirect: '/home'
    }
]