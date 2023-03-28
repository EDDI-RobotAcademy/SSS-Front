<template>
  <form @submit.prevent="onSubmit">
    <table>
      <tr>
        <h2>{{ category }} 입니다.</h2>
        <select v-model="category">
          <option selected value="vegetable" >채소</option>
          <option value="meat">육류</option>
          <option value="topping">토핑</option>
        </select>
      </tr>
      <tr class="cardSession">
        <td v-if="!ingredients || (Array.isArray(ingredients) && ingredients.length === 0)">
          <p colspan="4">
              현재 등록된 재료가 없습니다!
          </p>
        </td>
        <td class="card"
          v-else v-for="ingredient in ingredients" :key="ingredient.id">
          <ingredient-card :ingredient="ingredient"/>
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
    }   
  },
  props: {
    ingredients: {
      type : Array
    }
  }, 
  methods: {
    // onChange(){
    //   this.$emit("change",this.category)
    //   console.log(this.category)
    // },
    // defaultType(){
    //   this.$emit('change', this.category) 
    // }
  }

}
</script>

<style scoped>
  .cardSession{
    width: 100%;
    background-color: rgb(216, 238, 224);
    margin-bottom: 50px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

  }
  .cardSession .card{
    width: 21%;
    height: 400px;
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