<template>
  <v-container>
    <sign-in-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import axios from "axios";
import SignInForm from '@/components/Acount/Member/SignInForm.vue';
// redis 이용 로그인 서비스를 위해 쿠키 추가
import Vue from "vue";
import cookies from "vue-cookies";

Vue.use(cookies);

export default {
  name: "SignInPage",
  components: {
    SignInForm
  },
  data() {
    return {
      isLogin: false,
    }
  },
  mounted() {
    if (this.$store.state.isAuthenticated != false) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
  },
  methods: {
      onSubmit (payload) {
        // if (!this.isLogin) {
        //   const { email, password } = payload;
        //   await axios
        //       .post("http://localhost:7777/member/sign-in", { email, password })
        //       .then((res) => {
        //         if (res.data) {
        //           alert("로그인 성공!");
        //           this.$store.state.isAuthenticated = true;
        //           this.$cookies.set("user", res.data, 3600);  //초단위. 3600초->60분 동안 쿠키 저장
        //           localStorage.setItem("userInfo", JSON.stringify(res.data));
        //           this.isLogin = true;
        //           this.$router.push("/");
        //         } else {
        //           alert("아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.");
        //         }
        //       })
        //       .catch((res) => {
        //         alert(res.response.data.message);
        //       });
        const { email, password } = payload;
        this.request
      }
    }
  
}
</script>

<style>

</style>