import {
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    USER_TOKEN,
    SIGN_IN_VALUE
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import states from "@/store/Member/MemberStates";

export default {
async requestMemberSignInToSpring({ commit }, payload) {
        const { email, password } = payload
        await axiosInst.post('/member/sign-in', { email, password })
                .then((res) => {
                if (localStorage.getItem("userToken") == null) {
                    alert("로그인 성공!");
                    localStorage.setItem("userToken", res.data.userToken)
                    commit(REQUEST_SIGN_IN_TOKEN_FROM_SPRING, res.data)
                    states.userToken = res.data.userToken
                    states.memberInfoAboutSignIn = res.data
                    console.log("토큰: " + states.userToken)
                    console.log("정보: " + JSON.stringify(states.memberInfoAboutSignIn))
                    if(localStorage.getItem("userToken") != states.userToken) {
                    commit(USER_TOKEN, res.data.userToken)
                    }
                    commit(SIGN_IN_VALUE, true)
                } else {
                    alert("이미 로그인된 상태입니다.");
                } 
                })
    },
}