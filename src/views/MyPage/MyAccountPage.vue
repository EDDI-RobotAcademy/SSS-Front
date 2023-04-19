<template>
   <v-container>
    <div>
    <my-page/>
  </div>
    <div class="my-tabs">
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
.my-tabs {
  margin-top: 50px;
}
.v-tab {
  color: black; /* 기본 글씨색 */
  margin-top: 10px; /* 글씨가 위로 올라가는 것 보정 */
  font-size: 20px; /* 글씨 크기 변경 */
}

.v-tab.v-tab--active {
  color: var(--v-theme-primary); /* 클릭되었을 때 글씨색 */
}


/* 호버 기능 제거 */.v-tab--active::before {
  display: none;
}

/* 호버 기능으로 인해 나타나는 회색 사각형 제거 */
.v-tab--active::after {
  background-color: transparent !important;
}
/* 자식 요소에도 적용되도록 >>> 연산자 사용 */
::v-deep .v-tab--active:hover::before {
  background-color: transparent !important;
}

</style>