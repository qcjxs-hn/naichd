
// // 跨域配置
 
// module.exports = {
//   devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
//       port: '8081',
//       proxy: {                 //设置代理，必须填
//           '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
//               target: 'http://127.0.0.1:8084/',     //代理的目标地址
//               changeOrigin: true,
//               allowedHosts: "all",
//               historyApiFallback: true,
//               secure:false,              //是否设置同源，输入是的
//               pathRewrite: {                   //路径重写
//                   '^/api': ''                     //选择忽略拦截器里面的内容
//               }
//           }
//       }
//   },
//   //  publicPath: './',

// };
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '127.0.0.1', 
    port: 8080,
    proxy: {                 //设置代理，必须填
          '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
              target: 'https://127.0.0.1:8443/',     //代理的目标地址
              changeOrigin: true,
              allowedHosts: "all",
              historyApiFallback: true,
              secure:false,              //是否设置同源，输入是的
              pathRewrite: {                   //路径重写
                  '^/api': ''                     //选择忽略拦截器里面的内容
              }
          }
      },
    historyApiFallback: true,
    allowedHosts: "all"
  }
})
