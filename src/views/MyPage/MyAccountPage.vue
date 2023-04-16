<template>
   <v-container>
    <my-page/>
    <div>
      <v-tabs>
        <v-tab style="margin-bottom: 30px; font-weight: bold">
          회원 정보 변경
        </v-tab>
        <v-tab-item>
          <my-info-password-check-page />
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
import MyInfoPasswordCheckPage from "@/views/MyPage/MyInfoPasswordCheckPage.vue";

export default {
  name: "MyAccountPage",
  components: { MyPage, MyAccountDropForm, MyInfoPasswordCheckPage },
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