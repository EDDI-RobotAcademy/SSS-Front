<template>
  <v-container class="justify-center">
    <form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
          <div class="d-flex justify-center align-center justify-space-between">
        <div>
          <p class="saladPageName">Self Salad</p>
        </div>
        <div>
        <router-link :to="{ name: 'IngredientRegisterPage' }">
          <v-btn color="#40513B" style="width:150px; height:40px; font-size:20px; color:white;" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">재료 등록</v-btn>
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
    <div class="d-flex justify-center">
      <v-col cols="6" style="align-self: start;">
        <v-card class="selectingredientcard">
          <div class="d-flex justify-center">  
            <h4 style="margin-top:15px;">샐러드 재료</h4>
          </div>  
          <div class="cardline"></div>
        <div style="text-align: left; margin-top:20px; margin-left:30px;">
        <h4 v-html="names.join('<br>')"></h4>
      </div>
      </v-card>
      </v-col>
      


      <v-col cols="6" style="margin-top: 30px">           
        <div class="product-info">
          <div class="d-flex justify-end">
          <p class="totalCalorie"><span> : {{ totalCalorie }} </span> ( 1 세트당 KCAL )</p>
  </div>
        <div class="d-flex justify-content-between align-items-center" style="margin-top: 15px">
          <h4>판매가</h4>
          <h4>{{ totalPrice | comma }}원</h4>
        </div>
          <div class="d-flex justify-content-between align-items-center" style="border-radius: 8px; background-color: rgba(246, 242, 232, 0.854); padding: 10px; height: 50px; margin-top: 10px;">
            구매수량
            <div class="d-flex align-items-center">
              <v-btn style="background-color: #739E42;" rounded class="mr-2" elevation="0" small @click="qtyDesc">
                <v-icon size="15" color="white">mdi-minus</v-icon>
              </v-btn>
              <div style="font-size: 25px; padding:10px;">{{ quantity }}</div>
              <v-btn style="background-color: #739E42;" rounded class="ml-2" elevation="0" small @click="qtyInc">
                <v-icon size="15" color="white">mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="row">
            <div class="d-flex justify-content-between align-items-center" style="margin-top: 20px;"  >
              <h4 style="text-align: left">총 합계</h4>
              <h4 style="text-align: right">{{ totalPrice* quantity | comma }}원</h4>
            </div>
          </div>
        </div>
        




        <v-row class="justify-content-center" style="margin-top:20px">
  <v-col class="text-center">       
            <v-btn
            @click="resetAll"
                width="240px"
                x-large style="background-color: rgb(54, 109, 50); color: white;"><v-icon>restart-alt</v-icon><span style="color:white">다시담기</span></v-btn>
          </v-col>  
          <v-col class="text-center"> 
            <v-btn
            @click="clickAddCart"
                width="240px"
                x-large style="background-color: rgb(54, 109, 50); color: white;"><v-icon>mdi-cart-variant</v-icon><span style="color:white">장바구니</span></v-btn>
          </v-col>
        </v-row>  
      </v-col>



   
  </div>

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
      selfSaladList: [],

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
      if(this.$store.state.memberModule.isAuthenticated) {

      if(this.totalCalorie !== 0 ){
      const title = window.prompt('저장할 샐러드 명을 입력해주세요. *5자 이하로 입력해주세요')
      const quantity = this.quantity
      const totalCalorie = this.totalCalorie
      const totalPrice = this.totalPrice *this.quantity 
      let selfSaladRequestList = this.selfSaladList // 배열을 복사하여 사용
      console.log(selfSaladRequestList)


      this.$emit('addCart', { title, quantity, totalPrice, totalCalorie, selfSaladRequestList })
      }
  } else {
        alert("로그인한 사용자만 가능합니다.")
      }
    }
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>

<style scoped>
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
    color: #739E42;
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
    border-bottom: 7px solid #40513B;
    margin-top: 0px;
    margin-bottom: 40px;
}
.line{
    width: 100%;
    border-bottom: 4px solid #40513B;
    margin-top: 100px;
    margin-bottom: 40px;
}
.cardline {
  border-bottom: 4px solid #40513B;
  margin: 10px 10% 0 10%;
  display: flex;
  justify-content: center;
  width: 80%;
}
*{
    color: #40513B;
  }

  .saladPageName{
    font-size: 70px;
    text-align: left;
    font-weight: bold;
    color: #40513B;
    font-family: 'HSBombaram';
    margin-bottom: -39px;
  }
  .btn-group {
  display: flex;
  padding: 10px;
}
.btn-ingroup{
  background-color: #40513B;
}
.selectingredientcard{
  width:400px;
  min-height: 400px;
  background-color: rgba(246, 242, 232, 0.854);
}
@font-face {
    font-family: 'HSBombaram';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>