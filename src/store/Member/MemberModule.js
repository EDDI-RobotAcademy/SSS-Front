import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/Member/mutations"
import state from "@/store/Member/MemberStates"
import actions from "@/store/Member/actions"


Vue.use(Vuex)

const MemberModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default MemberModule
