import {
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    SIGN_IN_VALUE,
    USER_TOKEN,
    IS_AUTHENTICATED
} from './mutation-types'

export default {
    [REQUEST_SIGN_IN_TOKEN_FROM_SPRING] (state, passingData) {
        state.memberInfoAboutSignIn = passingData
    },
    [SIGN_IN_VALUE] (state, passingData) {
        state.signInValue = passingData
    },
    [USER_TOKEN] (state, passingData) {
        state.userToken = passingData
    },
    [IS_AUTHENTICATED] (state, passingData) {
        state.isAuthenticated = passingData
    }
}