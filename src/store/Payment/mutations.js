import {
    REQUEST_ORDER_PAGE_DELIVERY_LIST_TO_SPRING,
} from './mutation-types'

export default {
    [REQUEST_ORDER_PAGE_DELIVERY_LIST_TO_SPRING](state, passingData) {
        state.orderDeliveryList = passingData
    },
}