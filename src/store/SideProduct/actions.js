import {
    REQUEST_SIDEPRODUCT_LIST_TO_SPRING,
    REQUEST_SIDEPRODUCT_TO_SPRING,

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
//등록
async requestCreateSideProductToSpring ({}, payload) {
    try {
        await axiosInst.post('/sideProduct/register', payload)
        alert('상품 등록 성공!')
    } catch {
        alert('문제 발생!')
    }
},

//리스트
async requestSideProductListToSpring ({ commit }) {
    return await axiosInst.get('/sideProduct/list')
        .then((res) => {
            commit(REQUEST_SIDEPRODUCT_LIST_TO_SPRING, res.data)
            console.log("리스트 연결 됨")
    })
},

//읽기
async requestSideProductToSpring ({ commit }, sideProductId) {
    return await axiosInst.get(`/sideProduct/read/${sideProductId}`)
        .then((res) => {
            commit(REQUEST_SIDEPRODUCT_TO_SPRING, res.data)
            console.log("읽기 연결 됨")
        })
},

//삭제
async requestDeleteSideProductToSpring ({}, sideProductId) {
    return await axiosInst.delete(`/sideProduct/${sideProductId}`)
        .then(() => {
            alert("삭제 성공")
        })
        .catch(() => {
            alert("문제 발생!")
        })
},

//수정
async requestSideProductModifyToSpring ({}, payload) {
    const{sideProductId, formData} = payload

    return await axiosInst.put(`/sideProduct/modify/${sideProductId}`,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'}})
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("문제 발생!")
        })
},
}