<template>
  <div class="ingredientCard">
    <v-btn v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">
      <router-link :to="{ name: 'IngredientInfoModifyPage', params: { id: this.ingredient.id.toString() } }">
        재료정보 수정
      </router-link>
    </v-btn>
    <v-btn v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">
      <router-link :to="{ name: 'IngredientAmountModifyPage', params: { id: this.ingredient.id.toString() } }">
        수량/가격 정보 수정
      </router-link>
    </v-btn>  
    <v-btn @click="onDelete" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">삭제</v-btn>
    <div class="ingredientInfo">
      <div class="ingredientImage">
        <img :src="require(`../../assets/selfSalad/${ingredient.editedImg}`)"
         />
      </div>
      <div class="ingredientName">{{ ingredient.name }}</div>
      <div class="amountInfo">
        <span>{{ unit }}({{convertedAmountType}}) 당 {{ ingredient.price }}원/{{ ingredient.calorie }} KCAL</span>
      </div>
      <div class="backgroundImg">
        <div class="white-box">
          <select id="selection" class="form-select" v-model="selectedAmount" @change="onChange">
            <option disabled :value="option.value">수량</option>
            <option>0</option>
            <option v-for="(number, index) in numbers" :key="index" :value="number">{{ number }} </option>       
          </select>
          <span>({{convertedAmountType}})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const memberModule = 'memberModule'


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
      number: '',
      prevSelectedAmount: 0,

      selectedAmount: -1,
      option: {
        value: -1,
      }, 
      indentifier : 'option'+this.ingredient.id,
      selectedName : 'default',
      prevIndex : 0,
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
    for (let i = this.unit; i <= this.max; i += this.unit) {
      this.numbers.push(i)
    }
    // localStorage에서 선택한 값을 가져와 selectedAmount 변수에 할당
    const selectedValue = localStorage.getItem(this.indentifier);
    if (selectedValue) {
      this.selectedAmount = selectedValue;
      this.prevSelectedAmount = selectedValue;

      // 카테고리 변경전 option의 index
      const selectedIndex = this.numbers.findIndex(number => number === parseInt(this.selectedAmount))+1
      console.log("이미 선택된 인덱스?: "+selectedIndex )
      this.prevIndex = selectedIndex
    }
  },
  watch: {
    changeValue(newVal) {
      if ( newVal === -1) {
        this.selectedAmount = -1
        this.prevSelectedAmount = 0
        this.prevIndex = this.numbers.findIndex(number => number === parseInt(this.selectedAmount))+1
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
    ...mapState(memberModule, [
        'memberInfoAboutSignIn'
      ]),
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
       const index = (event.target.selectedIndex -1) // option 순서
       console.log("선택한 인덱스 :"+ index);

       const calorie = index * this.calorie
       const price = index * this.price
       console.log("선택 칼로리 : " + calorie +" // 선택 가격 : " + price)
    
       let prevPrice = this.prevIndex * this.price
       let prevCalorie = this.prevIndex * this.calorie
       console.log("이전 인덱스 :"+ this.prevIndex)
       console.log("이전선택 칼로리 : " + prevCalorie +" // 이전선택 가격 : " + prevPrice)

      const priceChange = price - prevPrice
      const calorieChange = calorie - prevCalorie
      const optionValue = this.selectedAmount
      const ingredientId = this.ingredient.id
      const amountType = this.ingredient.amountType


      this.selectedName = this.ingredient.name;
      this.$emit('change', priceChange, calorieChange, optionValue, this.selectedName, ingredientId, amountType)
      
      this.prevIndex = index
      
    },
    refreshPage(){
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('option')) {
            localStorage.removeItem(key);
          }
        }
    },
    onDelete () {
        const ingredientId = this.ingredient.id
        this.$emit("click", ingredientId)
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
  a{
    text-decoration: none;
  }
</style>