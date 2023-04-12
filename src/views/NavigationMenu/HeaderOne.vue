<template>
  <nav>
    <v-app-bar color="white">
      <div style="position: absolute; left: 50%; transform: translateX(-50%);">
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/logo/3sss-ko.jpg" width="200">
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div>
      <template v-if="!signInValue">
        <v-btn>
          <router-link :to="{ name: 'SignUp' }">signUp</router-link>
        </v-btn>  
        <v-btn>
          <router-link :to="{ name: 'SignIn' }">signIn</router-link>
        </v-btn>  
      </template>
      <template v-else>
          <v-btn>
            <router-link :to="{ name: 'MyPageView' }">MYPAGE</router-link>
          </v-btn> 
          <v-btn @click="logoutBtn">
            <span>logout</span>
          </v-btn>
        </template>
      </div>
    </v-app-bar>
  </nav>
  
  
</template>

<script>
import { mapState } from 'vuex';
import { SIGN_IN_VALUE } from '@/store/Member/mutation-types';
const memberModule = 'memberModule'

export default {
  name: "HeaderOne",
  methods: {
    logoutBtn() {
      this.$store.commit(`memberModule/${SIGN_IN_VALUE}`, false)
      localStorage.removeItem("vuex")
      localStorage.removeItem("userToken")
      alert("로그아웃 되었습니다.")
      this.$router.push({ name: "home" })
        .catch(err => {  // 같은 경로로 다시 보내질 때 발생하는 에러 처리
          if(err.name !== 'NavigationDuplicated') {
            throw err
          }
        })
      // 현재 경로에서 새로고침 시 필요
      history.go(0)
    }
  },
  computed: {
    ...mapState(memberModule, [
      'signInValue'
    ]),
  }
}
</script>

<style scoped>
  

</style>