<template>
  <div>
    <!-- 三级联动全局组件---TypeNav -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
//引入其他组件
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import {mapState} from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted(){
    //派发action，发送请求获取数据
    this.$store.dispatch('getFloorList');
    //派发actions，获取用户登录信息,展示用户信息
    // this.$store.dispatch('getUserInfo');
  },
  computed:{
    //获取仓库中floorList的数据给到home组件
    ...mapState({
      floorList(state){
        return state.home.floorList;
      }
    })
  }
};
</script>

<style>
</style>