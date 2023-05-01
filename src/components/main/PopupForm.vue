<template>
  <v-container>
    <div class="popup" v-if="popup">
      <v-img src="@/assets/popup/popup.png" style="max-width: 600px;"/>
      <div class="d-flex justify-content-between m-1">
        <label for="not-open">
          <input id="not-open" type="checkbox" v-model="notOpenToday">
          오늘 하루 이 창 열지 않음
        </label>      
        <button @click="closePopup">
          X 닫기
        </button>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
	name: 'PopupForm',
  data() {
    return {
      popup: true,
      notOpenToday: false
    }
  },
  methods: {
    closePopup() {
      if (this.notOpenToday) {
        localStorage.setItem("popupClosedToday", "true");
      }
      this.popup = false;
    },
  },
  created() {
    console.log(this.notOpenToday)
    console.log()
    if (localStorage.getItem("popupClosedToday") === "true") {
      this.popup = false;
    }
  }
}
</script>

<style scoped>
.popup {
  background-color: white;
  position:absolute;
  top: 10px;
  left: 15px;
  box-shadow: 0px 0px 5px;
}
</style>