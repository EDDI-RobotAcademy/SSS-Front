<template>
  <v-container>
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