<template>
    <div>
      <form @submit.prevent="onSubmit">
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
            <button type="submit">등록</button>
            <router-link :to="{ name: 'IngredientListPage' }">
              취소
            </router-link>
        </div>
      </form>
    </div>
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
            for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('imageFile', this.files[idx])
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

          handleFileUpload () {
            this.files = this.$refs.files.files;
            if (this.files && this.files.length == 1) {
            const reader = new FileReader();
            reader.onload = (event) =>{
              this.thumbnail = event.target.result;
            };
            reader.readAsDataURL(this.files[0]);
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