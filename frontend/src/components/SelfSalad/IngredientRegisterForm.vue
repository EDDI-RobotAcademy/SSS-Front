<template>
    <form @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>
            <h3>카테고리</h3>
            <hr>
            <div id="flex-box">
              <div>
                <input type="radio" v-model="category" name="radioBtn" value="채소">
                <label for="r1">채소</label>
              </div>
              <div>
                <input type="radio" v-model="category" name="radioBtn" value="육류">
                <label for="r2">육류</label>
              </div>
              <div>
                <input type="radio" v-model="category" name="radioBtn" value="토핑">
                <label for="r3">토핑</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <h3>관련 정보</h3>
            <hr>
            <div id="flex-box">
              <div>
                <label>재료명</label>
                <input type="text" v-model="name"/>
              </div>
              <div>
                <label>가격<p>최소 단위당 가격</p></label>             
                <input type="text" value="put price" v-model="price"/>
              </div>
              <div>
                <label>칼로리<p>최소 단위당 가격</p></label>             
                <input type="text" value="put calaory" v-model="calorie"/>KCAL
              </div>
                <label>재료 이미지</label>
                <input type="file" id="files" ref="files" multiple @change="handleFileUpload"/>
              </div>
          </td>
        </tr>
        <tr>
          <td>
            <h3>단위</h3>
            <hr>
            <div id="flex-box">
              <div>
                <label>최대수량</label>
                <input type="text" v-model="max" value="put max"/>
              </div>
              <div>
                <label>최소수량</label>             
                <input type="text" v-model="min" value="put min"/>
              </div>
              <div>
                <label>수량 단위</label>             
                <input type="text" v-model="unit" value="put unit"/>
              </div>
              <div>
                <label>측정 단위</label>
                <select v-model="measure">
                  <option selected>g</option>
                  <option>개</option>
                </select>
              </div>
            </div>
          </td>
        </tr>  
      </table>
  
      <div>
        <button type="submit">등록</button>
        <router-link :to="{ name: 'IngredientListPage' }">
          취소
        </router-link>
      </div>
    </form>
  </template>
  
  <script>
  
  export default {
      name: "IngredientRegisterForm",
      data () {
          return {
              name: 'put name',
              category: '',
              measure: 'g',
              max: '10',
              min: '1',
              unit: '2',
              price:'2000',
              calorie:'10', 
              files: '',  
          }
      },
      methods: {
          onSubmit () {
            let formData = new FormData()
            for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('imageFile', this.files[idx])
            }
            console.log('imageFile: '+ this.imageFile)

            const { name, category, measure, max, min, unit, price, calorie } = this
            let ingredientInfo = {
                name: name,
                category: category,
                measure: measure,
                max: max,
                min: min,
                unit: unit,
                price: price,
                calorie: calorie
            }
            console.log('ingredientInfo : '+ JSON.stringify(ingredientInfo))
            formData.append(
                "ingredientInfo",
                new Blob([JSON.stringify(ingredientInfo)], { type: "application/json" })
            )
            console.log('formData: ' + JSON.stringify(formData))
            this.$emit('submit', formData)
          },
          handleFileUpload () {
            this.files = this.$refs.files.files
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