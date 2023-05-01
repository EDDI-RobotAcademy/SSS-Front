<template>
  <v-container>
      <form @submit.prevent="onSubmit">
        <v-row>

        <v-col cols="6" class="d-flex flex-column justify-content-center" style="min-width: 500px;">
    <div class="d-flex justify-content-center">
      <v-col v-for="(url, index) in imageUrls" :key="index" cols="6">
        <div class="d-flex justify-content-center">
        <img style="width: 500px;" :src="url" :alt="'Image ' + index" aspect-ratio="1"></img>
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

            <div class="input-group input-group-lg" style="width: 400px; margin: 10px;">
                    <span style="width: 150px; display: inline-block; text-align: center; font-weight: bold; font-size: 23px;" class="input-group-text" id="inputGroup-sizing-lg">재료명</span>
                    <input type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-lg" 
                    v-model="name" 
                    id="inputGroup-sizing-lg">
            </div>


        <table>
          <tr>
              <div>
                <label>재료명 : </label>
                <input type="text" v-model="ingredientInfo.name"/>
              </div>
          </tr>
          <hr>
          <tr>
            <td>
              <div id="flex-box">
                <p>카테고리</p>
                <div>
                  <input type="radio" v-model="ingredientInfo.categoryType" name="radioBtn" value="VEGETABLE"                  
                  :checked="ingredientInfo.categoryType === 'VEGETABLE'"
                >
                  <label for="r1">채소</label>
                </div>
                <div>
                  <input type="radio" v-model="ingredientInfo.categoryType" name="radioBtn" value="MEAT"
                  :class="{ 'selected': ingredientInfo.categoryType === 'MEAT' }"
                  >
                  <label for="r2">육류</label>
                </div>
                <div>
                  <input type="radio" v-model="ingredientInfo.categoryType" name="radioBtn" value="TOPPING"
                   :class="{ 'selected': ingredientInfo.categoryType === 'TOPPING' }"
                  >
                  <label for="r3">토핑</label>
                </div>
              </div>
            </td>
          </tr>
          <hr>
          <tr>
            <td class="ingredientImage">
              <p>수정 전 이미지 : </p>
              <img :src="require(`../../assets/selfSalad/${this.ingredientInfo.editedImg}`)"/>
            </td>
            <td>
              <p>수정 후 이미지 : </p>
              <img v-if="thumbnail" :src="thumbnail" class="thumbnail">
              <input type="file" id="files" ref="files" multiple @change="handleFileUpload"/>
            </td>
          </tr>
        </table>
        <div>
            <v-btn type="submit" color="blue">등록</v-btn>
            <router-link :to="{ name: 'IngredientListPage' }">
              <v-btn color="red">취소</v-btn>
            </router-link>
        </div>
        
      </v-row>
    </form>
  </v-container>
  </template>
  
  <script>
  
  export default {
      name: "IngredientInfoModifyPage",
      data () {
          return {   
            name: '',
            categoryType : '',           
            files: '',
            thumbnail: null,
          }
      },
      props: {
        ingredientInfo: {
          type : Object,
          required: true,
        }
      },
      methods: {
        onSubmit () {
            let formData = new FormData()
            if(this.files.length ===1){
              formData.append('imageFile', this.files[0])
            }else if(this.files.length === 0){
              formData.append('imageFile', new File([], 'empty'));
            }
            console.log('imageFile: '+ JSON.stringify(formData))

            const categoryType = this.ingredientInfo.categoryType
            const name = this.ingredientInfo.name
            console.log("재료명 : "+name)
            console.log("카테고리 : "+categoryType)
            
            let ingredientInfo = { name, categoryType }
            formData.append(
                "ingredientInfo",
                new Blob([JSON.stringify(ingredientInfo)], { type: "application/json" })
            )
            console.log('formData: ' + JSON.stringify(formData))

            this.$emit('submit', formData)
          },

          handleFileUpload (event) {
            this.files = this.$refs.files.files;
            if (this.files && this.files.length == 1) {
            const reader = new FileReader();
            reader.onload = (event) =>{
              this.thumbnail = event.target.result;
            };
            reader.readAsDataURL(this.files[0]);
          }else if(this.files.length >1){
            alert('이미지를 1개만 선택해주세요.')
            event.target.value=''
            return

          }
        },
      },
      
  }
  
  </script>
  
  <style scoped>
    .thumbnail{
      width: 200px;
      height: auto;
    }
    hr, tr, table, form{
      width: 100%;
    }
  
  </style>