<template>
    <v-container>
      <v-col cols="12" style="margin-bottom:-10px">
      <span style="font-size: 60px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
      <div class="line"/>
          <h2>" {{ingredientAmount.ingredientName}} " 의 수량/가격 수정</h2>
          <div>
              <ingredient-amount-modify-form :id="id" v-if="ingredientAmount" :ingredientAmount="ingredientAmount" @submit="onSubmit"/>         
          <p v-else>로딩중 .......</p>
        </div>
       
       </v-col>
    </v-container>  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import IngredientAmountModifyForm from '@/components/SelfSalad/IngredientAmountModifyForm.vue';

const selfSaladModule = 'selfSaladModule'

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
        ...mapState(selfSaladModule, [
          'ingredientAmount'
        ])
      },
      methods: {
          ...mapActions(selfSaladModule, [
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

<style scoped>
    .line{
    width: 100%;
    border-bottom: 7px solid #40513B;
    margin-top: -24px;
}
*{
    /* color: #40513B; */
    color: #40513B;
  }
  @font-face {
    font-family: 'HSBombaram';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
h2{
  margin-top: 40px;
  font-size:40px;
  font-weight: bold;
}
</style>