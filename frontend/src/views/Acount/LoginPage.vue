<template>
  <v-container>
    <h2>로그인 페이지</h2>
    <login-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import LoginForm from '@/components/Acount/LoginForm.vue'

export default {
  name: "SignInView",
  components: {
    LoginForm
  },
  data () {
    return {
      isLogin: false,
    }
  }
  
}
</script>

<style>

</style>