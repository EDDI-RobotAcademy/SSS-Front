<template>
  <form @submit.prevent="onSubmit">
    <table>
      <!-- <tr class="background-category">{{ category }}</tr> -->
      <tr class="categorySession">
        <div class="background-category">{{ category }}</div>
        <select v-model="category"  class="form-select" id="selection" @change="changeCategory">
          <option value="VEGETABLE" selected>채소</option>
          <option value="MEAT">육류</option>
          <option value="TOPPING">토핑</option>
        </select>    
      </tr>
      <div>
        <p class="totalCalorie"><span> : {{ totalCalorie }} </span> ( 총 KCAL )</p>
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
        <p>최종 가격: {{ totalPrice }}</p>
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
      category: 'VEGETABLE',
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
  computed: {
  convertedCategoryType() {
    if (this.category === 'VEGETABLE') {
      return '채소';
    } else if(this.category === 'MEAT') {
      return '육류';
    }else if(this.category === 'TOPPING') {
      return '토핑';
    }
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
  .background-category{
    font-size: 13rem;
    position: absolute;
    left: -20px;
    top: -20px;
    font-weight: bolder;
    color:  rgba(240, 242, 237);
    letter-spacing: -15px;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  table{
    width: 100%;
  }
  .categorySession{
    width: 100%
  }
  #selection{
    margin-top: 150px;
    width: 100%;
    border: none;
    border-bottom: 2px solid black;
    border-radius: 0;
    cursor: pointer;
    padding: 1.5rem 0 0 0;
    position: relative;
    font-size: 3rem;
    letter-spacing: 4px;
    background-color: transparent;
    -webkit-appearance: none;
    box-shadow: none;
  }
  #selection:focus{
    outline: none;
    box-shadow: none;
  }
  #selection option{
    background: rgba(250, 250, 250, 0.057);
    font-size: 1.2rem;
    padding-left: 0.3rem;
  }
  .totalCalorie span{
    color: rgb(133, 173, 83);
    font-size: 3rem;
    font-weight: bold;
  }
  .totalCalorie{
    font-size: 17px;
    text-align: right;
    margin-top: 20px;    
  }
  
  .cardSession{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .cardSession .card{
    width: 260px;
    height: auto;
    border: none;
    margin-bottom: 75px;
  }
  <template>
  <form @submit.prevent="onSubmit">
    <table>
      <!-- <tr class="background-category">{{ category }}</tr> -->
      <tr class="categorySession">
        <div class="background-category">{{ category }}</div>
        <select v-model="category"  class="form-select" id="selection" @change="changeCategory">
          <option value="VEGETABLE" selected>채소</option>
          <option value="MEAT">육류</option>
          <option value="TOPPING">토핑</option>
        </select>    
      </tr>
      <div>
        <p class="totalCalorie"><span> : {{ totalCalorie }} </span> ( 총 KCAL )</p>
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
        <p>최종 가격: {{ totalPrice }}</p>
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
      category: 'VEGETABLE',
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
  computed: {
  convertedCategoryType() {
    if (this.category === 'VEGETABLE') {
      return '채소';
    } else if(this.category === 'MEAT') {
      return '육류';
    }else if(this.category === 'TOPPING') {
      return '토핑';
    }
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
  .background-category{
    font-size: 13rem;
    position: absolute;
    left: -20px;
    top: -20px;
    font-weight: bolder;
    color:  rgba(240, 242, 237);
    letter-spacing: -15px;

    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  table{
    width: 100%;
  }
  .categorySession{
    width: 100%
  }
  #selection{
    margin-top: 150px;
    width: 100%;
    border: none;
    border-bottom: 2px solid black;
    border-radius: 0;
    cursor: pointer;
    padding: 1.5rem 0 0 0;
    position: relative;
    font-size: 3rem;
    letter-spacing: 4px;
    background-color: transparent;
    -webkit-appearance: none;
    box-shadow: none;
  }
  #selection:focus{
    outline: none;
    box-shadow: none;
  }
  #selection option{
    background: rgba(250, 250, 250, 0.057);
    font-size: 1.2rem;
    padding-left: 0.3rem;
  }
  .totalCalorie span{
    color: rgb(133, 173, 83);
    font-size: 3rem;
    font-weight: bold;
  }
  .totalCalorie{
    font-size: 17px;
    text-align: right;
    margin-top: 20px;    
  }
  
  .cardSession{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .cardSession .card{
    width: 260px;
    height: auto;
    border: none;
    margin-bottom: 75px;
  }
  </
