<template>
  <v-container>
    <div class="popup" v-if="popup">
      <p>{{ title }}</p>
      <div class="close-btn">
        <button @click="popup = false">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
    <v-img src="@/assets/popup/SSS.jpeg" style="max-width: 300px; max-height: 180px;">
    </v-img>
    <p>샐러드 설명</p>
    <p>샐러드 설명</p>
    <p>샐러드 설명</p>
    <router-link to="/member/sign-up">
      <v-btn>회원가입 하러...</v-btn>
    </router-link>
    <v-btn>이벤트 자세히...</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
	name: 'PopupForm',
  data() {
    return {
      name: '팝업 창 입니다.',
      popup: true,
    }
  },
}
</script>

<style scoped>
.popup {
  background-color: rgb(245, 250, 248);
  position: fixed;
  top: 280px;
  right: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px;
  z-index: 9999;

}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>