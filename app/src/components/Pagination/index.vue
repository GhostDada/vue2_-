<template>
  <div class="pagination">
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo',1)"
      :class="{active:pageNo==1}"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>

    <button style="margin-left: 30px">{{ total }}</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页数的起始页与结束页
    startNumAndEndNum() {
      //解构
      const { totalPage, total, continues, pageNo } = this;

      //初始化
      let start = 0;
      let end = 0;

      //不正常：总页数没有连续页数多 eg:总页数:3  连续页数:5
      if (total < continues) {
        start = 1;
        end = total;
      } else {
        // 正常: 总页数比连续页数多 eg:总页数:31 连续页数：5 当前页数pageNo： 8  那么起始页：6 结束页：10
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);

        //不正常：如果当前页数是否小于1
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //不正常：如果当前页大于totalPage
        if (end > totalPage) {
          //eg: 32
          end = totalPage; //end = 31
          start = totalPage - continues + 1; //start = 27
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>