import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connect: false,
    userlist: [],
    msgList: [],
    myname: {}
  },
  getters: {
    userlist: state => state.userlist,
    msgList: state => state.msgList,
    myname: state => state.myname,
  },
  mutations: {
    'SOCKET_CONNECT' (state) {
      state.connect = true;
    },
    USER_LIST(state, userlist){
      state.userlist = userlist
    },
    MSG_LIST(state, msgList){
      state.msgList = msgList
    },
    MY_NAME(state, myname){
      state.myname = myname
    }
  },
  actions: {
    socketConnect({ commit }, value) {
      commit('SOCKET_CONNECT', value)
    },
    getUserList({ commit }, value){
      commit('USER_LIST', value)
    }
  },
  modules: {
  }
})
