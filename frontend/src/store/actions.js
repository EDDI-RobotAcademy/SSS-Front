import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,

    // REQUEST_REPLY_TO_SPRING,

    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,

    REQUEST_SIDEPRODUCT_LIST_TO_SPRING,
    REQUEST_SIDEPRODUCT_TO_SPRING,

    REQUEST_PRODUCT_LIST_TO_SPRING,

    REQUEST_INGREDIENT_LIST_TO_SPRING,
    REQUEST_INGREDIENT_CATEGORY_TO_SPRING,
    REQUEST_INGREDIENT_INFO_TO_SPRING,
    REQUEST_INGREDIENT_AMOUNT_TO_SPRING,


} from './mutation-types'

import axios from 'axios'
import states from "@/store/states";
import store from "@/store/index";

export default {
    requestCreateBoardToSpring ({}, payload) {
        const { title, content, writer } = payload
        return axios.post('http://localhost:7777/board/register',
            { title, content, writer })
            .then((res) => {
                alert('게시물 등록 성공: ' + JSON.stringify(res.data))
                return res
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestCreateReplyToSpring ({}, payload) {
        const replyContent = payload
        return axios.post('http://localhost:7777/reply/register', replyContent)

            .then((res) => {
                alert('댓글 등록 성공: ' + JSON.stringify(res.data))
                return res
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestBoardListToSpring ({ commit }) {
        return axios.get('http://localhost:7777/board/list')
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestBoardToSpring ({ commit }, boardId) {
        return axios.get(`http://localhost:7777/board/${boardId}`)
            .then((res) => {
                commit(REQUEST_BOARD_TO_SPRING, res.data)
            })
    },
    requestDeleteBoardToSpring ({}, boardId) {
        return axios.delete(`http://localhost:7777/board/${boardId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestBoardModifyToSpring ({}, payload) {
        const { title, content, boardId, writer } = payload

        return axios.put(`http://localhost:7777/board/${boardId}`,
            { title, content, writer })
            .then(() => {
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestMemberSignInToSpring({ commit }, payload) {
        const { email, password } = payload
            axios
              .post("http://localhost:7777/member/sign-in", { email, password })
              .then((res) => {
                if (localStorage.getItem("userToken") == null) {
                  alert("로그인 성공!");
                  commit(REQUEST_SIGN_IN_TOKEN_FROM_SPRING, res.data)
                  states.userToken = res.data.userToken

                  if(localStorage.getItem("userToken") != states.userToken) {
                    store.commit("USER_TOKEN", res.data.userToken)
                  }
                  store.commit("SIGN_IN_VALUE", true)
                } else {
                  alert("이미 로그인된 상태입니다.");
                }
              })
            //   .catch(() => {
            //     alert("아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.");
            //   });
    },

    requestProductToSpring ({ commit }, productId) {
        return axios.get(`http://localhost:7777/products/${productId}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_TO_SPRING, res.data)
            })
    },
    requestProductListToSpring({ commit }) {
        return axios.get('http://localhost:7777/products/list')
        .then((res) => {
            commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
        })
    },
    requestCreateProductToSpring ({}, payload) {
        for (let key of payload.keys()) {
            console.log(key, ":", payload.get(key))
        }
        try {
          axios.post('http://localhost:7777/products/register', payload)
                alert('상품 등록 성공!')
            } catch {
                alert('문제 발생!')
            }    
    },
    requestProductImageToSpring ({ commit }, productId) {
        return axios.get(`http://localhost:7777/products/imageList/${productId}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING, res.data)
            })
    },

//등록
    requestCreateSideProductToSpring ({}, payload){
        return axios.post('http://localhost:7777/sideproduct/register',
        payload )
        .then((res) => {
            alert('게시물 등록 성공')
            return res
        })
        .catch(() => {
            alert('문제 발생!')
        })
    },
//리스트
    requestSideProductListToSpring({commit}){
        return axios.get('http://localhost:7777/sideproduct/list')
        .then((res) => {
            console.log(res.data)
            commit(REQUEST_SIDEPRODUCT_LIST_TO_SPRING, res.data)
        })
},
//읽기
    requestSideProductToSpring({commit},productId){
        return axios.get(`http://localhost:7777/sideproduct/read/${productId}`)
        .then((res) => {
            commit(REQUEST_SIDEPRODUCT_TO_SPRING,res.data)
        })
    },
//삭제
requestDeleteSideProductToSpring({}, productId) {
    return axios.delete(`http://localhost:7777/sideproduct/${productId}`)
        .then(() => {
            alert("삭제 성공")
        })
        .catch(() => {
            alert("아 뭔가 문제 발생..")
        })
},
//수정

requestSideProductModifyToSpring({}, payload){
    const {productId, title, content, price} = payload
    return axios.put(`http://localhost:7777/sideproduct/modify/${productId}`,
    { title, content, price})
    .then(() => {
        alert("수정 성공")
    })
    .catch(() => {
        alert("아 뭔가 문제 발생..")
    })
},
    requestSideProductModifyToSpring({}, payload){
        const {productId, title, content, price} = payload
        return axios.put(`http://localhost:7777/sideproduct/modify/${productId}`,
        { title, content, price})
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("아 뭔가 문제 발생..")
        })
    },

    requestProductListToSpring({ commit }) {
        return axios.get('http://localhost:7777/products/list')
        .then((res) => {
            commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
        })
    },
    requestCreateProductToSpring ({}, payload) {
        return axios.post('http://localhost:7777/products/register', payload)
            .then(() => {
                alert('상품 등록 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },


    requestIngredientListToSpring ({ commit }) {
        return axios.get('http://localhost:7777/selfsalad/list')
            .then((res) => {
                commit(REQUEST_INGREDIENT_LIST_TO_SPRING, res.data)
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },
    requestCreateIngredientToSpring ({}, payload) {
        return axios.post('http://localhost:7777/selfsalad/register',payload )
            .then(() => {
                alert('재료 등록 성공')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },

    // 댓글 리스트 등록 //requestQuestionCommentRegisterToSpring REQUEST_REPLY_REGISTER_TO_SPRING
    // eslint-disable-next-line no-empty-pattern
    requestReplyRegisterToSpring ({ }, payload) {
        console.log('requestReplyRegisterToSpring()')
        const { replyContent } = payload
        console.log("댓글 등록" )
        return axios.post('http://localhost:7777/reply/register',
            { replyContent : replyContent })
            .then(() => {
                alert('댓글 등록을 완료하였습니다.')
            })
    },
    // 댓글 삭제
    // eslint-disable-next-line no-empty-pattern
    requestDeleteQuestionCommentToSpring({}, questionCommentNo) {
        console.log('requestDeleteQuestionToSpring()')

        return axios.delete(`http://localhost:7777/ztz/boards/question/comment/${questionCommentNo}`)
            .then(() => {
                alert('삭제 완료했습니다!')
            })
    },
    requestIngredientCategoryToSpring ({ commit }, categoryName) {
        return axios.get(`http://localhost:7777/selfsalad/list/${categoryName}`)
            .then((res) => {
                commit(REQUEST_INGREDIENT_CATEGORY_TO_SPRING, res.data)
            })
    },
    requestIngredientInfoToSpring({commit}, id){
        const ingredientId = id
        return axios.get(`http://localhost:7777/selfsalad/read/info/${ingredientId}`)
        .then((res) => {
            commit(REQUEST_INGREDIENT_INFO_TO_SPRING,res.data)
        })
    },
    requestIngredientInfoModifyToSpring({}, payload){
        const { ingredientId, formData } = payload
        return axios.put(`http://localhost:7777/selfsalad/modify/info/${ingredientId}`, formData)
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("수정 실패")
        })
    },
    requestIngredientAmountToSpring({commit}, id){
        const ingredientId = id
        return axios.get(`http://localhost:7777/selfsalad/read/amount/${ingredientId}`)
        .then((res) => {
            commit(REQUEST_INGREDIENT_AMOUNT_TO_SPRING,res.data)
        })
    },
    requestIngredientAmountModifyToSpring({}, payload){
        const { ingredientId, amountType, max, min, unit, price, calorie } = payload
        return axios.put(`http://localhost:7777/selfsalad/modify/amount/${ingredientId}`,
        { amountType, max, min, unit, price, calorie })
        .then(() => {
            alert("수정 성공")
        })
        .catch(() => {
            alert("수정 실패")
        })
    },
}