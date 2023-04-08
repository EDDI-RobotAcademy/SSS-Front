import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"

import sideProductModule from "@/store/SideProduct/SideProductModule.js"
import productModule from "@/store/Product/ProductModule.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideProductModule: sideProductModule,
    productModule: productModule,
  },
  state,
})

export default store
