<template>
    <div>
      <form @submit.prevent="onSubmit">
        <table>
          <tr>
              <td>
                  <label>수정 전 이미지 : </label>
              </td>
              <td class="ingredientImage">
                <img :src="require(`../../assets/selfSalad/${this.ingredientImg.beforeModifyImg}`)"/>
              </td>
          </tr>
          <hr>
          <tr>
            <td>
              <p>수정 후 이미지 : </p>
              <input type="file" id="files" ref="files" multiple @change="handleFileUpload"/>
            </td>
            <td>
              <img v-if="thumbnail" :src="thumbnail" class="thumbnail">
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
      name: "IngredientImgModifyForm",
      data () {
          return {              
              files: '',
              thumbnail: null,
          }
      },
      props: {
        id: {
          type: String,
          required: true,
        },
        ingredientImg: {
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
      }
  }
  
  </script>
  
  <style scoped>
    .thumbnail{
      width: 200px;
      height: auto;
    }
  
  </style>