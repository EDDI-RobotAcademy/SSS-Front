<template>
    <v-container>
        <div align="center">
          <h2>" {{ingredientAmount.ingredientName}} " 수량/가격 수정</h2>
          <br>
          <div>
              <ingredient-amount-modify-form :id="id" v-if="ingredientAmount" :ingredientAmount="ingredientAmount" @submit="onSubmit"/>         
          <p v-else>로딩중 .......</p>
        </div>
        </div>
    </v-container>  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import IngredientAmountModifyForm from '@/components/SelfSalad/IngredientAmountModifyForm.vue';
export default {
    name: 'IngredientAmountModifyPage',
    components: {IngredientAmountModifyForm},
    props: {
        id: {
          type: String,
          required: true
        },
      },
      computed: {
        ...mapState(['ingredientAmount'])
      },
      methods: {
          ...mapActions([
              'requestIngredientAmountToSpring',
              'requestIngredientAmountModifyToSpring',
          ]),
          async onSubmit (payload) {
              const { amountType, max, min, unit, price, calorie } = payload
              const ingredientId = this.id
              console.log("payload : "+amountType, max, min, unit, price, calorie)
  
              await this.requestIngredientAmountModifyToSpring({ ingredientId, amountType, max, min, unit, price, calorie })
              await this.$router.push({
                  name: 'IngredientListPage',
              })
          }
      },
      created(){
        console.log("id 확인"+ this.id);
        this.requestIngredientAmountToSpring(this.id)
      }
}
</script>

<style>

</style>