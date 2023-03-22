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
            <router-link :to="{ name: 'about' }">회사 소개</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'about' }">상품 페이지</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'JpaQnaBoardListPage' }">FAQ</router-link>
          </li>
        </ul>

      <v-spacer></v-spacer>
      <v-btn onclick="location.href='http://localhost:8080/member/sign-up'">
        <span>signUp</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn onclick="location.href='http://localhost:8080/member/sign-in'">
        <span>signIn</span>
        <v-icon right>mdi-test-tube</v-icon>
      </v-btn>
      <v-btn>
        <span>logout</span>
        <v-icon right>mdi-history</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
  
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  ul.menu li{ display: inline;}
  .menu a:hover {
    color: #3d7e27 !important;
  }
  .menu a {
    text-decoration: none;
    color: black;
    font-weight: 600;
    margin-right: 80px;
    transition: all 0.3s ease 0s;
  }
</style>