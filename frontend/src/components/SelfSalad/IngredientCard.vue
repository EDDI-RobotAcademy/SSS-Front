<template>
  <div class="ingredientCard">
    <div class="ingredientInfo">
      <div class="ingredientImage">
        <p>{{ingredient.editedName}}</p>
        <!-- <img :src="
            require(`../../assets/selfSalad/${ingredient.editedImg}`)"
        /> -->
      </div>
      <p class="ingredientName">{{ ingredient.name }}</p>
      <div>
        <select id="selection" v-model="selectedAmount" @change="onChange" >
          <option disabled :value="option.value">선택해라</option>
          <option>0</option>
          <option v-for="number in numbers" :key="number" :value="number">{{ number }} </option>       
        </select>{{amountType}}
      </div>
      <div class="amountInfo">
        <span>{{ min }}({{amountType}}) 당 {{ ingredient.price }}원/{{ ingredient.calorie }} KCAL</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "IngredientCard",
  data(){
    return {
      max : Number(this.ingredient.max),
      min : Number(this.ingredient.min),
      unit : Number(this.ingredient.unit),
      price : Number(this.ingredient.price),
      calorie : Number(this.ingredient.calorie),

      amountType : this.ingredient.amountType,

      numbers: [],
      prevSelectedAmount: 0,

      selectedAmount: -1,
      option: {
        value: -1,
      }, 
      indentifier : 'option'+this.ingredient.id,     
    }
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    changeValue: {
      type: Number,
      default: 0,
    }

  },
  mounted() {
    for (let i = this.min; i <= this.max; i += this.unit) {
      this.numbers.push(i)
    }
    // localStorage에서 선택한 값을 가져와 selectedAmount 변수에 할당
    const selectedValue = localStorage.getItem(this.indentifier);
    if (selectedValue) {
      this.selectedAmount = selectedValue;
    }
  },
  watch: {
    changeValue(newVal) {
      if ( newVal === -1) {
        this.selectedAmount = -1
        this.prevSelectedAmount = 0
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('option')) {
            localStorage.removeItem(key);
          }
        }
      }
    },
  },
  methods: {
    onChange(event){
      // 재료 수량을 다시 선택했을 때 이전의 선택된 수량, 칼로리를 뺀 후에 다시 전달하기
       // 선택한 값을 localStorage에 저장
       if(this.selectedAmount !== 0){
       localStorage.setItem(this.indentifier, this.selectedAmount);
       }
      this.selectedAmount = Number(event.target.value);

      const priceDiff = this.price * (this.selectedAmount - this.prevSelectedAmount);
      const calorieDiff = this.calorie * (this.selectedAmount - this.prevSelectedAmount);
      const optionValue = this.selectedAmount

      this.prevSelectedAmount = this.selectedAmount;

      this.$emit('change', priceDiff, calorieDiff, optionValue)
    },
  },
  
  
  

}

</script>
<style scoped>
  .ingredientCard, .ingredientImage, .ingredientImage img{
    width: 100%;
  }
  .ingredientImage img{
    width :100%;
    height: 200px;
  }

  .ingredientName{
    font-size: 25px;
    padding: 10px 0;
    text-align: center;
    margin-top: 30px;
    background-color: rgb(193, 218, 218);
  }
  .amountInfo{
    text-align: right;
    font-size: 12px;
    color: rgb(125, 125, 131);

  }
  #selection{
    width: 30%;
    text-align: center;
    background-color : rgb(211, 200, 200);
  }
  #selection:focus{
    outline: none;
  }
</style>