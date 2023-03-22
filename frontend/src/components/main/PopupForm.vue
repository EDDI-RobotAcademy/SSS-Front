<template>
  <v-container>
    <div class="popup" v-if="popup">
      <p>{{ title }}</p>
      <div class="close-btn">
        <button @click="popup = false">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <v-img src="@/assets/logo.png">
      </v-img>
      <p>샐러드 설명</p>
      <p>샐러드 설명</p>
      <p>샐러드 설명</p>
      <v-btn>회원가입 하러...</v-btn>
      <v-btn>이벤트 자세히...</v-btn>
    </div>
  </v-container>

</template>

<script>


export default {
  name: 'HomeView',
  data() {
    return {
      title: '팝업 창 입니다.',
      popup: true,
    }
  },

}
</script>

<style scoped>
.popup {
  background-color: rgb(219, 237, 228);
  position: fixed;
  top: 200px;
  right: 55px;
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
