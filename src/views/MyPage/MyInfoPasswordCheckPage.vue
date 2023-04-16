<template>
  <v-container>
            <v-card-text>
              <v-container style="width: 1000px">
                <v-form @submit.prevent="onSubmit">
                  <div>
                    <table style="table-layout: fixed; width: 100%; box-sizing: border-box">
                      <tbody style="margin: 0; border: 0; vertical-align:">
                          <th class="th-style">
                            비밀번호 확인이 필요합니다.
                          </th>
                          <td style="border-bottom: 1px solid black; padding: 12px 10px">
                            <v-layout style="width: 400px">
                              <v-text-field outlined dense style="width: 280px; height: 45px" type="text" v-model="password" label="비밀번호" />
                              <div style="margin-left: 10px">
                              </div>
                            </v-layout>
                          </td>
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
  </v-container>
</template>

<script>
import MyMemberInfoModifyPage from "@/views/MyPage/MyMemberInfoModifyPage.vue";
import router from "@/router";
import { mapActions } from "vuex";

const memberModule = "memberModule";

export default {
  name: "MyInfoPasswordCheckPage",
  components: {
    MyMemberInfoModifyPage,
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    ...mapActions(memberModule, ["requestCheckPasswordToSpring"]),

    onSubmit() {
      const memberId = parseInt(localStorage.getItem("userId"), 10);
      const password = this.password;
      if (!password) {
        alert("비밀번호를 입력하세요.");
        return;
      }
      this.requestCheckPasswordToSpring({memberId, password})
          .then((res) => {
            if (res === false) {
              alert("비밀번호가 틀림");
              router.push("/my-info-account");
            } else {
              router.push("/my-member-Info-modify-page");
            }
          });
        },
    },
  };

    
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