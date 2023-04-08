import Vue from 'vue'
import Vuex from 'vuex'

import state from "@/store/states"

import sideProductModule from "@/store/SideProduct/SideProductModule.js"
import productModule from "@/store/Product/ProductModule.js"
import selfSaladModule from "@/store/SelfSalad/SelfSaladModule.js"
import qnaModule from "@/store/Qnaboard/QnaModule.js"
import memberModule from "@/store/Member/MemberModule.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideProductModule: sideProductModule,
    productModule: productModule,
    selfSaladModule: selfSaladModule,
    qnaModule: qnaModule,
    memberModule: memberModule,
  },
  state,
})

export default store
