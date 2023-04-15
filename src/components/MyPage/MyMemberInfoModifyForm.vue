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
                  <v-text-field v-model="newPassword" label="비밀번호" type="password"
                                :rules="newPassword_rule" :disabled="false" required/>
                </div>
  
                <div class="d-flex">
                  <v-text-field v-model="newPassword_confirm" label="비밀번호 확인" type="password"
                                :rules="newPassword_confirm_rule" :disabled="false" required/>
                </div>
  
                <div class="d-flex">
                  <v-text-field 
                    v-model="phoneNumber" 
                    label="전화번호 입력" 
                    type="phoneNumber" 
                    maxlength="11" 
                    placeholder="-를 제외하고 입력해주세요."
                    @input="phoneNumber = phoneNumber.replace(/[^0-9]/g, '')"
                    :rules="phoneNumber_rule"
                    :disabled="false" required/>
                </div>
  
  
  
                <div>
                 
                  <div>
                   <v-btn @click="KakaoAddressApi">주소 검색</v-btn>
                  </div>
                </div>
                <div class="d-flex">
                  <v-text-field v-model="addresses.zipcode" label="우편번호" type="text" :disabled="false" required/>
                </div>
                <div class="d-flex">
                  <v-text-field v-model="addresses.city" label="도로명주소" type="text" :disabled="false" required/>
                  </div>
                  <div>
                  <v-text-field v-model="addresses.street" label="지번주소" type="text" :disabled="false" required/>
                </div>
                <div class="d-flex">
                  <v-text-field v-model="addresses.addressDetail" label="상세주소" type="text" :disabled="false" required/>
                </div>
                
                <v-btn type="submit" block x-large rounded
                       class="mt-6" color="purple lighten-1" 
                       :disabled="(nicknamePass) == false">
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
  import axiosInst from '@/utility/axiosObject'
  
  
  export default {
  data () {
      return {
        addresses: 
        {
          zipcode: '',
          city: '',
          street: '',
          addressDetail: '',
        },
        nickname: "",
        newPassword: "",
        newPassword_confirm: "",
        phoneNumber: "",
        address: "",
        nicknameBoxClick: false,
        nicknamePass: false,
        newPasswordPass: false,
        newPasswordConfirmPass: false,
        phoneNumberPass: false,
        addressPass: false,
        
        nickname_rule: [
          v => !!v || '닉네임을 입력해주세요.',
          v => !(v && v.length >= 15) || '닉네임은 15자 이상 입력할 수 없습니다.',
        ],
        newPassword_rule: [
          v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
          v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
        ],
        newPassword_confirm_rule: [
          v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
          v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
          v => v === this.newPassword || '패스워드가 일치하지 않습니다.'
        ],
  
        phoneNumber_rule: [
           v => !!v || "전화번호를 입력해주세요.",
           v => /^(010|011|016|017|018|019)[0-9]{7,8}$/.test(v) || "유효하지 않은 전화번호입니다.",
        ],
        address_rule: [
          v => !!v || "주소를 입력해주세요.",  
        ],
    }
        },
        methods: {
          KakaoAddressApi() {
          new window.daum.Postcode({
          oncomplete: (data) => {
            let fullRoadAddr = data.roadAddress;
            let extraRoadAddr = '';
  
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
  
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
  
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
  
                if (fullRoadAddr !== '') {
                    fullRoadAddr += extraRoadAddr;
                }
  
                this.addresses.zipcode = data.zonecode;
                this.addresses.city = fullRoadAddr;
                this.addresses.street = data.jibunAddress;
                this.addressPass = true;
                
                }
            }).open()
        },
  
          onAddressSelected(address) {
            this.zipcode = address.zipcode;
            this.city = address.addresses1;
            this.street = address.addresses2;
          },
    
          nicknameValidation() {
            this.nicknamePass = this.nickname.length > 0;
          },
          newPasswordValidation() {
            this.newPasswordPass = this.newPassword.length >= 8 && this.newPassword.length <= 30;
          },
          newPasswordConfirmValidation() {
            this.newPasswordConfirmPass = this.newPassword_confirm === this.newPassword;
          },
          phoneNumberValidation() {
            this.phoneNumberPass = /^(010|011|016|017|018|019)[0-9]{7,8}$/.test(this.phoneNumber);
          },
          addressValidation() {
            this.addressPass = this.address.length > 0;
          },
          checkDuplicateNickName() {
            const {nickname} = this
            axiosInst.post(`/member/check-nickname/${nickname}`)
                .then((res) => {
                    if (res.data) {
                        alert("사용 가능한 닉네임입니다.")
                        this.nicknamePass = true
                    } else {
                        alert("중복된 닉네임입니다.")
                        this.nicknamePass = false
                    }
                })
                .catch((err) => {
                    alert("중복 확인 중 오류가 발생했습니다.")
                    console.log(err)
                    this.nicknamePass = false
                })
          },
          onSubmit() {
            if (this.$refs.form.validate()) {
              const { phoneNumber, nickname, newPassword } = this;
              const addresses = [this.addresses];
              this.$emit("submit", { phoneNumber, nickname, addresses, newPassword });
              console.log(addresses);
            } else {
              alert("올바른 정보를 입력하세요!");
            }
         }
      },
    };
  </script>
  
  <style>
  
  </style>