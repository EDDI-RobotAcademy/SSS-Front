<template>
  <v-container style="width:100% max-width:1000px">
    <div class="grey lighten-5">
        <v-row justify="center">
        <v-card class="mx-auto" max-width="1000">
          <div class="d-flex align-center align-items-center text-center">
          <v-col class="mx-auto" lg="6" md="8" sm="12">
            <v-form ref="form" @submit.prevent="onSubmit">
  <v-col cols="12" class="d-flex justify-center">
    <div style="width: auto; margin-bottom: 20px;">
      <div class="text-h4 font-weight-black" style="padding-right: 40px;">주소 변경</div>
    </div>
    <v-btn @click="KakaoAddressApi" color="#609966" dark>주소 검색</v-btn>
  </v-col>
      <v-col cols="12">
    <div class="d-flex" style="width: auto;">
      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">우편 번호</p>
      <v-text-field v-model="zipcode" type="text" :disabled="false" outlined dense required style="width: auto; max-width: 600px; font-size: 17px;"/>
    </div>
  </v-col>
  <v-col cols="12">
    <div class="d-flex" style="width: auto;">
      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">도로명 주소</p>
      <v-text-field v-model="city" type="text" :disabled="false" outlined dense required style="width: 600px; font-size: 17px;"/>
    </div>
  </v-col>
  <v-col cols="12">
    <div class="d-flex" style="width: auto;">
      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">지번 주소</p>
      <v-text-field v-model="street" type="text" :disabled="false" outlined dense required style="width: 600px; font-size: 17px;"/>
    </div>
  </v-col>
  <v-col cols="12">
    <div class="d-flex" style="width: auto;">
      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">상세 주소</p>
      <v-text-field v-model="addressDetail" type="text" :disabled="false" outlined dense required style="width: 600px; font-size: 17px;"/>            
    </div>
  </v-col>
  <v-col cols="12">
    <div>
      <v-btn type="submit" color="#609966" style="width: 270px; height: 50px;">
        <span style="color: #fff; font-size: 17px;">변경하기</span>
      </v-btn>
    </div>
  </v-col>
</v-form>
      </v-col>
    </div>
  </v-card>
</v-row>
</div>
  </v-container>
</template>

<script>
import axiosInst from '@/utility/axiosObject'


export default {
  data() {
    return {

      zipcode: '',
      city: '',
      street: '',
      addressDetail: '',

      addressPass: false,

    }
  },
  methods: {
    KakaoAddressApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullRoadAddr = data.roadAddress;
          let extraRoadAddr = '';

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr;
          }

          this.zipcode = data.zonecode;
          this.city = fullRoadAddr;
          this.street = data.jibunAddress;
          this.addressPass = true;

        }
      }).open()
    },
    onSubmit() {
      const zipcode = this.zipcode
      const city = this.city
      const street = this.street
      const addressDetail = this.addressDetail

      console.log(zipcode, city, street, addressDetail);

      this.$emit("submit", { zipcode, city, street, addressDetail });

    },
  }
}


</script>

<style scoped>

@media (max-width: 600px) {
    .d-flex {
      flex-direction: column;
      margin-bottom: 16px;
    }
  }

.text-h4 {
  font-size: 24px;
  color: #40513B;
}




p {
  margin-bottom: 8px;
      margin-right: 10px;
      font-size: 23px;
  color: #40513B;
    }

  
  
</style>