<template>
  <form @submit.prevent="onSubmit">
    <table>
      <tr class="background-category">{{ category }}</tr>
      <tr class="categorySession">
        <div class="background-category">{{ category }}</div>
        <select v-model="category"  class="form-select" id="selection" @change="changeCategory">
          <option value="VEGETABLE">채소</option>
          <option value="MEAT">육류</option>
          <option value="TOPPING">토핑</option>
        </select>    
      </tr>
      <div>
        <p>{{ names }}</p>
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
        {{ ingredients }}
          <ingredient-card :ingredient="ingredient"
                            @change="onChange"
                            :change-value="Number(changeValue)"
                            @click="onDelete" />
        </td>
      </tr>
      <div class="d-flex align-items-center">
        <v-btn class="mr-2" elevation="0" color="lightengray" small @click="qtyDesc">
          <v-icon size="15">mdi-minus</v-icon>
        </v-btn>
        <div>{{ quantity }}</div>
        <v-btn class="ml-2" elevation="0" color="lightengray" small @click="qtyInc">
          <v-icon size="15">mdi-plus</v-icon>
        </v-btn>
      </div>
      
      <div>
        <p>장바구니 담길 가격: {{ totalPrice* quantity }}</p>
        <p>최종 가격: {{ totalPrice }}</p>
        <v-btn type="submit" color="blue">바로 주문하기</v-btn>
        <router-link :to="{ name: 'IngredientRegisterPage' }">
          <v-btn color="green" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">등록하기</v-btn>
        </router-link>
        <v-btn @click="clickAddCart"><v-icon>mdi-cart-variant</v-icon><span>장바구니</span></v-btn>
      </div>
    </table>
  </form>
</template>

<script>
import IngredientCard from '@/components/SelfSalad/IngredientCard.vue';
import { mapActions, mapState } from 'vuex'
const memberModule = 'memberModule'


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
      names: [],
      quantity: 1,
    }   
  },
  props: {
    ingredients: {
      type : Array,
      require: true,
    },
  },
  computed: {
    ...mapState(memberModule, [
        'memberInfoAboutSignIn'
      ]),

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
    onChange( selectPrice, selectCalorie, optionValue, selectedName ){
      this.totalPrice += selectPrice
      this.totalCalorie += selectCalorie
      this.changeValue = optionValue

      if(selectedName && optionValue !==0 && !this.names.includes(selectedName) ){
        this.names.push(selectedName);
        console.log("재료명 추가: " + this.names.toString());

      }else if (optionValue == 0) {
        const index = this.names.indexOf(selectedName);
        this.names.splice(index, 1);
        console.log("재료명 삭제: " + this.names.toString());
      }
      
      console.log(selectPrice+": 전달받은 가격")
      console.log(selectCalorie+": 전달받은 칼로리")
      console.log(optionValue+": 전달받은 옵션값" )
      console.log(selectedName+": 재료명" )
    },
    resetAll() {
        this.selectedAmount = 0;
        this.totalCalorie = 0;
        this.totalPrice = 0;
        this.changeValue = -1;
        this.names.splice(0)
      },
    changeCategory(){
      const categoryName = this.category
      this.$emit('change', categoryName)
    },
    onDelete(payload){
      this.$emit("click", payload)
    },
    qtyDesc() {
      if(this.quantity > 1) {
        this.quantity--
      } else {
        this.quantity = 1
      }
    },
    qtyInc() {
      this.quantity++
    },
    clickAddCart() {
      // 장바구니 클릭 이벤트
      const title = window.prompt('저장할 샐러드 명을 입력해주세요. *5자 이하로 입력해주세요')
      const quantity = this.quantity
      const totalCalorie = this.totalCalorie
      const totalPrice = this.totalPrice *this.quantity 


      this.$emit('addCart', {title, quantity, totalCalorie, totalPrice})
    },
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
</style>