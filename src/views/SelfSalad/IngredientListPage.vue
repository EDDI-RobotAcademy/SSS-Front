<template>
  <v-container>
    <ingredient-list-form :ingredients="ingredients"
                           @change="changeCategory"
                           @click="onDelete" 
                           @addCart="addCart"/>
  </v-container>
</template>

<script>
import IngredientListForm from '@/components/SelfSalad/IngredientListForm.vue';
import { mapActions, mapState } from 'vuex'

const selfSaladModule = 'selfSaladModule'
const ordercartModule = 'ordercartModule'

  export default {
      components: { IngredientListForm },
      name: "IngredientListPage",

      computed: {
        ...mapState(selfSaladModule, [
          'ingredients'
        ]),
      },
      // default로 spring에서 가져올 ingredients mount하기
      mounted () {
          this.requestIngredientListToSpring()
      },         
      methods: {
        ...mapActions(selfSaladModule, [
          'requestIngredientListToSpring',
          'requestIngredientCategoryToSpring',
          'requestDeleteIngredientToSpring'
        ]),
        ...mapActions(ordercartModule, [        
          'requestSelfSaladAddCartToSpring'    
    ]),
        async changeCategory(payload){
          await this.requestIngredientCategoryToSpring(payload) //카테고리 이름
        },
        async onDelete (payload) {
          const ingredientId = payload
          await this.requestDeleteIngredientToSpring(ingredientId)
          console.log("삭제완료")
          await this.requestIngredientListToSpring()
        },
        // 장바구니에 상품 추가
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