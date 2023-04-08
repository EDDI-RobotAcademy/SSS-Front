import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/Qnaboard/mutations"
import state from "@/store/Qnaboard/QnaStates"
import actions from "@/store/Qnaboard/actions"


Vue.use(Vuex)

const Qnaboard = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default Qnaboard
