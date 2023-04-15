import {
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    USER_TOKEN,
    SIGN_IN_VALUE,
    IS_AUTHENTICATED
    MEMBER_INFO_MODIFY
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
                    commit(IS_AUTHENTICATED, true)
                    localStorage.setItem("userToken", res.data.userToken)

                    
                    const userId = res.data.userId;
                    localStorage.setItem("userId", userId);
                    console.log('userId:', userId);


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
    async reqUpdateMemberInfoFromSpring({ commit }, payload) {
      console.log(payload);
        const userId = parseInt(localStorage.getItem("userId"), 10);

        console.log('userId:', userId);
          
        axiosInst.put(`/member/member-profile/${userId}`, payload)
            .then((res) => {
              // 성공적으로 회원 정보를 수정했을 경우
              console.log(res.data);           
              alert('회원 정보가 성공적으로 수정되었습니다.');
              commit(MEMBER_INFO_MODIFY, payload);
            })
            .catch((err) => {
              if (!payload.addresses) {
                console.error('11111Address object is undefined.');
                alert('.어드레스객체안갓대');
                return;
              }
              // 회원 정보 수정에 실패했을 경우
              console.error('Address object is undefined.');
              console.log(err.response.data.message);
              alert('수정실패ㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐ');
            });
            
        },
  };
