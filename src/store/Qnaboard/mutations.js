import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
    REQUEST_REPLY_LIST_FROM_SPRING

} from './mutation-types'

export default {
    [REQUEST_BOARD_LIST_TO_SPRING] (state, passingData) {
        state.boards = passingData
    },
    [REQUEST_BOARD_TO_SPRING] (state, passingData) {
        state.board = passingData
    },
    [REQUEST_REPLY_LIST_FROM_SPRING] (state, passingData) {
        state.replys = passingData
    }
}