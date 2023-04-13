<template>
  <v-container>
    <my-page/>
    <div>
      <v-tabs>
        <v-tab style="margin-bottom: 30px; font-weight: bold">
          회원 정보 변경
        </v-tab>
        <v-tab-item>
          <v-card style="width: 100%">
            <v-card-text>
              <v-container style="width: 1000px">
                <v-form @submit.prevent="onSubmit">
                  <div>
                    <table style="table-layout: fixed; width: 100%; box-sizing: border-box">
                      <tbody style="margin: 0; border: 0; vertical-align:">

                        <tr>
                          <th class="th-style">
                            아이디
                          </th>
                          <td style="border-bottom: 1px solid black; padding: 12px 10px">
                            <v-layout style="width: 400px">
                              <v-text-field outlined dense style="width: 280px; height: 45px" />
                              <div style="margin-left: 10px">
                                <v-btn rounded elevation="0" style="background-color: #2F4F4F" class="white--text"
                                  @click="checkDuplicateNickname" :disabled="!nicknamePass">
                                  중복확인
                                </v-btn>
                              </div>
                            </v-layout>
                          </td>
                        </tr>
                        <tr>
                          <th class="th-style">
                            닉네임
                          </th>
                          <td style="border-bottom: 1px solid black; padding: 12px 10px">
                            <v-layout style="width: 400px">
                              <v-text-field outlined dense style="width: 280px; height: 45px" />
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
                    <v-btn rounded elevation="0" style="background-color: #80a84f" class="white--text" type="submit">
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
          <my-account-drop-form />
        </v-tab-item>
      </v-tabs>
    </div>
  </v-container>
</template>

<script>
import MyPage from "@/views/MyPage/MyPage.vue";
import MyAccountDropForm from "@/components/MyPage/MyAccountDropForm.vue";


export default {
  name: "MyAccountPage",
  components: { MyAccountDropForm, MyPage },
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