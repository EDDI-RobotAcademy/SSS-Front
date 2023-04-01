<template>
  <form @submit.prevent="onSubmit">
    <table>
      <tr>
        <h2>{{ category }} 입니다.</h2>
        <select v-model="category" @change="changeCategory">
          <option value="VEGETABLE">채소</option>
          <option value="MEAT">육류</option>
          <option value="TOPPING">토핑</option>
        </select>    
      </tr>
      <div>
        <p>최종 가격: {{ totalPrice }}</p>
        <p>최종 칼로리: {{ totalCalorie }}</p>
      </div>
      <button type="button" @click="resetAll">
        초기화
      </button>
      <tr class="cardSession">
        <td v-if="!ingredients || (Array.isArray(ingredients) && ingredients.length === 0)">
          <p colspan="4">
              현재 등록된 재료가 없습니다!
          </p>
        </td>
        <td class="card"
          v-else v-for="ingredient in ingredients" :key="ingredient.id">
          <ingredient-card :ingredient="ingredient"
                            @change="onChange"
                            :change-value="changeValue" />
        </td>
      </tr>
      <div>
        <button type="submit">바로 주문하기</button>
        <router-link :to="{ name: 'IngredientRegisterPage' }">
          등록하기
        </router-link>
      </div>
    </table>
  </form>
</template>

<script>
import IngredientCard from '@/components/SelfSalad/IngredientCard.vue';
export default {
  name: "IngredientListForm",
  components: { IngredientCard },
  data(){
    return {
      category: '채소',
      totalPrice: 0,
      totalCalorie: 0,
      selectedAmount: 0,
      changeValue : 0,
    }   
  },
  props: {
    ingredients: {
      type : Array,
      require: true,
    },
  },
  methods: {
    onChange( selectPrice, selectCalorie, optionValue ){
      this.totalPrice += selectPrice
      this.totalCalorie += selectCalorie
      console.log(optionValue)
      this.changeValue = optionValue

      console.log(selectPrice+": 전달받은 가격")
      console.log(selectCalorie+": 전달받은 수량")
      console.log(optionValue+": 전달받은 옵션값" )
      //const amount = Number(selectedAmount)

    },
    resetAll() {
        this.selectedAmount = 0;
        this.totalCalorie = 0;
        this.totalPrice = 0;
        this.changeValue = -1;
      },
    changeCategory(){
      const categoryName = this.category
      this.$emit('change', categoryName)
    }
    },


}
</script>

<style scoped>
  .cardSession{
    width: 100%;

    margin-bottom: 50px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

  }
  .cardSession .card{
    width: 16%;
    margin: 0 3%;
    height: 350px;
  }
  .cardSession .card:nth-child(4n){
    margin-bottom: 60px;
  }

</style>
<!-- 최소 수량 당 기본 칼로리를 정하기
  사용자가 선택한 수량에 기본 칼로리를 정해 최종 칼로리를 비동기로 구현
 ingredient.calory KCAL -->

       <!-- 이전에 선택했던 모든 option들이 첫번째 option(0g/0개) 로 바뀌면서
          칼로리 또한 0이 됨 -->
      <!-- <button>모든 선택 취소</button> -->