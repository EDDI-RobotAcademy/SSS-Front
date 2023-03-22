<template>
  <v-container>
    <sign-in-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import axios from "axios";
import SignInForm from '@/components/Acount/Member/SignInForm.vue';

export default {
  name: "SignInPage",
  components: {
    SignInForm
  },
  methods: {
      onSubmit (payload) {
        const { email, password, nickname } = payload;
  
        axios.post("http://localhost:7777/member/sign-in", {
          email, password, nickname
        })
            .then((res) => {
              alert("로그인 완료!")
              this.$router.push("/")
            })
            .catch((res) => {
              alert(res.response.data.message)
            })
            
      }
    }
  
}
</script>

<style>

</style>