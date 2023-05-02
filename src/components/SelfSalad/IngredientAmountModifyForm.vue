<template>
    <form @submit.prevent="onSubmit">
      <v-col>

      <div class="ingredientInfo">
        <h2>재료 정보</h2>
      <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">가격</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="ingredientAmount.price" 
                    id="inputGroup-sizing-lg">
                  </div>
           <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">칼로리</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="ingredientAmount.calorie" 
                    id="inputGroup-sizing-lg">
                  </div>


                </div>
       
                <div class="line"/>

            <h2>수량 정보</h2>
   
            <div class="ingredientInfo">
              
              <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">수량 단위</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="ingredientAmount.unit"
                    id="inputGroup-sizing-lg">

                    <div>
      <!-- 옵션 설정 -->
      <select class="form-select" style="height: 51px;" v-model="ingredientAmount.amountType">
        
        <option value="GRAM"
        :class="{ 'selected': ingredientAmount.amountType === 'GRAM' }"
        >g
        </option>
        <option value="COUNT"
        :class="{ 'selected': ingredientAmount.amountType === 'COUNT' }"
        >개</option>


      </select>
    </div>
       </div>

              <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">최대 수량</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="ingredientAmount.max" 
                    id="inputGroup-sizing-lg">
                  </div>


                </div>


              </v-col>


      <div class="d-flex justify-content-center" style="margin-top: 50px">
        <v-btn style="background-color: rgb(54, 109, 50); color:white; width: 150px;" type="submit">등록</v-btn>
        <router-link :to="{ name: 'IngredientListPage' }">
          <v-btn style="background-color: red; color:white; width: 150px;">취소</v-btn>
        </router-link>
      </div>
    </form>
  </template>
  
  <script>
  export default {
      name: "IngredientAmountModifyForm",
      props: {
        ingredientAmount: {
            type: Object,
            required: true,
        },
      },
      methods: {
          onSubmit () {
            const amountType = this.ingredientAmount.amountType;
            const max = this.ingredientAmount.max;
            const unit = this.ingredientAmount.unit;
            const price = this.ingredientAmount.price;
            const calorie = this.ingredientAmount.calorie;
            this.$emit('submit', { amountType, max, unit, price, calorie } )
          },
      }
  }
  
  </script>
  
  <style scoped>
  .ingredientSetting{
    display: flex;
    align-items: center;
  }


  h2 {
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight:bold;

}

  
  *{
    /* color: #40513B; */
    color: #40513B;
  }
  .line {
  width: 100%;
  border-bottom: 4px solid #40513B;
  margin-top: 30px;
  width: 500px;
}

.ingredientInfo {
  margin-top: 20px;
  margin-left: -13px;
  margin-bottom: 40px; 
  width: 500px;
}
.input-group-text{
  background-color:#739E42;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
}
  </style>