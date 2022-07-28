const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,//打包文件时不生map后缀文件
  lintOnSave:false,//关闭提示
  //代理服务器(解决跨域问题)
  devServer: {
    proxy: {
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
      }
    },
  },
})
