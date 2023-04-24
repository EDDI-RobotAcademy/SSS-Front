import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/Payment/mutations"
import state from "@/store/Payment/PaymentStates"
import actions from "@/store/Payment/actions"


Vue.use(Vuex)

const Pay = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default Pay
