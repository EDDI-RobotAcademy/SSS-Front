<template>
    <div>
      <form @submit.prevent="onSubmit" enctype="multipart/form-data" method="post">
        <table>
          <tr>
            <td>상품 번호</td>
            <td>
                <input type="text" :value="product.productId" disabled/>
            </td>
          </tr>
          <tr>
              <td>상품명</td>
              <td>
                  <input type="text" v-model="title"/>
              </td>
          </tr>
          <tr>
              <td>본문</td>
              <td>
                  <textarea cols="50" rows="20" v-model="content"/>
              </td>
          </tr>
          <tr>
              <td>가격</td>
              <td>
                  <input type="number" v-model="price"/>
              </td>
          </tr>
          <tr>
              <td>사진 변경</td>
              <td>
              <input type="file" id="files" ref="files"
                  multiple @change="handleFileUpload"/>
              </td>
          </tr>
        </table>
  
        <v-row>
          <v-col v-for="(imagePath, idx) in product.productImgs" :key="idx" cols="12">
              <v-img :src="require(`@/assets/product/${imagePath.editedImg}`)" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"/>
                  </v-row>
              </template>
              </v-img>
          </v-col>
        </v-row>
  
        <div>
          <button type="submit">수정 완료</button>
          <router-link :to="{ name: 'ProductReadPage',
                              params: { productId: productId }}">
            취소
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
      name: "ProductModifyForm",
      props: {
          productId: {
              type: String,
              required: true,
          },
          product: {
              type: Object,
              required: true,
          },
          productImgs: {
              type: Array,
          }
      },
      data () {
          return {
              title: '',
              content: '',
              price: 0,
              files: '',
          }
      },
      created () {
          this.title = this.product.title
          this.content = this.product.content
          this.price = this.product.price
      },
      methods: {
          onSubmit () {
              let formData = new FormData()
  
              for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('productImgList', this.files[idx])
              }
  
              const { title, content, price, productId } = this
              let productInfo = {
                title: title,
                content: content,
                price: price,
              }
  
              console.log('productInfo: ' + JSON.stringify(productInfo))
  
              formData.append(
                  "productInfo",
                  new Blob([JSON.stringify(productInfo)], { type: "application/json" })
              )
  
              console.log('before emit: ' + files)
              for (let idx = 0, len = files.length; idx < len; idx++) {
                console.log(files[idx])
              }
              console.log('productId: ' + productId)
  
              this.$emit('submit', { productId, formData })
          },
          handleFileUpload () {
            this.files = this.$refs.files.files
          },
      },
      mounted () {
          console.log('modify form - files: ' + this.productImgs)
      }
  }
  
  </script>
  
  <style>
  
  </style>