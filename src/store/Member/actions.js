import {
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
async requestMemberSignInToSpring({ commit }, payload) {
        const { email, password } = payload
        await axiosInst.post('/member/sign-in', { email, password })
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
    },
}