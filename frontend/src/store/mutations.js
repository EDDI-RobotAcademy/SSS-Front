import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,

    REQUEST_SIDEPRODUCT_LIST_TO_SPRING,
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    SIGN_IN_VALUE,
    USER_TOKEN
} from './mutation-types'

export default {
    // states로 구성하면 안됨(예약어)
    [REQUEST_BOARD_LIST_TO_SPRING] (state, passingData) {
        state.boards = passingData
    },
    [REQUEST_BOARD_TO_SPRING] (state, passingData) {
        state.board = passingData
    },

    
    [REQUEST_SIDEPRODUCT_LIST_TO_SPRING] (state, passingData) {
        state.sideproducts = passingData
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

}