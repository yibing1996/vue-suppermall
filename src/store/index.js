import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//1.使用vuex
Vue.use(Vuex)

const state = {
  cratList:[]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store