import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router';
//全局组件
import TypeNav from './components/TypeNav';
import Pagination from '@/components/Pagination';
//引入vuex
import store from './store';
//引入mockServe.js文件
import './mock/mockServe.js';
//引入swiper样式
import 'swiper/css/swiper.css';
//统一引入API接口
import * as API from "@/api";

//按需引入element-ui
import { Button,MessageBox} from 'element-ui';

//引入lazyload图片懒加载
import VueLazyload from 'vue-lazyload';
//使用图片懒加载
Vue.use(VueLazyload,{
  loading: '@/asset/1.jpg',
});

//引入表单验证vee-validate插件
import "@/plugins/validate";

//注册elemnet-ui组件
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//注册全局组件---Vue.component(组件名，组件位置)
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagination.name,Pagination);
Vue.config.productionTip = false;

new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate(){
    //注册全局事件总线
    Vue.prototype.$bus = this;
    //将接口绑定到VUE实例对象的原型上
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册vuex
  store
});
