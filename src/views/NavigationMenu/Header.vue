<template>
  <nav>
    <v-app-bar class="flex-grow-0" app color="white">
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
          <v-btn large elevation="0" text @click="goCartPage">
            <v-icon> mdi-cart-outline</v-icon>
          </v-btn>
        <template v-if="!this.$store.state.signInValue">
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
            <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer"/>
    </v-app-bar>
    <!-- 컴포넌트 보내기 전 연습 해보던거 -->
    <!-- <v-navigation-drawer app v-model="navigation_drawer" right>
      <v-list-item >
        <v-list-item-content>
          <div class="div">
        </div>
        </v-list-item-content>
      </v-list-item>
      <v-list nav dense>
        <v-list-item v-for="link in links" :key="link.name" router :to="link.route">
          <v-list-item-action>
            <v-icon left>
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <side-nav/>
  </nav>
  
</template>

<script>
import { mapState } from 'vuex';
import SideNav from '@/views/NavigationMenu/SideNav.vue'

export default {
  name: "Header",
  components: { SideNav },
  data() {
    return {
      navigation_drawer: true
    }
  },
  methods: {
    ...mapState([
      'signInValue'
    ]),
    logoutBtn() {
      this.$store.commit("SIGN_IN_VALUE", false)
      localStorage.removeItem("vuex")
      localStorage.removeItem("userToken")
      alert("로그아웃 되었습니다.")
      this.$router.push({ name: "home" })
      // 현재 경로에서 새로고침 시 필요
      history.go(0)
    },
    goCartPage() {
      this.$router.push({name: "ShoppingCartPage"});
    },
    }
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