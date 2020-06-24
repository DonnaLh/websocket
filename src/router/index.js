import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const files = require.context('.', true, /\.js$/)

// console.log(files.keys(), files) // ["./home.js"] 返回一个数组

let configRouters = []

files.keys().forEach(key => {
  if (key.includes('index.js')) return
  configRouters = configRouters.concat(files(key).default) // 读取出文件中的default模块
})

// console.log(configRouters, 'configRouters')


const routes = configRouters

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
