<template>
  <!-- 회원 정보 관리 -->
  <div>
    <v-container style="width: 1400px">
      <h2>내 정보</h2>
      <v-divider style="margin-top: 40px"></v-divider>

      <div style="margin-top: 80px">
        <v-tabs vertical>
          <v-tab style="margin-bottom: 30px; font-weight: bold">
            회원 정보 관리

          </v-tab>

          <v-tab-item>
            <v-card flat style="width: 100%">
              <v-card-text>
                <h2 style="margin-left: 50px">회원 정보 관리</h2>
                <v-divider style="margin-top: 30px"></v-divider>
                <v-container style="width: 1000px">
                  <v-form @submit.prevent="onSubmit">
                    <div style="margin-top: 100px">
                      <table style="table-layout: fixed; width: 100%; box-sizing: border-box">
                        <tbody style="margin: 0; border: 0; vertical-align: baseline">
                          <tr>
                            <th class="th-style">
                              닉네임
                            </th>
                            <td style="border-bottom: 1px solid black; padding: 12px 10px">
                              <v-layout style="width: 400px">
                                <v-text-field v-model="nickname" outlined dense style="width: 280px; height: 45px"
                                  :rules="nickname_rule" @change="nicknameValidation" />
                                <div style="margin-left: 10px">
                                  <v-btn rounded elevation="0" style="background-color: #2F4F4F" class="white--text"
                                    @click="checkDuplicateNickname" :disabled="!nicknamePass">
                                    중복확인
                                  </v-btn>
                                </div>
                              </v-layout>

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div align="center" style="margin-top: 10px">
                      <v-btn rounded elevation="0" style="background-color: #2F4F4F" class="white--text" type="submit"
                        :disabled="!nicknameDuplicatePass || !nicknamePass">
                        수정
                      </v-btn>
                    </div>

                  </v-form>
                </v-container>

              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab style="margin-bottom: 30px; font-weight: bold">
            회원 탈퇴
          </v-tab>
          <v-tab-item>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-container>
  </div>
</template>

<script>


export default {
  name: "MyInfoForm",
  data() {
    return {
      nickname: '',
      nicknamePass: false,
      nicknameDuplicatePass: false,
      nickname_rule: [
        v => !!v || '닉네임을 입력해주세요.',
        v => {
          const pattern = /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/
          return pattern.test(v) || '특수문자는 입력할 수 없습니다.'
        },
        v => !(v && v.length >= 20) || '닉네임은 30자 이상 입력할 수 없습니다.',
      ],
    }
  }
}
</script>

<style scoped>
.th-style {
  background-color: #f5f5f5;
  width: 120px;
  border: 1px;
  text-align: left;
  padding: 12px 10px;
  height: 48px;
  border-bottom: 1px solid black;
}
</style>