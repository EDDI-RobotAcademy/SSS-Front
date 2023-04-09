import {
    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
    REQUEST_READ_REVIEW_TO_SPRING,
    REQUEST_REVIEW_IMAGE_TO_SPRING,
    
} from './mutation-types'

export default {
    [REQUEST_PRODUCT_TO_SPRING] (state, passingData) {
        state.product = passingData
    },
    [REQUEST_PRODUCT_LIST_TO_SPRING] (state, passingData) {
        state.products = passingData
    },

    [REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING] (state, passingData) {
        state.productImgs = passingData
    },

    [REQUEST_READ_REVIEW_TO_SPRING] (state, passingData) {
        state.reviews = passingData
    },
    [REQUEST_REVIEW_IMAGE_TO_SPRING] (state, passingData) {
        state.reviewImgs = passingData
    },
}