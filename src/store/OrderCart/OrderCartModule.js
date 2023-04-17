import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/OrderCart/mutations"
import state from "@/store/OrderCart/OrderCartStates"
import actions from "@/store/OrderCart/actions"


Vue.use(Vuex)

const OrderCartModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default OrderCartModule
