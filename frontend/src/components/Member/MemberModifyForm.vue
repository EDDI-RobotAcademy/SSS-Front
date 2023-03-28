<template>
    <div class="grey lighten-5" style="font-family: Arial">
      <v-row justify="center">
        <v-col cols="auto" style="padding-bottom: 90px">
          <router-link to="/">
            <v-img
                :src="require('@/assets/logo/3sss-ko.jpg')" width="300" class="mx-auto mb-6"/>
          </router-link>
          <v-card width="460">
            <v-card-text class="text-center px-12 py-16">
              <v-form @submit.prevent="onSubmit" ref="form">
                <div class="text-h4 font-weight-black mb-10">회원정보 변경</div>
  
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
  
                <div class="d-flex">
                  <v-text-field 
                  v-model="phoneNumber" 
                  label="전화번호 입력" 
                  type="phoneNumber" 
                  maxlength="11" 
                  placeholder="-를 제외하고 입력해주세요."
                  oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');" :disabled="false" required/>
                </div>
                

                <div class="d-flex">
                  <v-text-field v-model="address" label="주소입력" type="text" :disabled="false" required/>
                </div>





                <v-btn type="submit" block x-large rounded
                       class="mt-6" color="purple lighten-1" 
                       :disabled="(emailPass && nicknamePass) == false">
                  변경하기
                </v-btn>
  
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
<script>
export default {
  data () {
      return {
        nickname: "",
        password: "",
        password_confirm: "",
        phoneNumber: "",
        address: "",
        nicknameBoxClick: false,
        nicknamePass: false,
        
        nickname_rule: [
          v => !!v || '닉네임을 입력해주세요.',
          v => !(v && v.length >= 15) || '닉네임은 15자 이상 입력할 수 없습니다.',
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

        phoneNumber_rule: [
          
        ],


      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const { password, nickname, phoneNumber, address } = this
          this.$emit("submit", { password, nickname, phoneNumber, address })
        } else {
          alert('올바른 정보를 입력하세요!')
        }
      },
  }
}

</script>

<style>

</style>