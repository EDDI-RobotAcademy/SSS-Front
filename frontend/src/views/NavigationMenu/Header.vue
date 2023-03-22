<template>
  <nav>
    <v-app-bar class="flex-grow-0" >
      <v-toolbar-title class="text-uppercase text--darken-4">
        <ul class="menu">
          <li class="logo">
            <router-link :to="{ name: 'home' }">
              <img src="@/assets/logo/3sss-2.jpg" width="100" class="mt-3">
            </router-link>
          </li>
          <li>
            <v-btn
            >
            HOME
            </v-btn>
          </li>
          <li>
            <v-btn>
            회사소개
            </v-btn>
          </li>
          <li>
            <v-btn>
            상품페이지
            </v-btn>
          </li>
          <li>
            <v-btn>
            FAQ
            </v-btn>
          </li>
        </ul>

      </v-toolbar-title>
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
</style>