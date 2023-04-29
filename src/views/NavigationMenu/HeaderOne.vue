<template>
  <nav>
    <v-app-bar color="white">
      <div style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 15px;">
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/logo/long_sss.jpg" width="220">
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="menu">
      <template v-if="!signInValue">
        <button style="margin-right: 15px;">
          <router-link :to="{ name: 'SignIn' }">Login</router-link>
        </button>  
        <button>
          <router-link :to="{ name: 'SignUp' }">Join</router-link>
        </button>  
      </template>
      <template v-else>
        <button style="margin-right: 15px;">
          <router-link :to="{ name: 'MyInfoAccountPage' }">Mypage</router-link>
          </button> 
          <button @click="logoutBtn" style="font-weight: 600">
            <span>logout</span>
          </button>
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
.menu a {
  color: black;
  font-weight: 600;
}
a {
  text-decoration: none;
}

</style>