import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"

import sideProductModule from "@/store/SideProduct/SideProductModule.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideProductModule: sideProductModule,
  },
  state,
})

export default store
