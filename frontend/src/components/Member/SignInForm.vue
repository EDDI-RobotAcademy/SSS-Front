<template>
  <!--div 태그 로그인페이지 배경쪽 색상 변경 가능 연하게 넣는것도?-->
  <div class="white" style="font-family: Arial">
    <v-row justify="center">
      <!--로그인쪽 위아래 스크롤될 정도로 길거나 짧게 만들 수 있음-->
      <v-col cols="auto" style="padding-bottom: 100px">
        <router-link to="/">
          <!-- 로고 이미지칸 클릭하면 홈페이지로 가지는데...음..louter-link 때문인듯! 링크걸려있으니 이미지 수정해서 넣으면 끗-->
          <v-img
              :src="require('@/assets/logo/3sss-ko.jpg')" width="300" class="mx-auto mb-6"/>
        </router-link>
              <!--로그인창크기-->
        <v-card width="500">
          <v-card-text class="text-center px-15 py-16">
            <v-form @submit.prevent="onSubmit">
              <!--상단 문구 로그인 지우고 로고로..?통일?-->
              <div class="text-h4 font-weight-black mb-10">로그인</div>
              <!--아이디 입력칸-->
              <div class="d-flex">
                <v-text-field v-model="email" label="이메일" color="teal"
                              :rules="email_rule" clearable prepend-icon="mdi-account-outline"/>
              </div>
              <!--패스워드 입력칸-->
              <div class="d-flex">
                <v-text-field v-model="password" label="비밀번호" type="password" color="teal" 
                              :rules="password_rule" clearable prepend-icon="mdi-lock-outline"/>
              </div>
              
              <div style="padding: 15px;">
              <input type="checkbox" v-model="rememberStatus">이메일 기억하기
              </div>

              <v-btn type="submit" block x-large rounded color="green lighten-1" 
              class="mt-6" :disabled="false">로그인</v-btn>

              <!--회원가입 버튼-->
              <div style="padding: 15px;">
              <v-row>
                <v-col>
                  <router-link to="/member/sign-up">
                    회원가입
                  </router-link>
                </v-col>              
                <!--pw찾기 버튼-->
                <!-- <v-col>
                  <router-link to="패스워드찾기">
                    pw찾기
                  </router-link>
                </v-col> -->
              </v-row>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


  <script>
  
export default {
    name: "SignInForm",
    data () {
        return {
            email: "",
            rememberStatus: false,
            password: "",

            //이메일 형식 룰
            email_rule: [
                v => !!v || '이메일을 입력해주세요.',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(replaceV) || '이메일 형식을 입력하세요.'
                }
                        ],

            //비밀번호 룰
            password_rule: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
                           ],  
        }
    },      
    mounted() {
        const rememberEmail = localStorage.getItem("rememberEmail")
        if (rememberEmail) {
           this.email = rememberEmail
           this.rememberStatus = true
        }
    },
    methods: {
              //버튼 눌렀을때 전송되는 데이터
       onSubmit () {
        const { email, password } = this
           this.$emit("submit", { email, password })
                
          if(this.rememberStatus) {
              localStorage.setItem("rememberEmail", this.email)
          } else {
              localStorage.removeItem("rememberEmail")
          }
       },
    }
}
</script>

<style scoped>

</style>