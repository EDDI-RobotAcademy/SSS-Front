<template>
  <v-container class="mt-15">
    <my-shopping-cart-form @selectPurchase="selectPurchase"/>
    <payment-info-form :selectedItems="selectedItems" v-on:payment-success="payment" @addAdress="addAdress" :memberInfoAdd="memberInfoAdd"/>
    
  </v-container>
</template>

<script>
import PaymentInfoForm from "@/components/MyPage/PaymentInfoForm"
import MyShoppingCartForm from "@/components/MyPage/MyShoppingCartForm";

const ordercartModule = 'ordercartModule'
const memberModule = 'memberModule'

import { mapActions, mapState } from 'vuex';

export default {
  name: "PaymentInfoPage",
  components: { PaymentInfoForm, MyShoppingCartForm },
  data() {
    return {
      showModal: false,
      selectedItems: [],
    }
  },
  computed:{
    ...mapState(ordercartModule, [
      'cartItems',
      'cartItem',
      'orderList'
    ])
  },
  ...mapState(memberModule, [
            'memberInfoAdd'
          ]),
  methods: {
    ...mapActions(memberModule, [
          'requestRegisterAddressToSpring'
        ]),
        addAdress(payload) {
          const{zipcode, city, street, addressDetail}= payload
          console.log(zipcode, city, street, addressDetail);          
          this.requestRegisterAddressToSpring(payload);
          this.$emit('close');
  },
    selectPurchase(items) {
      for(i=0; i < items.length; i++ ){
        this.selectedItems.push(items[i])
      }
      for (let i=0; i < items.length; i++ ) {
            this.selectedItems.push({
              Id: items[i].cartItemId, 
              title: items[i].title,
              price: items[i].totalPrice, 
              quantity: items[i].quantity
          });
      } 


      this.orderList = this.$store.state.ordercartModule.orderList;


      console.log(this.orderList.orderSave.title);
      console.log(items.length+ 'dfdf')
      
    },
    ...mapActions( ordercartModule, [

    'reqMyPageRegisterDeliveryToSpring',

    ]),
    async payment(payload) {
      const { totalOrderPrice, deliveryRegisterRequest, paymentRequest, orderItemRegisterRequestList } = payload
      
      console.log(totalOrderPrice, deliveryRegisterRequest, paymentRequest, orderItemRegisterRequestList)
      
      await this.reqRegisterOrderToSpring(payload)
      
      alert("구매가 완료 되었습니다. 감사합니다.")
    },

},
// async onMounted() {
//   await this.requestAddCartListToSpring(),
//   await this.requestSelfSaladAddCartListToSpring()

// }
  }
</script>

<style scoped>
</style>