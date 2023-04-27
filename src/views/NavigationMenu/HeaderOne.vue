<template>
  <nav>
    <v-app-bar color="white" style="height: 170px; margin-top:-20px">
      <div style="display:flex; flex-direction:column; align-items:center;">
      <div style="position: absolute; left: 50%; transform: translateX(-50%);">
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/logo/long_sss.jpg" height="auto" width="500px">
        </router-link>
      </div>
      </div>
      <v-spacer></v-spacer>
      <div class="menu" style="margin-top: 20px;">
      <template v-if="!signInValue">
        <button style="margin-right: 15px;">
          <router-link :to="{ name: 'SignIn' }" style="font-size: 25px;">Login</router-link>
        </button>  
        <button>
          <router-link :to="{ name: 'SignUp' }" style="font-size: 25px;">Join</router-link>
        </button>  
      </template>
      <template v-else>
          <button style="margin-right: 15px; font-size: 25px;">
            <router-link :to="{ name: 'MyPage' }">Mypage</router-link>
          </button> 
          <button @click="logoutBtn" style="font-weight: 600; font-size: 25px;">
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
  font-weight: 600;
}
a {
  text-decoration: none;
}

*{
    color: #40513B;
  }

</style>