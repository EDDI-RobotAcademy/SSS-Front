<template>
  <v-container class="justify-center">
    <form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
          <div class="d-flex justify-center align-center justify-space-between">
        <div>
          <p class="saladPageName">SelfSalad</p>
        </div>
        <div>
        <router-link :to="{ name: 'IngredientRegisterPage' }">
          <v-btn color="#40513B" style="color:white" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">등록하기</v-btn>
        </router-link>
        </div>
        <div class="categorySession">
          <select v-model="category"  class="form-select" id="selection" @change="changeCategory">
            <option value="VEGETABLE">채소</option>
            <option value="MEAT">육류</option>
            <option value="TOPPING">토핑</option>
          </select>  
        </div>
      </div>
      </v-col>
      <div class="longline"></div>
        <div class="d-flex justify-end">
          <p class="totalCalorie"><span> : {{ totalCalorie }} </span> ( 총 KCAL )</p>
  </div>

      <div style="display: flex; justify-content: center; height: 150px; " class="background-category">{{ category }}</div>
      
      <div class="cardSession">
      <v-col v-if="!ingredients || (Array.isArray(ingredients) && ingredients.length === 0)">
        <p colspan="4">
            현재 등록된 재료가 없습니다!
        </p>
      </v-col>
   
      <div style="min-width: 250px;" v-else v-for="ingredient in ingredients" :key="ingredient.id">
    <ingredient-card :ingredient="ingredient"
                      @change="onChange"
                      :change-value="Number(changeValue)"
                      @click="onDelete" />
  </div>
  </div>
  <div class="line"></div>
  <v-col cols="12">
    <div class="d-flex justify-center align-center justify-space-between">
      <div style="font-size: 24px" class="d-flex align-items-center">
        <div class="d-flex align-items-center">
      <p style="font-size: 30px;">볼에 담긴 재료 <br>{{ names }}</p>
      </div>
  </div>
    <v-col cols="6">
      <div style="text-align: right;">
      <p style="margin:0; font-size: 25px;">내가 만든 샐러드의 가격: {{ totalPrice | comma }}</p>
      <div class="d-flex justify-end">
        <div class="d-flex align-items-center">
        <v-btn class="mr-2" elevation="0" color="#40513B" small @click="qtyDesc">
          <v-icon color="white" size="25">mdi-minus</v-icon>
        </v-btn>
        <div style="font-size: 25px; padding:10px;">{{ quantity }}</div>
        <v-btn class="ml-2" elevation="0" color="#40513B" small @click="qtyInc">
          <v-icon color="white" size="25">mdi-plus</v-icon>
        </v-btn>
      </div>
      </div>
      <p style="margin:0; font-size: 25px;">총 금액: {{ totalPrice* quantity | comma}}</p>
    </div>
  </v-col>
  </div>



  <v-col cols="12">
      <div class="d-flex justify-end" style="margin-top: 20px;">
        <div class="btn-group">
      <v-btn color="#40513B" style="color:white; padding: 10px;" @click="resetAll">
        재료 다시 담기
      </v-btn>
    </div>
    <div class="btn-group">
      <v-btn color="#40513B" style="color:white;" type="submit">바로 주문하기</v-btn>
    </div>
    <div class="btn-group">
      <v-btn color="#40513B" style="color:white;" @click="clickAddCart"><v-icon>mdi-cart-variant</v-icon><span style="color:white;">장바구니</span></v-btn>
    </div>
  </div>
</v-col>
</v-col>
  </v-row>
</form>
</v-container>
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
      // 장바구니에 보내 줄 재료 정보 배열
      selfSaladList: []

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
    onChange( selectPrice, selectCalorie, optionValue, selectedName, ingredientId, amountType ){
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
      let selectedAmount = optionValue

// 재료 배열로 생성
this.selfSaladList.push({ingredientId: ingredientId, selectedAmount: selectedAmount, amountType: amountType});
      console.log(this.selfSaladList)
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
      if(this.totalCalorie !== 0 ){
      const title = window.prompt('저장할 샐러드 명을 입력해주세요. *5자 이하로 입력해주세요')
      const quantity = this.quantity
      const totalCalorie = this.totalCalorie
      const totalPrice = this.totalPrice *this.quantity 
      let selfSaladRequestList = this.selfSaladList // 배열을 복사하여 사용
      console.log(selfSaladRequestList)


      this.$emit('addCart', { title, quantity, totalPrice, totalCalorie, selfSaladRequestList })
      }
    },
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>

<style scoped>
  .background-category{
    font-size: 12rem;
    position: flex;
    font-weight: bolder;
    color:  rgba(240, 242, 237);
    letter-spacing: -15px;
    padding: 0; 
    margin-top: -60px;
    
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
    position: flex;
  }
  #selection{
    width: 150px;
    border: 0.5;
    padding: 2px;
    font-size: 1.5rem;
    letter-spacing: 5px;
    text-align: center;
  }
  #selection:focus{
    outline: none;
    box-shadow: none;
  }
  #selection option{
    background: rgba(250, 250, 250, 0.057);
    font-size: 1.2rem;
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
  }
  .cardSession .card{
    width: 260px;
    height: auto;
    border: none;
    margin-bottom: 75px;
  }

  .longline{
    width: 100%;
    border-bottom: 4px solid #40513B;
    margin-top: -40px;
}
.line{
    width: 100%;
    border-bottom: 4px solid #40513B;
    margin-top: 100px;
}
*{
    color: #40513B;
  }
  .saladPageName{
    font-size: 70px;
    text-align: left;
    color: #40513B;
    
  }
  .btn-group {
  display: flex;
  padding: 10px;
}
.btn-ingroup{
  background-color: #40513B;
}
</style>