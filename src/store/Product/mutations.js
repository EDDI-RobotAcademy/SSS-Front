import {
    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
    REQUEST_READ_REVIEW_TO_SPRING,
    REQUEST_REVIEW_IMAGE_TO_SPRING,
    REQUEST_FAVORITE_LIST_TO_SPRING,
    REQUEST_FAVORITE_INFO_TO_SPRING,
    SET_FAVORITE_INFO,
    INCREMENT_VIEW_CNT,
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

    [REQUEST_FAVORITE_LIST_TO_SPRING] (state, passingData) {
        state.favoriteList = passingData
    },
    [REQUEST_FAVORITE_INFO_TO_SPRING] (state, passingData) {
        state.favoriteInfo = passingData
    },
    [SET_FAVORITE_INFO] (state, payload) {
        state.favoriteInfo.isLike = payload;
    },

    [INCREMENT_VIEW_CNT] (state, passingData) {
        const product = state.product
        if(product.productId === passingData) {
            product.viewCnt++
        }
    }
}