import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/SelfSalad/SelfsaladStates"
import actions from "@/store/SelfSalad/actions"
import mutations from "@/store/SelfSalad/mutations"

Vue.use(Vuex)

const SelfSaladModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default SelfSaladModule
