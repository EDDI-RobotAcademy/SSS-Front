<template>
    <form @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>
            <h3>가격/칼로리</h3>
            <hr>
            <div id="flex-box">
              <div>
                <label>가격<p>최소 단위당 가격</p></label>             
                <input type="text" v-model="ingredientAmount.price"/>
              </div>
              <div>
                <label>칼로리<p>최소 단위당 가격</p></label>             
                <input type="text" v-model="ingredientAmount.calorie"/>KCAL
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <h3>수량</h3>
            <hr>
            <div id="flex-box">
              <div>
                <label>최대수량</label>
                <input type="text" v-model="ingredientAmount.max"/>
              </div>
              <div>
                <label>수량 단위</label>             
                <input type="text" v-model="ingredientAmount.unit"/>
              </div>
              <div>
                <label>측정 단위</label>
                <select v-model="ingredientAmount.amountType">
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
          </td>
        </tr>  
      </table>
  
      <div>
        <v-btn type="submit" color="blue">등록</v-btn>
        <router-link :to="{
          name: 'IngredientListPage',
        }">
          <v-btn color="red">취소</v-btn>
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
  
  <style >
  hr{
    width: 100%;
  }
  #flex-box{
    display:flex;
    justify-content: space-between;

  }
  
  </style>