import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"

import sideProductModule from "@/store/SideProduct/SideProductModule.js"
import productModule from "@/store/Product/ProductModule.js"
import selfSaladModule from "@/store/SelfSalad/SelfSaladModule.js"
import qnaModule from "@/store/Qnaboard/QnaModule.js"
import memberModule from "@/store/Member/MemberModule.js"
import ordercartModule from "@/store/OrderCart/OrderCartModule.js"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideProductModule: sideProductModule,
    productModule: productModule,
    selfSaladModule: selfSaladModule,
    qnaModule: qnaModule,
    memberModule: memberModule,
    ordercartModule: ordercartModule
  },
  state,
  plugins: [
    createPersistedState({
      paths: ['memberModule']
    })
  ]
})

export default store
