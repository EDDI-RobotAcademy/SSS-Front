<template>
  <v-container>
    <my-page/>
    <my-favorite-form @addCart="addCart"/>
  </v-container>
</template>


<script>

import MyFavoriteForm from "@/components/MyPage/MyFavoriteForm.vue";
import MyPage from "@/views/MyPage/MyPage.vue";
import { mapActions } from 'vuex'

const ordercartModule = 'ordercartModule'

export default {
  name: "MyFavoritePage",
  components: { MyFavoriteForm, MyPage },
  methods: {
    ...mapActions(ordercartModule, [        
          'requestAddCartToSpring'    
        ]),
    async addCart(payload) {
            const itemId = payload.productId
            const quantity = payload.quantity
            const category = 'PRODUCT'
            
            console.log('productId: '+ itemId )
            console.log('quantity: '+ quantity )
            console.log('category: '+ category )
            await this.requestAddCartToSpring({ itemId, category, quantity})
          },
  }
}
</script>

    MyInfoForm
<style scoped></style>