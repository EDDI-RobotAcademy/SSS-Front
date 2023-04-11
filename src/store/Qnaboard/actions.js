import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,

    REQUEST_REPLY_LIST_FROM_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
//등록
async requestCreateBoardToSpring ({}, payload) {
    try {
        await axiosInst.post('/board/register', payload)
        alert('등록 성공!')
    } catch {
        alert('문제 발생!')
    }
},
//리스트
async requestBoardListToSpring ({ commit }) {
    return await axiosInst.get('/board/list')
        .then((res) => {
            commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
    })
},
//읽기
async requestBoardToSpring ({ commit }, boardId) {
    return await axiosInst.get(`/board/${boardId}`)
        .then((res) => {
            commit(REQUEST_BOARD_TO_SPRING, res.data)
    })
},
//삭제
async requestDeleteBoardToSpring ({}, boardId) {
    return await axiosInst.delete(`/board/${boardId}`)
        .then(() => {
            alert("삭제 성공")
        })
        .catch(() => {
            alert("문제 발생!")
    })
},
//수정
async requestBoardModifyToSpring ({}, payload) {
    const { title, content, boardId, writer } = payload
    return await axiosInst.put(`/board/${boardId}`,
    { title, content, writer })
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("문제 발생!")
        })
    },

//댓글
//등록
async requestCreateReplyToSpring ({}, payload) {
    const { replyWriter, replyContent, boardId, replyId } = payload
    try {
        await axiosInst.post('/reply/register', 
        { replyWriter, replyContent, boardId, replyId })
        alert('댓글 등록 성공!')
    } catch {
        alert('문제 발생!')
    }
},
// 리스트
async requestReplyListFromSpring ({ commit }, boardId) {
    return await axiosInst.get(`/reply/${boardId}`)
        .then((res) => {
            commit(REQUEST_REPLY_LIST_FROM_SPRING, res.data)
            console.log("1")
        })
    },
    // //수정
    // async requestBoardModifyToSpring ({}, payload) {
    //     const { title, content, boardId, writer } = payload
    //     return await axiosInst.put(`/board/${boardId}`,
    //     { title, content, writer })
    //         .then(() => {
    //             alert("수정 성공")
    //         })
    //         .catch(() => {
    //             alert("문제 발생!")
    //         })
    //     },    
//삭제
async requestReplyDeleteToSpring ({}, payload) {
    const replyId = payload
    return await axiosInst.delete(`/reply/${replyId}`)
        .then(() => {
            alert("삭제 성공")
        })
        .catch(() => {
            alert("문제 발생!")
    })
},
}