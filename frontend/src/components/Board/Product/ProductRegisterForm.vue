<template>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
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
  
      <div>
          <button type="submit">등록</button>
          <router-link :to="{ name: 'ProductListPage' }">
              취소
          </router-link>
      </div>
    </form>
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
            handleFileUpload () {
              this.files = this.$refs.files.files
            },
        }
  }
  </script>
  
  <style>
  
  </style>