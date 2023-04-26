<template>
  <form @submit.prevent="onSubmit">
    <div>
      <div class="selfSalad">My SelfSalad : <span>{{ this.saladTitle }}</span></div>
      <div class="price"><span>{{ totalPrice }} </span>(총가격) </div>
      <div class="calorie"><span>{{ totalCalorie }} </span>(총 Kcal)</div>
      <p class="name">
        <span id="ingredientName">재료명 : </span>
        <span class="nameList" v-for="(name, index) in names" :key="index">{{ name }} , </span>
      </p>
    </div>
    <v-data-table
    :headers="headers"
    :items="selfSalad"
    fixed-header
    height="auto"
  >
    <template #item="{ item }">
      <tr :key="item.ingredientId">
        <td class="header">{{ item.name }}</td>
        <td class="header">{{ item.price }}</td>
        <td class="header">{{ item.calorie }}</td>
        <td>
          <select v-model="item.selectedAmount"
          :data-ingredientId="item.ingredientId"
          @change="onChange($event, item)">
            <option value="0">0</option>
            <option v-for="(unit,index) in Math.floor(item.max / item.unit) + 1" :key="unit" :value="unit * item.unit"
              v-if="unit * item.unit <= item.max"
            >
              {{ unit * item.unit }}  {{ item.amountType === 'GRAM' ? 'g' : item.amountType === 'COUNT' ? '개' : '' }}
            </option> 
          </select>
        </td>
      </tr>
    </template>   
    </v-data-table>
    <div>
      <v-btn class="submitBtn btn" type="submit" color="green">수정 완료</v-btn>
      <v-btn class="closeBtn btn" @click="$emit('close')"> 닫기 </v-btn>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const memberModule = 'memberModule'
const selfSaladModule = 'selfSaladModule'
const ordercartModule = 'ordercartModule'

  export default {
    name: "SelfSaladModifyCartPage",
    props: {
      cartItemId: {
        type: Number,
        require: true,
      },
      saladTitle: {
        type: String,
        require: true,
      }   
    },
    data(){
      return {
          headers: [
          { text: 'Name', value: 'name' },
          { text: 'Price', value: 'price' },
          { text: 'Calorie', value: 'calorie' },
          { text: 'Amount', value: 'selectedAmount' },
        ],
        totalPrice: 0,
        totalCalorie: 0,
        selectedAmount: 0,
        
        changeValue : 0,
        names: [],
        // 장바구니에 보내 줄 재료 정보 배열
        selfSaladList: [],
        option: {
          value: -1,
        },
        priceList:[],
        calorieList: [],
      }   
    },
    computed: {
      ...mapState(ordercartModule, [
        'selfSalad'
      ]),
      ...mapState(memberModule, [
      'memberInfoAboutSignIn'
      ]),  
    },
    watch: {
      selfSalad(newVal, oldVal) {
      this.names = newVal.map(ingredient => ingredient.name);

      this.selfSaladList = newVal.map(ingredient => ({
        ingredientId: ingredient.ingredientId,
        selectedAmount: ingredient.selectedAmount }))

      this.priceList = newVal.map(ingredient => ({
        ingredientId: ingredient.ingredientId,
        price: ingredient.price * (ingredient.selectedAmount/ingredient.unit)
      }))
      // 수정 전 장바구니 담았을 때 샐러드의 가격
      this.totalPrice = this.priceList.reduce((total, { price }) => total + price, 0);  

      this.calorieList = newVal.map(ingredient => ({
        ingredientId: ingredient.ingredientId,
        calorie: ingredient.calorie * (ingredient.selectedAmount/ingredient.unit)
      }))
      // 수정 전 장바구니 담았을 때 샐러드의 가격
      this.totalCalorie = this.calorieList.reduce((total, { calorie }) => total + calorie, 0);  
      }
    },
    // default로 spring에서 가져올 ingredients mount하기
    mounted () {
        this.requestIngredientListToSpring()
    },         
    methods: {
      ...mapActions(selfSaladModule, [
        'requestIngredientListToSpring',
      ]),
      ...mapActions(ordercartModule, [ 
        'requestSelfSaladCartModifyToSpring'
      ]),
      onChange(event, item) {
        const ingredientId = item.ingredientId;
        const name = item.name;
        const price = item.price;
        const calorie = item.calorie;
        const optionIndex = event.target.selectedIndex // option 순서
        const updateAmount = parseInt(event.target.value);

        // 선택한 값 0 이후에 배열에 push (이름, 반환list)
        if(!this.names.includes(name) ){
          this.names.push(name);
          console.log("재료명 추가: " + this.names.toString());

          this.selfSaladList.push({
          ingredientId: ingredientId,
          selectedAmount: updateAmount})
          console.log("반환 배열 추가: " + ingredientId + "번 : "+ updateAmount);

        }else if (optionIndex == 0) {
          const index = this.names.indexOf(name);
          this.names.splice(index, 1);
          console.log("재료명 삭제: " + this.names.toString());
        }

        // 반환 배열 수량 변경 및 삭제 : selfSaladList
        const respListIndex = this.selfSaladList.findIndex((item) => item.ingredientId === ingredientId);
        const priceListIndex = this.priceList.findIndex((item) => item.ingredientId === ingredientId);
        const calorieListIndex = this.calorieList.findIndex((item) => item.ingredientId === ingredientId);

        // 수량, 가격, 칼로리 변경
        if (respListIndex !== -1) {
          const selectedIngredient = this.selfSaladList[respListIndex];
          this.$set(selectedIngredient, 'selectedAmount', updateAmount);
          console.log("반환될 변경된 수량 : "+selectedIngredient.selectedAmount);

          const selectedPrice = this.priceList[priceListIndex]
          this.$set(selectedPrice, 'price', (optionIndex * price));
          console.log("반환될 변경된 가격 : "+selectedPrice.price);

          const selectedCalorie = this.calorieList[calorieListIndex]
          this.$set(selectedCalorie, 'calorie', (optionIndex * calorie));
          console.log("반환될 변경된 칼로리 : "+selectedCalorie.calorie);

          // 만약 0 선택시 배열에서 삭제
          const index = this.selfSaladList.indexOf(selectedIngredient);
          if (index > -1 && selectedIngredient.selectedAmount === 0) {
            this.selfSaladList.splice(index, 1);
            console.log("해당 객체가 삭제되었습니다.");
          }
        }
        this.totalPrice = this.priceList.reduce((acc, cur) => acc + cur.price, 0);
        this.totalCalorie = this.calorieList.reduce((acc, cur) => acc + cur.calorie, 0);
      },
    },
}

</script>

<style scoped>
v-container{
  width: 110%;
  z-index: 9999;
}
form{
  background-color: rgb(255, 255, 255);
  padding: 30px 50px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Style the table */
table {
  border-collapse: collapse;
  width: 100%;
}
td{
  background-color:#dddddd45;
  padding: 0.5rem;
  
}

/* Style the buttons */
.submitBtn {
  border: none;
  color: #fff;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 0.5rem;
  cursor: pointer;
}


/* Style the total price, calorie, and name elements */
.selfSalad, .price{
  display:inline-block;
  width: 50%;

}
.price, .calorie, .nameList {
  margin-bottom: 0.3rem;
  text-align: right;
}

.selfSalad{
  font-size: 1.5rem;
  color:rgb(159, 155, 155)
}
.name .nameList{
  color: green;

}
.price span, .calorie span, .selfSalad span{
  font-weight:bold;
  font-size: 1.8rem;
  color: green;
}

select{
  width: 50%;
  text-indent: 10px;
  border-bottom: 1px solid black;
  cursor:pointer;
}
select :hover{
  cursor:pointer;
}



</style>