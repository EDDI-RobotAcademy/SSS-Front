<template>
  <v-container>
    <my-page/>
    <my-shopping-cart-form :cartItems="cartItems" @onDelete="onDelete" @onModify="onModify" @onSSSModify="onSSSModify" @selectDelete="selectDelete"/>
  </v-container>
</template>


<script>
import MyShoppingCartForm from '@/components/MyPage/MyShoppingCartForm.vue'
import MyPage from "@/views/MyPage/MyPage.vue"



import { mapActions, mapState } from 'vuex'

const ordercartModule = 'ordercartModule'

export default {
  name: "MyShoppingCartPage",
  components: { MyShoppingCartForm, MyPage },
  data() {
    return {
      showModal: false
    }
  },
  computed:{
    ...mapState(ordercartModule, [
      'cartItems',
    ])
  },
  methods:{
    ...mapActions(ordercartModule, [
      'requestAddCartListToSpring',
      'requestDeleteCartToSpring',
      'requestModifyCartToSpring',

    //'requestSelfSaladAddCartListToSpring',
    // 장바구니 담긴 셀프 샐러드 불러오기  
    'requestSelfSaladToSpring',
    'requestSelectDeleteCartToSpring'
    ]),
    async onDelete(payload) {
      const itemId = payload.itemId
      const category = payload.category
      console.log('itemId: '+ itemId )
      await this.requestDeleteCartToSpring({ itemId, category })
      window.location.reload(true);
    },
    async onSSSModify(payload) {
      // const itemId = payload.itemId
      const itemId = payload
      console.log('itemId: '+ itemId )
      await this.requestSelfSaladToSpring( itemId )
    },
    async onModify(payload) {
      const itemId = payload.itemId
      const quantity = payload.quantity
      console.log('itemId: '+ itemId )
      console.log('quantity: '+ quantity )
      await this.requestModifyCartToSpring({ itemId, quantity })
      window.location.reload(true);
    },
    async selectDelete(payload) {
      console.log("deleteId"+payload.itemId)
      console.log("deleteCategory"+payload.itemCategoryType)
      await this.requestSelectDeleteCartToSpring(payload)
      window.location.reload(true);
    }
  },
  async created() {
    // 담긴 상품 불러오기, 
  await this.requestAddCartListToSpring()
  // await this.requestSelfSaladAddCartListToSpring()

}
}
</script>

<style scoped></style>