<template>
  <div>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted() {
    //原本放在TypeNav 的mouted 中 此时放在App中 只发送请求一次 可以优化性能 
    //通知vuex发送请求，获取数据，存储到仓库中
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
