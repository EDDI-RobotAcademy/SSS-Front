import {
    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
    REQUEST_READ_REVIEW_TO_SPRING,
    REQUEST_REVIEW_IMAGE_TO_SPRING

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
//등록
async requestCreateProductToSpring ({}, payload) {
    try {
        await axiosInst.post('/products/register', payload)
        alert('상품 등록 성공!')
    } catch {
        alert('문제 발생!')
    }
},

//리스트
async requestProductListToSpring ({ commit }) {
    return await axiosInst.get('/products/list')
        .then((res) => {
            commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
    })
},

//읽기
async requestProductToSpring ({ commit }, productId) {
    return await axiosInst.get(`/products/${productId}`)
        .then((res) => {
            commit(REQUEST_PRODUCT_TO_SPRING, res.data)
    })
},

//이미지 읽기
async requestProductImageToSpring ({ commit }, productId) {
    return await axiosInst.get(`/products/imageList/${productId}`)
        .then((res) => {
            commit(REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING, res.data)
    })
},

//삭제
async requestDeleteProductToSpring ({}, productId) {
    return await axiosInst.delete(`/products/delete/${productId}`)
        .then(() => {
            alert("삭제 성공")
        })
        .catch(() => {
            alert("문제 발생!")
    })
},

//수정
async requestProductModifyToSpring ({}, payload) {
    const {productId, formData} = payload
    return await axiosInst.put(`/products/modify/${productId}`,
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

    // requestRegisterReviewToSpring(_, payload) {
    //     return axiosInst.post('/review/register', payload)
    //         .then(() => {
    //         })
    // },
    // requestRegisterReviewWithImgToSpring(_, payload) {
    //     return axiosInst.post('/review/registerWithImg', payload)
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .catch((res) => {
    //             console.log(res.message)
    //         })
    // },
async requestReadReviewToSpring({commit}, productId) {
    return await axiosInst.get(`/review/list/${productId}`)
            .then((res) => {
                commit(REQUEST_READ_REVIEW_TO_SPRING, res.data)
            })
    },
async requestReviewImageToSpring({commit}, reviewId) {
    return await axiosInst.get(`/review/image/${reviewId}`)
            .then((res) => {
                commit(REQUEST_REVIEW_IMAGE_TO_SPRING, res.data)
            })
    },    
}