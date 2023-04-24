<template>
    <div style="font-family: Arial">
      <v-row justify="center">
        <v-col cols="auto" style="padding-bottom: 90px">
          <router-link to="/">
            <v-img
                :src="require('@/assets/logo/3sss-ko.jpg')" width="300" class="mx-auto mb-6"/>
          </router-link>
          <v-card width="460" style="margin-top: 40px;">
            <v-tabs v-model="tab">
                <!-- <v-tab v-for="item in items" :key="item.tab" class="half-width">
                  {{ item.tab }}
                </v-tab> -->
              <v-tab class="half-width">일반회원용</v-tab>
              <v-tab @click="choiceAdmin" class="half-width">관리자용</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-form @submit.prevent="onSubmit" ref="form">   
                <v-tab-item>                    
                  <v-card-text class="text-center px-12 py-16">
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
                      class="mt-6" color="green lighten-1" 
                      :disabled="(emailPass && nicknamePass) == false">
                      가입하기
                    </v-btn>                                     
                  </v-card-text>
                </v-tab-item>

                <v-tab-item>
                  <v-card-text class="text-center px-12 py-16">
                    <div class="text-h4 font-weight-black mb-10">회원 가입</div>
                    <div class="d-flex">
                      <v-text-field v-model="adminCode" label="관리자 코드를 입력해주세요" required :disabled="false"/>
                        <v-btn text large outlined style="font-size: 13px"
                            class="mt-3 ml-5" color="teal lighten-1" @click="checkAdminCode">관리자 <br>코드 확인</v-btn>                          
                    </div>

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
                           class="mt-6" color="green lighten-1" 
                           :disabled="(emailPass && nicknamePass && adminPass) == false">
                           가입하기
                    </v-btn>           
                  </v-card-text>                                  
                </v-tab-item>
              </v-form>
            </v-tabs-items>         
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import axiosInst from '@/utility/axiosObject';
  
  export default {
    name: "SignUpForm",
    data () {
      return {
        // items: [
        //   {tab: '관리자용'},
        //   {tab: '일반회원용'}
        // ],
        tab: null,
        admin: false,
        adminCode: "",
        adminPass: false,
        
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
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          if (this.admin) {
            const authorityName = "ADMIN"
            const adminCode = this.adminCode
            const adminCheck = this.admin
            const { email, password, nickname } = this
            this.$emit("submit", { 
              email, password, nickname,
              authorityName, adminCheck, adminCode
            })
          } else {
            const authorityName = "MEMBER"
            const adminCheck = this.admin
            const { email, password, nickname } = this
            this.$emit("submit", { 
              email, password, nickname,
              authorityName, adminCheck
            })
          }
        } else {
          alert('올바른 정보를 입력하세요!')
        }
      },
      choiceAdmin () {
        console.log("관리자용 클릭")
        this.admin = true
      },
      checkAdminCode () {
        const {adminCode} = this
        axiosInst.post(`/member/check-admin/${adminCode}`)
          .then((res) => {
            if(res.data) {
              alert("관리자 코드 확인 완료.")
              this.adminPass = true
            } else {
              alert("관리자 코드가 일치하지 않습니다.")
              this.adminPass = false
            }
          })
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
          axiosInst.post(`/member/check-email/${email}`)
              .then((res) => {
                if (res.data) {
                  alert("사용 가능한 이메일입니다.")
                  this.emailPass = true
                } else {
                  alert("중복된 이메일입니다.")
                  this.emailPass = false
                }
              })
        }
      },


      checkDuplicateNickName () {
        const {nickname} = this
        axiosInst.post(`/member/check-nickname/${nickname}`)
            .then((res) => {
                if(res.data) {
                    alert("사용 가능한 닉네임입니다.")
                    this.nicknamePass = true
                } else {
                    alert("중복된 닉네임입니다.")
                    this.nicknamePass = false
                }


            })
      },
    }
  }
  </script>
  
  <style scoped>
  .half-width {
    width: 50%
  }
  </style>