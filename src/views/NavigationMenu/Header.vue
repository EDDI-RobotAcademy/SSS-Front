<template>
  <nav>
    <v-app-bar class="flex-grow-0" color="white">
      <ul class="menu mt-3">
          <li class="logo">
            <router-link :to="{ name: 'home' }">
              <img src="@/assets/logo/3sss-2.jpg" width="100">
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'IntroductionPage' }">회사 소개</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ProductListPage' }">상품 페이지</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'SideProductListPage' }">사이드 메뉴임</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'QnaBoardListPage' }">FAQ</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'IngredientListPage' }">Self Salad</router-link>
          </li>
        </ul>

      <v-spacer></v-spacer>
      <template v-if="!signInValue">
        <v-btn>
          <router-link :to="{ name: 'SignUp' }">signUp</router-link>
          <v-icon right>mdi-account-plus</v-icon>
        </v-btn>  
        <v-btn>
          <router-link :to="{ name: 'SignIn' }">signIn</router-link>
          <v-icon right>mdi-test-tube</v-icon>
        </v-btn>  
      </template>
      <template v-else>
          <v-btn>
            <router-link :to="{ name: 'MyPageView' }">MYPAGE</router-link>
            <v-icon right>mdi-test-tube</v-icon>
          </v-btn> 
          <v-btn @click="logoutBtn">
            <span>logout</span>
            <v-icon right>mdi-history</v-icon>
          </v-btn>
        </template>

        <!--마이페이지 링크-->
    </v-app-bar>
  </nav>
  
</template>

<script>
import { mapState } from 'vuex';

const memberModule = 'memberModule'

export default {
  name: "Header",
  methods: {
    logoutBtn() {
      this.$store.commit("SIGN_IN_VALUE", false)
      localStorage.removeItem("vuex")
      localStorage.removeItem("userToken")
      alert("로그아웃 되었습니다.")
      this.$router.push({ name: "home" })
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
  ul.menu li{ display: inline;}
  .menu a:hover {
    color: #3d7e27 !important;
  }
  .menu a {
    color: black;
    font-weight: 600;
    margin-right: 80px;
    transition: all 0.3s ease 0s;
  }
a {
    text-decoration: none;
  }
</style>