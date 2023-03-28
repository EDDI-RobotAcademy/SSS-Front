<template>
  <div class="ingredientCard">
    <div class="ingredientInfo">
      <div class="ingredientImage">
        <img :src="
            require(`../../assets/selfSalad/${ingredient.ingredientImage.randomName}`)"
        />
      </div>
      <p class="ingredientName">{{ ingredient.name }}</p>
      <div>
        <select id="selection" >
          <option select>0 {{measure}}</option>
          <option v-for="number in numbers" :key="number">{{ number }}  {{measure}} </option>       
        </select>
        <p style="display:inline-block">{{ this.ingredient.amount.calorie }} KCAL </p>
        <p style="display:inline-block">가격 : {{ this.ingredient.amount.price }}원</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientCard",
  data(){
    return {
      max : this.ingredient.amount.max,
      min : this.ingredient.amount.min,
      unit : this.ingredient.amount.unit,
      measure : this.ingredient.amount.amountType,
      numbers: []
    }
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    for (let i = this.min; i <= this.max; i += this.unit) {
      this.numbers.push(i)
    }


  },
  methods: {
    increment () {
      ingredient.amount.max
      this.min += unit
    },
    changeToNumber(){
      // 최소 수량 = min , n 씩 증가 = increase , n번 반복문 = repeat
      this.increase = ingredient.amount.max/ingredient.amount.unit;
      this.min = ingredient.amount.min;
    }
  // checkAmount() {
  //   // 옵션의 값을 emit 하기
  //   //this.$emit;
  // },
  }
}


</script>
<style scoped>
  .ingredientCard, .ingredientImage, .ingredientImage img{
    width: 100%;
  }
  .ingredientImage img{
    width :100%;
    height: 250px;
  }

  .ingredientName{
    font-size: 25px;
    padding: 10px 0;
    text-align: center;
    margin-top: 30px;
    background-color: rgb(193, 218, 218);
  }
  #selection{
    width: 20%;
    text-align: center;
    background-color : rgb(211, 200, 200);
  }
  #selection:focus{
    outline: none;
  }
</style>