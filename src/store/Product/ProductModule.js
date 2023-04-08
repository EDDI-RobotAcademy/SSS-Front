import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/Product/mutations"
import state from "@/store/Product/ProductStates"
import actions from "@/store/Product/actions"


Vue.use(Vuex)

const ProductModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default ProductModule
