<template>
  <v-container>
  <self-salad-modify-cart-form 
    :ingredients="ingredients"
    :cartItem="cartItem"
    @change="changeCategory"/>
    <v-btn @click="$emit('close')">
      닫기
    </v-btn>
</v-container>
</template>

<script>
import SelfSaladModifyCartForm from '@/components/SelfSalad/SelfSaladModifyCartForm.vue';
import { mapActions, mapState } from 'vuex'

const selfSaladModule = 'selfSaladModule'
const ordercartModule = 'ordercartModule'

  export default {
      components: { SelfSaladModifyCartForm },
      name: "SelfSaladModifyCartPage",
      computed: {
        ...mapState(selfSaladModule, [
          'ingredients'
        ]),
        ...mapState(ordercartModule, [
          'cartItem'
        ])
      },
      // default로 spring에서 가져올 ingredients mount하기
      mounted () {
          this.requestIngredientListToSpring()
      },         
      methods: {
        ...mapActions(selfSaladModule, [
          'requestIngredientListToSpring',
          'requestIngredientCategoryToSpring',
        ]),
      //   ...mapActions(ordercartModule, [ 
      //     'requestSelfSaladToSpring'
      // ]),
        async changeCategory(payload){
          await this.requestIngredientCategoryToSpring(payload) //카테고리 이름
        },
        // 수정 완 벝
        async addCart(payload) {
            const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
            const quantity = payload.quantity
            const totalPrice = payload.totalPrice
            const totalCalorie = payload.totalCalorie
            const title = payload.title
            const selfSaladRequestList = payload.selfSaladRequestList
            console.log('title: '+ title )
            console.log('memberId: '+ memberId )
            console.log('quantity: '+ quantity )
            console.log('totalPrice: '+ totalPrice )
            console.log('totalCalorie: '+ totalCalorie )
            // await this.requestSelfSaladAddCartToSpring({title, quantity, totalPrice, totalCalorie, memberId})
            await this.requestSelfSaladAddCartToSpring({ title, quantity, totalPrice, totalCalorie, memberId, selfSaladRequestList})
          },
      },
      beforeRouteLeave(to, from, next) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('option')) {
            localStorage.removeItem(key);
          }
        }
        next(); 
      },
}

</script>

<style>

</style>