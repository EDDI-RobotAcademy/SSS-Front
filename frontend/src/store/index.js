import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"
import actions from "@/store/actions"
import mutations from "@/store/mutations"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,

  plugins: [
    createPersistedState({
      paths: ['signInValue', 'memberInfoAboutSignIn', 'userToken']
    })
  ]
})
