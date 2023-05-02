import {
  REQUEST_ADD_CART_LIST_TO_SPRING,
  REQUEST_SELFSALAD_TO_SPRING,
  REQUEST_ORDER_INFO_FROM_SPRING,
  REQUEST_COMPLETE_ORDER_TO_SPRING,
} from './mutation-types'

export default {
  [REQUEST_ADD_CART_LIST_TO_SPRING] (state, passingData) {
      state.cartItems = passingData
  },
  [REQUEST_SELFSALAD_TO_SPRING] (state, passingData) {
      state.selfSalad = passingData
  },
  [REQUEST_ORDER_INFO_FROM_SPRING](state, passingData) {
    state.orderList = passingData
  },

  [REQUEST_COMPLETE_ORDER_TO_SPRING] (state, passingData) {
    state.completeOrders = passingData
  }
}