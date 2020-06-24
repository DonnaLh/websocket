import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'
import './components/index'
import socketio from 'socket.io-client'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)
// const options = { path: '/websocket/' }; //Options object to pass into SocketIO
Vue.use(new VueSocketio({
  debug: true,
  connection: socketio('http://localhost:3000'),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}))




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
