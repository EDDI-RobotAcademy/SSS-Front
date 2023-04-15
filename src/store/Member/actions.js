import {
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    USER_TOKEN,
    SIGN_IN_VALUE,
    IS_AUTHENTICATED
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'
import states from "@/store/Member/MemberStates";

export default {
async requestMemberSignInToSpring({ commit }, payload) {
        const { email, password } = payload
        await axiosInst.post('/member/sign-in', { email, password })
                .then((res) => {
                if (localStorage.getItem("userToken") == null) {
                    alert("로그인 되었습니다.");
                    commit(IS_AUTHENTICATED, true)
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
                .catch(() => {
                    alert("아이디 또는 비밀번호를 다시 확인해주세요.")
                })
    },
}