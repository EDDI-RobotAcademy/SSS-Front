<template>
  <div>
    <v-card>
      <v-form ref="form" @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center align-items-center">
              <div>
                <p>주소 변경</p>
              </div>

              <div>
                <v-btn @click="KakaoAddressApi" color="#609966" dark>
                  주소 검색
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <div>
              <div class="d-flex" style="width: 300px;">
                <p style="padding-right: 20px;">우편 번호</p>
                <v-text-field v-model="zipcode" label="우편번호" type="text" :disabled="false" required />
              </div>
              <div class="d-flex">
                <p>도로명 주소</p>
                <v-text-field v-model="city" label="도로명주소" type="text" :disabled="false" required />
              </div>
              <div class="d-flex">
                <p>지번 주소</p>
                <v-text-field v-model="street" label="지번주소" type="text" :disabled="false" required />
              </div>
              <div class="d-flex">
                <p>상세 주소</p>
                <v-text-field v-model="addressDetail" label="상세주소" type="text" :disabled="false" required />
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              <v-btn type="submit" block x-large rounded class="mt-6" style="background-color: #609966; color: white;">
                변경하기
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
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

    p {
      margin-bottom: 8px;
      margin-right: 10px;
    }

    v-btn {
      width: 100%;
    }
  }
</style>