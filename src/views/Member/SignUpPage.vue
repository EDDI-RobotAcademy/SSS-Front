<template>
    <v-container>
      <sign-up-form @submit="onSubmit"/>
    </v-container>
  </template>
  
  <script>
  import axiosInst from '@/utility/axiosObject'
  import SignUpForm from "@/components/Member/SignUpForm.vue";

  export default {
    name: "SignUpPage",
    components: {
      SignUpForm
    },
    methods: {
      onSubmit (payload) {
        const { email, password, nickname, authorityName, adminCheck, adminCode } = payload;
  
        axiosInst.post('/member/sign-up', {
          email, password, nickname, authorityName, adminCheck, adminCode
        })
            .then((res) => {
              alert("회원 가입 완료!")
              this.$router.push({ name: 'SignIn', params: { prevRoute: 'SignUp' } });
            })
            .catch((res) => {
              alert(res.response.data.message)
            })
            
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>