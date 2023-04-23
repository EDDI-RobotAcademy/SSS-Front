<template>
  <div class="grey lighten-5">
    <v-container style="max-width: none;">
      <v-row justify="center">
        <v-col class="mx-auto" lg="6" md="8" sm="12">
          <v-card class="mx-auto" max-width="100%">
                <div class="d-flex justify-center align-center text-center">
            <v-card-text class="text-center px-6 py-8">
              <v-form @submit.prevent="onSubmit" ref="form">
                <div class="text-h4 font-weight-black mb-6">회원정보 변경</div>
                <v-row>
                  <div>
                  <v-col cols="12">
                    <div style="margin-bottom: 20px" >
                      <p>닉네임 변경</p>
                    </div>
                    <div class="d-flex align-center align-items-center">
                      <v-text-field v-model="nickname" @change="nicknameValidation" :rules="nickname_rule" :disabled="false" 
                        label="닉네임을 변경하는 경우 입력하세요." outlined dense class="align-self-center" style="margin-top: 30px;" />
                      <v-btn type="button" color="#609966" dark @click="checkDuplicateNickName"
                        style="margin-left: 15px; font-size: 17px; height: 45px;">
                        <span style="color: #fff;">중복 확인</span>
                      </v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <p style="margin-top: 20px;">비밀번호 변경</p>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex align-center">
                      <v-text-field v-model="newPassword" label="비밀번호를 변경하는 경우 입력하세요." type="password"
                        :rules="newPassword_rule" :disabled="false" outlined dense />
                    </div>
                    <div class="d-flex align-center">
                      <v-text-field v-model="newPassword_confirm" label="비밀번호 확인" type="password"
                        :rules="newPassword_confirm_rule" :disabled="false" outlined dense />
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <p>전화번호 변경</p>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex align-center align-items-center">
                    <v-text-field v-model="phoneNumber" label="전화번호를 변경하는 경우 입력하세요." type="phoneNumber" maxlength="11" 
                      placeholder="-를 제외하고 입력해주세요." @input="phoneNumber = phoneNumber.replace(/[^0-9]/g, '')"
                      :rules="phoneNumber_rule" :disabled="false" outlined dense />
                      </div>
                  </v-col>

                  <v-col cols="12" style="margin-top: 20px;">
                <v-btn type="submit" color="#609966" style="width: 270px; height: 50px;">
                  <span style="color: #fff; font-size: 17px;">변경하기</span>
                </v-btn>
              </v-col>
            </div>
            </v-row>
          </v-form>
        </v-card-text>
      </div>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</div>
</template>

  
<script>
import axiosInst from '@/utility/axiosObject'


export default {
  data() {
    return {
      nickname: "",
      newPassword: "",
      newPassword_confirm: "",
      phoneNumber: "",
      nicknameBoxClick: false,
      nicknamePass: false,
      newPasswordPass: false,
      newPasswordConfirmPass: false,
      phoneNumberPass: false,

      nickname_rule: [
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
        v => !v || /^(010|011|016|017|018|019)[0-9]{7,8}$/.test(v) || "유효하지 않은 전화번호입니다.",
      ],
    }
  },
  methods: {

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
    checkDuplicateNickName() {
      const { nickname } = this
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
        this.$emit("submit", { phoneNumber, nickname, newPassword });
      } else {
        alert("올바른 정보를 입력하세요!");
      }
    }
  },
};
</script>
  
<style scoped>
v-text-feild {
  min-width: 400px;
  max-width: 550px;
  border: none;
  box-shadow: none;
  padding: 12px 16px;
  width: 100%;
  line-height: 1.2;

}

.text-h4 {
  font-size: 24px;
  color: #40513B;
}

p {
  font-size: 23px;
  color: #40513B;
}


</style>