<template>
  <v-container class="mt-15">
    <payment-info-form/>
  </v-container>
</template>

<script>
import PaymentInfoForm from "@/components/Payment/PaymentInfoForm";
import {mapActions} from "vuex";

const paymentModule = 'paymentModule'

export default {
  name: "PaymentInfoPage",
      components: { PaymentInfoForm },
      methods: {
          ...mapActions(paymentModule, [
              "reqRegisterOrderToSpring"
          ]),
          // async payment(payload) {
          //   const { amount, merchant_uid, sendInfo, imp_uid, phoneNumber, recipientName, road, addressDetail, zipcode, selectedDeliveryReq } = payload
            
          //   console.log(amount, merchant_uid, sendInfo, imp_uid, phoneNumber, recipientName, road, addressDetail, zipcode, selectedDeliveryReq)
            
          //   await this.reqRegisterOrderToSpring(payload)
            
          //   alert("구매가 완료 되었습니다. 감사합니다.")
          //   await this.$router.push("purchase-complete")
          // },
      }
  }
</script>

<style scoped>
</style>