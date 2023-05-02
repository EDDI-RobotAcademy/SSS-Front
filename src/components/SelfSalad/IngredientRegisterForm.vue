<template>
  <v-container>
    <v-row>
      <form @submit.prevent="onSubmit">
   
        
      <v-row>
        <v-col cols="6" class="d-flex flex-column justify-content-center" style="min-width: 500px;">
    <div class="d-flex justify-content-center">
      <v-col v-for="(url, index) in imageUrls" :key="index" cols="6">
        <div class="d-flex justify-content-center">
        <img style="width: 500px;" :src="url" :alt="'Image ' + index" aspect-ratio="1"/>
      </div>
      </v-col>
    </div>
    <div class="d-flex justify-content-center">
      <v-col cols="12">
        <div class="d-flex justify-content-center">
        <div class="input-group mb-3" style="width: 70%;">
          <input type="file" class="form-control" id="inputGroupFile01" ref="files" multiple @change="handleFileUpload" aria-describedby="inputGroupFileAddon01">
        </div>
      </div>
      </v-col>

    </div>
  </v-col>
   

      <v-col cols="6" class="justify-end" >


            <h2>재료 유형</h2>
   
            <div id="categoryButton">
              <v-btn class="categoryButton"
              :class="{ active: category === 'VEGETABLE' }"
              @click.prevent="category = 'VEGETABLE'">채소</v-btn>
            <v-btn class="categoryButton"
              :class="{ active: category === 'MEAT' }"
              @click.prevent="category = 'MEAT'">육류</v-btn>
            <v-btn class="categoryButton"
              :class="{ active: category === 'TOPPING' }"
              @click.prevent="category = 'TOPPING'">토핑</v-btn>
            </div>
            <div class="line"/>

            <h2>재료 정보</h2>
           
            <div class="ingredientInfo">
                  <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">재료명</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="name" 
                    id="inputGroup-sizing-lg">
                  </div>
              <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">가격</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="price" 
                    id="inputGroup-sizing-lg">
                  </div>
           <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">칼로리</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="calorie" 
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
                    v-model="unit" 
                    id="inputGroup-sizing-lg">

                    <div>
      <!-- 옵션 설정 -->
      <select class="form-select" style="height: 51px;" v-model="measure">
        <option selected value="GRAM">g</option>
        <option value="COUNT">개</option>
      </select>
    </div>
                  </div>

              <div class="input-group mb-3" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 20px;" class="input-group-text" id="inputGroup-sizing-default">최대 수량</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" 
                    v-model="max" 
                    id="inputGroup-sizing-lg">
                  </div>


                </div>
            </v-col>


        </v-row>

      <div class="d-flex justify-content-center" style="margin-top: 50px">
        <v-btn style="background-color: rgb(54, 109, 50); color:white; width: 150px;" type="submit">등록</v-btn>
        <router-link :to="{ name: 'IngredientListPage' }">
          <v-btn style="background-color: red; color:white; width: 150px;">취소</v-btn>
        </router-link>
      </div>
    </form>
  </v-row>
  </v-container>
  </template>
  
  <script>
  
  export default {
      name: "IngredientRegisterForm",
      data () {
          return {
              name: '',
              category: 'VEGETABLE',
              measure: 'GRAM',
              max: '1',
              unit: '1',
              price:'1',
              calorie:'1', 
              files: '',  
              imageUrls: [],
          }
      },
      methods: {
          onSubmit () {
            let formData = new FormData()
            for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('imageFile', this.files[idx])
            }
            console.log('imageFile: '+ this.files)

            const { name, category, measure, max, unit, price, calorie } = this
            let ingredientInfo = {
                name: name,
                category: category,
                measure: measure,
                max: max,
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
            this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
        },
      }
  }
  
  </script>
  
  <style scoped>
  
  #categoryButton .categoryButton{
    background-color: #3a5719;
      border-radius: 5px;
      color: lightgray;
      text-align: center;
      font-size: 23px;
      margin:5px;
      width: 30%;
      height: 50px;
      font-weight: bold;
  }
  #categoryButton .categoryButton.active{
    background-color: #739E42;
      color: white;
  }
  

  .ingredientSetting{
    display: flex;
    align-items: center;
  }

h2{
  margin-top:80px;
  font-weight: bold;
}

  
  *{
    /* color: #40513B; */
    color: #40513B;
  }
.ingredientSelectButton{
  width: 200px;
}

  .line{
    width: 100%;
    border-bottom: 2px solid #40513B;
    margin-top: 40px;
}

.input-group-text{
  background-color:#739E42;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
}
.ingredientInfo {
  margin-top: 20px;
  margin-left: -13px;
  
}
  </style>