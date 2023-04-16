<template>
  <v-container>
    <sign-in-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import SignInForm from '@/components/Member/SignInForm.vue';
// redis 이용 로그인 서비스를 위해 쿠키 추가
import Vue from "vue";
import cookies from "vue-cookies";
import { mapActions } from "vuex";

const memberModule = 'memberModule'

Vue.use(cookies);

export default {
  name: "SignInPage",
  components: {
    SignInForm
  },
  methods: {
      ...mapActions(memberModule, [
        'requestMemberSignInToSpring'
      ]),
      onSubmit (payload) {
        const { email, password } = payload
        this.requestMemberSignInToSpring({ email, password })
        this.$router.go(-1)
    }
  },
}
</script>

<style>

</style>