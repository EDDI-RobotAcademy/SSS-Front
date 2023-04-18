<template>
  <v-card flat style="width: 100%">
    <v-card-text>
      <v-container style="width: 1000px">
        <div style="margin-top: 50px" align="center">
          <v-card style="width: 700px; height: auto; text-align: left" flat>
            <h4 style="padding: 12px 20px">회원 탈퇴 시 주의사항🚨</h4>
            <v-divider></v-divider>
            <div style="padding: 12px 25px">
              <h5>▪ 탈퇴 후 회원 정보 및 이용기록은 모두 삭제되며, 다시 복구 할 수 없습니다.</h5>
              <h5>▪ 탈퇴 후 동일한 아이디로 재가입이 가능합니다.</h5>
            </div>
          </v-card>
        </div>
        <!-- 체크박스 -->
        <v-layout justify-end style="margin-right: 128px">
          <div style="margin-top: 22px">
            <h4>주의사항을 확인하였고, 탈퇴를 진행합니다.</h4>
          </div>
          <div>
            <v-checkbox v-model="consentCheckStatus"/>
          </div>

        </v-layout>
      </v-container>
    </v-card-text>
    <div align="center">
      <v-btn
          rounded
          class="white--text"
          style="background-color: #80a84f"
          elevation="0"
          :disabled="!consentCheckStatus"
          @click="accountDrop"
      >
        회원탈퇴
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MyAccountDropForm",
  data: () => ({
    consentCheckStatus: false,
    accountDorp: false,
    dropcheckalert: false,
  }),
  methods: {
    ...mapActions('memberModule', ['requestDeleteMember']),
    async accountDrop() {
    const result = window.confirm("정말 탈퇴 하시겠습니까?");
    if (result) {
      try {
        await this.requestDeleteMember();
        this.$router.push("/");  
      } catch (err) {
        console.error(err);
        alert("회원 탈퇴에 실패하였습니다.");
      }
      history.go(0)
    }
    
  },
}
};

</script>

<style scoped>

</style>