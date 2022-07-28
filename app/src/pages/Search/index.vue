<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑 带有x结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑分类 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCateGoryName">×</i>
            </li>
            <!-- 面包屑关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyWord">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台售卖的属性 -->
            <li
              class="with-x"
              v-for="(attrsValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrsValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--子组件-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a href="#" @click="changeOrder('1')"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up1': isAsc, 'icon-down1': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }">
                  <a href="#" @click="changeOrder('2')"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up1': isAsc, 'icon-down1': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //一级菜单
        category1Id: "",
        // 二级菜单
        category2Id: "",
        //三级菜单
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 品牌参数
        props: [],
        // 品牌
        trademark: "",
        order: "1:desc", //设置默认排序
        // 分页器 默认第一页
        pageNo: 1,
        // 每页展示10条信息
        pageSize: 10,
      },
    };
  },
  beforeMount() {
    //Object.assign()方法 可以合并对象并且赋值
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  //组件挂载完毕执行一次
  mounted() {
    this.getData();
  },
  //挂载完毕之前执行一次  用于发送请求之前获取搜索的参数
  methods: {
    //发送请求
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类的名字
    removeCateGoryName() {
      //删除分类的名字
      this.searchParams.categoryName = undefined; //设为undefined可以不同带给服务器，从而优化性能
      //清除通过点击三级菜单的信息id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //再次发起请求服务器
      // this.getData();  //这里可以不用写，因为watch已经对$router进行了监听
      //通过跳转到自己的路由 来清除地址栏上的query参数,并且判断是否带有params参数，有则params不用清除
      if (this.$route.params) {
        //跳转到自己的路由身上,并且保存params参数
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //清除关键字
    removeKeyWord() {
      this.searchParams.keyword = undefined;
      // this.getData();  //这里可以不用写，因为watch已经对$router进行了监听
      //通知Hearde组件清除关键字
      this.$bus.$emit("clearKeyWord");
      //清除关键字的同时，清除params参数,并保留query参数,进行路由跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义回调函数（子给父传数据）
    tradeMarkInfo(trademark) {
      //整理参数到searchParams中
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发起请求,获取服务器数据
      this.getData();
    },
    //清除品牌的分类
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      //再次发送请求
      this.getData();
    },
    //自定义回调函数 获取子组件的手机属性
    attrInfo(attrs, attrsValue) {
      // console.log(attrs,attrsValue);
      //整理传过来的数据 [属性ID：属性值：属性名]
      let props = `${attrs.attrId}:${attrsValue}:${attrs.attrName}`;
      //放到data属性 中的 searchParams中去，并且数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      //再次发送请求
      this.getData();
    },
    //删除售卖属性
    removeAttr(index) {
      //删除数组
      this.searchParams.props.splice(index, 1);
      //再次发送请求
      this.getData();
    },
    //排序操作
    changeOrder(flag) {
      //获取1还是2（综合或者是价格）
      let originFlag = this.searchParams.order.split(":")[0];
      //获取是升序还是降序
      let originSort = this.searchParams.order.split(":")[1];
      //准备一个新的newOrder
      let newOrder = "";
      //点击是综合
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击的价格
        newOrder = `${flag}:${"desc"}`;
      }
      //将新的newOrder赋值与searchProps.order
      this.searchParams.order = newOrder;
      //再次发送请求
      this.getData();
    },
    //获取分页器组件的传过来的pageNO
    getPageNo(pageNo){
      //重新整理searchParams.pageNo
      this.searchParams.pageNo = pageNo;
      //再次发送请求
      this.getData();
    }
  },
  computed: {
    //从仓库中拿到goodlist的值
    ...mapGetters(["goodsList"]),
    //从仓库中拿total的值
    ...mapState({
      total(state){
        return state.search.searchList.total;
      }
    }),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    //是否为升序
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    //是否为降序
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，则再次发起请求
    $route(newValue, oldValue) {
      //在发起请求时，整理服务器的参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      //发起请求
      this.getData();
      //把一级，二级，三级分类菜单的id清空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>