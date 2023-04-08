import {
    REQUEST_INGREDIENT_LIST_TO_SPRING,
    REQUEST_INGREDIENT_TO_SPRING,
    REQUEST_INGREDIENT_CATEGORY_TO_SPRING,
    REQUEST_INGREDIENT_INFO_TO_SPRING,
    REQUEST_INGREDIENT_AMOUNT_TO_SPRING

} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {

//등록
async requestCreateIngredientToSpring ({}, payload) {
    try {
        await axiosInst.post('/selfsalad/register', payload)
        alert('재료 등록 성공!')
    } catch {
        alert('문제 발생!')
    }
},

//재료 리스트
async requestIngredientListToSpring ({ commit }) {
    return await axiosInst.get('/selfsalad/list')
        .then((res) => {
            commit(REQUEST_INGREDIENT_LIST_TO_SPRING, res.data)
    })
},

//카테고리 리스트
async requestIngredientCategoryToSpring ({ commit }, categoryName) {
    return await axiosInst.get(`/selfsalad/list/${categoryName}`)
        .then((res) => {
            commit(REQUEST_INGREDIENT_CATEGORY_TO_SPRING, res.data)
    })
},

//재료 정보 수정 읽기
async requestIngredientInfoToSpring ({ commit }, id) {
    const ingredientId = id
    return await axiosInst.get(`/selfsalad/read/info/${ingredientId}`)
        .then((res) => {
            commit(REQUEST_INGREDIENT_INFO_TO_SPRING, res.data)
        })
},

//수량_가격 정보 수정 읽기
async requestIngredientAmountToSpring ({ commit }, id) {
    const ingredientId = id
    return await axiosInst.get(`/selfsalad/read/amount/${ingredientId}`)
        .then((res) => {
            commit(REQUEST_INGREDIENT_AMOUNT_TO_SPRING, res.data)
        })
},

//재료 수정 완
async requestIngredientInfoModifyToSpring ({}, payload) {
    const { ingredientId, formData } = payload

    return await axiosInst.put(`/selfsalad/modify/info/${ingredientId}`,formData)
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("수정 실패")
        })
},

//수량_가격 수정 완
async requestIngredientAmountModifyToSpring ({}, payload) {
    const { ingredientId, amountType, max, min, unit, price, calorie } = payload

    return await axiosInst.put(`/selfsalad/modify/amount/${ingredientId}`,
    { amountType, max, min, unit, price, calorie })
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("수정 실패")
        })
},

//삭제
async requestDeleteIngredientToSpring ({}, ingredientId) {
    return await axiosInst.delete(`/selfsalad/delete/${ingredientId}`)
        .then(() => {
            alert("삭제 성공")
        })
        .catch(() => {
            alert("문제 발생!")
        })
    }
}