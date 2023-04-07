import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
    REQUEST_REPLY_TO_SPRING,

    REQUEST_SIDEPRODUCT_LIST_TO_SPRING,
    REQUEST_SIDEPRODUCT_TO_SPRING,

    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    SIGN_IN_VALUE,
    USER_TOKEN,
    
    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,

    REQUEST_INGREDIENT_LIST_TO_SPRING,
    REQUEST_INGREDIENT_TO_SPRING,
    REQUEST_INGREDIENT_CATEGORY_TO_SPRING,
    REQUEST_INGREDIENT_INFO_TO_SPRING,
    REQUEST_INGREDIENT_AMOUNT_TO_SPRING,

} from './mutation-types'

export default {
    // states로 구성하면 안됨(예약어)
    [REQUEST_BOARD_LIST_TO_SPRING] (state, passingData) {
        state.boards = passingData
    },
    [REQUEST_BOARD_TO_SPRING] (state, passingData) {
        state.board = passingData
    },
    [REQUEST_REPLY_TO_SPRING] (state, passingData) {
        state.reply = passingData
    },

    [REQUEST_SIDEPRODUCT_LIST_TO_SPRING] (state, passingData) {
        state.sideproducts = passingData
    },
    [REQUEST_SIDEPRODUCT_TO_SPRING] (state, passingData) {
        state.sideproduct = passingData
    },
    
    [REQUEST_SIGN_IN_TOKEN_FROM_SPRING] (state, passingData) {
        state.memberInfoAboutSignIn = passingData
    },
    [SIGN_IN_VALUE] (state, passingData) {
        state.signInValue = passingData
    },
    [USER_TOKEN] (state, passingData) {
        state.userToken = passingData
    },

    [REQUEST_PRODUCT_TO_SPRING] (state, passingData) {
        state.product = passingData
    },
    [REQUEST_PRODUCT_LIST_TO_SPRING] (state, passingData) {
        state.products = passingData
    },

    [REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING] (state, passingData) {
        state.productImgs = passingData
    },

    [REQUEST_INGREDIENT_LIST_TO_SPRING] (state, passingData) {
        state.ingredients = passingData
    },
    [REQUEST_INGREDIENT_TO_SPRING] (state, passingData) {
        state.ingredient = passingData
    },
    [REQUEST_INGREDIENT_CATEGORY_TO_SPRING] (state, passingData) {
        state.ingredients = passingData
    },
    [REQUEST_INGREDIENT_INFO_TO_SPRING] (state, passingData) {
        state.ingredientInfo = passingData
    },
    [REQUEST_INGREDIENT_AMOUNT_TO_SPRING] (state, passingData) {
        state.ingredientAmount = passingData
    },

    

}