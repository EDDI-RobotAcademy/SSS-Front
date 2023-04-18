import {
    REQUEST_SIGN_IN_TOKEN_FROM_SPRING,
    USER_TOKEN,
    SIGN_IN_VALUE,
    IS_AUTHENTICATED,
    MEMBER_INFO_MODIFY,
    LOG_OUT,
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
                .catch(() => {
                    alert("아이디 또는 비밀번호를 다시 확인해주세요.")
                })
    },
    
    
async requestUpdateMemberInfoFromSpring({ commit }, payload) {
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


async requestCheckPasswordToSpring({}, payload) {
          const {memberId, password} = payload
          console.log(payload);
          return await axiosInst.post(`/member/check-password`, {memberId, password} )
              .then((res) => {
                  if(res.data == false) {
                      alert("비밀번호가 틀림");
                  }
                  return res.data;
              })
              .catch((res) => {
                  alert("문제 발생!");
                  return res.data;
              })
      },
async requestDeleteMember({ commit }) {
        try {
        const memberId = parseInt(localStorage.getItem("userId"), 10);
        await axiosInst.delete(`/member/delete-member/${memberId}`);
        alert('회원 탈퇴가 완료되었습니다.');
        commit(LOG_OUT);
        localStorage.removeItem("vuex")
        localStorage.removeItem("userToken")
        alert('회원 탈퇴로 인해 자동 로그아웃 되었습니다.');
        } catch (error) {
          if (error.response) {
            console.error(error.response.data);
            alert('회원 탈퇴에 실패하였습니다.');
          } else if (error.request) {
            console.error(error.request);
            alert('서버로부터 응답이 없습니다.');
          }
        }
      },


  };
