<template>
  <nav>
    <v-app-bar color="dark" class="flex-grow-0" app dark >
      <v-toolbar-title class="text-uppercase text--darken-4">
        <ul class="menu">
          <li class="logo">
            <v-btn
            >
            logo img
            </v-btn>
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
      <v-btn>
        <span>login</span>
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