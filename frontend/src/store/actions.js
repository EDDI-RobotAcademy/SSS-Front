import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
<<<<<<< HEAD
    REQUEST_PRODUCT_LIST_TO_SPRING
=======
    REQUEST_SIDEPRODUCT_LIST_TO_SPRING,
    REQUEST_SIDEPRODUCT_TO_SPRING
>>>>>>> main
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
<<<<<<< HEAD
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
=======
//등록
    requestCreateSideProductToSpring ({}, payload){
        const { title, content, price } = payload
        return axios.post('http://localhost:7777/sideproduct/register', 
        { title, content, price })
        .then((res) => {
            alert('게시물 등록 성공: ' + JSON.stringify(res.data))
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
    }
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
}

>>>>>>> main
}