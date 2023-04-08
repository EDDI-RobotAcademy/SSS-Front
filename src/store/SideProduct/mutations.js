import {
    REQUEST_SIDEPRODUCT_LIST_TO_SPRING,
    REQUEST_SIDEPRODUCT_TO_SPRING,
} from './mutation-types'

export default {
    [REQUEST_SIDEPRODUCT_LIST_TO_SPRING] (state, passingData) {
        state.sideProducts = passingData
    },
    [REQUEST_SIDEPRODUCT_TO_SPRING] (state, passingData) {
        state.sideProduct = passingData
    },
}