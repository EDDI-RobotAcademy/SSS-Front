<template>
  <div class="ingredientCard">
    <div class="ingredientInfo">
      <router-link :to="{ name: 'IngredientInfoModifyPage', params: { id: this.ingredient.id.toString() } }">
        재료 정보 수정
      </router-link>
      </router-link>
      <div class="ingredientImage">
        <img :src="require(`../../assets/selfSalad/${ingredient.editedImg}`)"
         />
      </div>
      <div class="ingredientName">{{ ingredient.name }}</div>
      <div class="amountInfo">
        <span>{{ min }}({{convertedAmountType}}) 당 {{ ingredient.price }}원/{{ ingredient.calorie }} KCAL</span>
      </div>
      <div class="backgroundImg">
        <div class="white-box">
          <select id="selection" class="form-select" v-model="selectedAmount" @change="onChange" >
            <option disabled :value="option.value">수량</option>
            <option>0</option>
            <option v-for="number in numbers" :key="number" :value="number">{{ number }} </option>       
          </select>
          <span>({{convertedAmountType}})</span>
        </div>
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
  created() {
    window.addEventListener('beforeunload', this.refreshPage);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.refreshPage);
  },
  mounted() {
    for (let i = this.min; i <= this.max; i += this.unit) {
      this.numbers.push(i)
    }
    // localStorage에서 선택한 값을 가져와 selectedAmount 변수에 할당
    const selectedValue = localStorage.getItem(this.indentifier);
    if (selectedValue) {
      this.selectedAmount = selectedValue;
      this.prevSelectedAmount = selectedValue;
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
  computed: {
  convertedAmountType() {
    if (this.ingredient.amountType === 'GRAM') {
      return this.measure ='g';
    } else if(this.ingredient.amountType === 'COUNT') {
      return '개';
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
    refreshPage(){
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('option')) {
            localStorage.removeItem(key);
          }
        }
    }
  },
}
</script>
<style scoped>
  .ingredientCard, .ingredientInfo, .ingredientImage, .ingredientImage img{
    width: 100%;
    height: auto;
  }
  .ingredientCard{
    border: none;
  }
  .ingredientInfo{
    padding-top: 1.8rem;
    background-color: rgba(246, 242, 232, 0.854);
    /*rgb(133, 173, 83);  rgb(246, 242, 232);*/
    border-bottom-right-radius: 29px;
    border-bottom-left-radius: 29px;
  }
  .ingredientImage{
    padding:0 1rem;
    position: relative;
    
  }
  .ingredientImage img{
    width :100%;
    height: auto;
    border-radius: 100%;
  }
  /**  .ingredientImage:hover::after{
    border-radius: 100%;
    z-index: 999;
    display: inline-block;
    position: absolute;
    content: '이미지 수정';
    top: 0; left:7%;
    width:84%; height: 98%;
    background-color: rgba(1, 1, 1, 0.204);
    text-align: center;
    align-items: center;
  }

      display: inline-block;
    position: absolute;
    content: '이미지 수정';
  */
  .ingredientName::before{
    display: inline-block;
    content: '';
    
    width: 8px; height: 8px;
    margin-bottom: 8px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 0.5rem;
    background-color: rgb(133, 173, 83);
  }

  .ingredientName{
    font-size: 2rem;
    padding: 10px 0;
    text-align: left;
    margin-top: 20px;
    padding:0 1rem;
    letter-spacing: 1px;
  }
  .amountInfo{
    text-align: right;
    font-size: 15px;
    color: rgb(176, 176, 176);
    margin: 10px 0 20px 0;
    padding-right: 1rem;

  }
  .backgroundImg{
    background-image: url("../../assets/selfSalad/vegetableBackground.png");
    background-repeat: none;
    background-position: center;
    background-size:110% 100%;
    padding: 1.8rem 1rem;
    border-bottom-right-radius: 29px;
    border-bottom-left-radius: 29px;
  }
  .white-box{
    width:100%;
    position: relative;
  }
  .white-box span{
    font-size: 14px;
    padding: 0.6rem 0;
    position:absolute;
    right: 28%;
    top: 50%;
    transform: translateY(-50%);
  }

  #selection{   
    width:100%;
    text-align: left;
    color: rgb(90, 90, 90);
    text-indent: 4px;
    border-radius: 0;

  }
  #selection:focus{
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
</style>