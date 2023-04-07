<template>
    <v-container>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <v-row>
            <v-col cols="6">
          <table>
              <tr>
                  <td>제품명</td>
                  <td>
                      <input type="text" v-model="title"/>
                  </td>
              </tr>
              <tr>
                  <td>가격</td>
                  <td>
                      <input type="int" v-model="price"/>
                  </td>
              </tr>
              <tr>
                  <td>상세정보</td>
                  <td>
                      <textarea cols="30" rows="10" v-model="content"/>
                  </td>
              </tr>
              <tr>
                <td>상품 사진</td>
                <td>
                    <input type="file" id="files" ref="files" multiple @change="handleFileUpload"/>
                </td>
            </tr>
          </table>
          </v-col>
          <v-col cols="12" sm="4" md="6">
            <v-row>
                <v-col v-for="(url, index) in imageUrls" :key="index" cols="6" sm="4">
                    <v-img :src="url" :alt="'Image ' + index" aspect-ratio="1"></v-img>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
      <div>
          <v-btn type="submit">등록</v-btn>
          <v-btn><span><router-link :to="{ name: 'ProductListPage' }">
              취소
          </router-link></span></v-btn>
      </div>
    </form>
    </v-container>
  </template>
  
  <script>

  export default {
      name: "ProductRegisterForm",
      data () {
          return {
              title: '샐러드명',
              price: 0,
              content: '샐샐샐',
              files: '',
              imageUrls: [],
          }
      },
      methods: {
          onSubmit () {
              let formData = new FormData()
              for(let idx = 0; idx < this.files.length; idx++) {
                  formData.append('productImgList', this.files[idx])
              }
              console.log('productImgList: ' + this.productImgList)

                const { title, price, content } = this
                let productInfo = {
                    title: title,
                    price: price,
                    content: content,
                }
                console.log('productInfo: ' + JSON.stringify(productInfo))
                formData.append("productInfo", new Blob([JSON.stringify(productInfo)], { type: "application/json" }))
                console.log('formdata: ' + JSON.stringify(formData) )
                this.$emit('submit', formData)  
            },
            handleFileUpload (event) {
                this.files = event.target.files
        this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
            },
        }
  }
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    border: 2px solid black;
    margin-bottom: 5px;
}

td {
    padding: 5px;
    border: 2px solid black;
}
  </style>