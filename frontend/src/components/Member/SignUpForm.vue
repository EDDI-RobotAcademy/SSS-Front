<template>
    <div class="grey lighten-5" style="font-family: Arial">
      <v-row justify="center">
        <v-col cols="auto" style="padding-bottom: 90px">
          <router-link to="/">
            <v-img
                :src="require('@/assets/3sss-kr.png')" width="300" class="mx-auto mb-6"/>
          </router-link>
          <v-card width="460">
            <v-card-text class="text-center px-12 py-16">
              <v-form @submit.prevent="onSubmit" ref="form">
                <div class="text-h4 font-weight-black mb-10">회원 가입</div>
  
                <div class="d-flex">
                  <v-text-field v-model="email" label="이메일" @change="emailValidation"
                                :rules="email_rule" :disabled="false" required/>
                  <v-btn text large outlined style="font-size: 13px"
                         class="mt-3 ml-5" color="teal lighten-1"
                         @click="checkDuplicateEmail">
                    이메일 <br/>중복 확인
                  </v-btn>
                </div>

                <div class="d-flex">
                  <v-text-field v-model="nickname" label="닉네임" @change="nicknameValidation"
                                :rules="nickname_rule" :disabled="false" required/>
                  <v-btn text large outlined style="font-size: 13px"
                         class="mt-3 ml-5" color="teal lighten-1"
                         @click="checkDuplicateNickName">
                    닉네임 <br/>중복 확인
                  </v-btn>
                </div>
  
                <div class="d-flex">
                  <v-text-field v-model="password" label="비밀번호" type="password"
                                :rules="password_rule" :disabled="false" required/>
                </div>
  
                <div class="d-flex">
                  <v-text-field v-model="password_confirm" label="비밀번호 확인" type="password"
                                :rules="password_confirm_rule" :disabled="false" required/>
                </div>
  
                <v-btn type="submit" block x-large rounded
                       class="mt-6" color="purple lighten-1" 
                       :disabled="(emailPass && nicknamePass) == false">
                  가입하기
                </v-btn>
  
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "SignUpForm",
    data () {
      return {
        email: "",
        nickname: "",
        password: "",
        password_confirm: "",
        emailBoxClick: false,
        nicknameBoxClick: false,
        emailPass: false,
        nicknamePass: false,
  
        email_rule: [
          v => !!v || '이메일을 입력해주세요.',
          v => {
            const replaceV = v.replace(/(\s*)/g, '')
            const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
            return pattern.test(replaceV) || '이메일 형식을 입력하세요.'
          }
        ],
        nickname_rule: [
          v => !!v || '닉네임을 입력해주세요.',
          v => !(v && v.length >= 15) || '패스워드는 10자 이상 입력할 수 없습니다.',
        ],
        password_rule: [
          v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
          v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
        ],
        password_confirm_rule: [
          v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
          v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
          v => v === this.password || '패스워드가 일치하지 않습니다.'
        ],
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
      //  if (this.emailPass && this.nicknamePass) {
          const { email, password, nickname } = this
          this.$emit("submit", { email, password, nickname })
        } else {
          alert('올바른 정보를 입력하세요!')
        }
      },
      emailValidation () {
        const emailValid = this.email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if(emailValid) {
            this.emailBoxClick = true;
        }
      },
      nicknameValidation () {
        this.nicknameBoxClick = true;
      },
      checkDuplicateEmail () {
        const emailValid = this.email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (emailValid) {
          const {email} = this
          axios.post(`http://localhost:7777/member/check-email/${email}`)
              .then((res) => {
                if (res.data) {
                  alert("사용 가능한 이메일입니다!")
                  this.emailPass = true
                } else {
                  alert("중복된 이메일입니다!")
                  this.emailPass = false
                }
              })
        }
      },
      checkDuplicateNickName () {
        const {nickname} = this
        axios.post(`http://localhost:7777/member/check-nickname/${nickname}`)
            .then((res) => {
                if(res.data) {
                    alert("사용 가능한 닉네임입니다!")
                    this.nicknamePass = true
                } else {
                    alert("중복된 닉네임입니다!")
                    this.nicknamePass = false
                }
            })
      },
    }
  }
  </script>
  
  <style scoped>
  
  </style>