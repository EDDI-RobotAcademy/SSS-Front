import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/SideProduct/mutations"
import state from "@/store/SideProduct/SideProductStates"
import actions from "@/store/SideProduct/actions"


Vue.use(Vuex)

const SideProductModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default SideProductModule
