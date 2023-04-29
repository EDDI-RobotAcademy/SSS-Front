<template>
    <v-container>
      <form @submit.prevent="onSubmit" enctype="multipart/form-data" method="post">
        <v-row>
            <v-col cols="6">
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
                  <textarea cols="50" rows="5" v-model="content"/>
              </td>
          </tr>
          <tr>
              <td>가격</td>
              <td>
                <input type="number" v-model="price"/>
              </td>
          </tr>
          <tr>
                <td>영양정보</td>
                <td>
                    <label for="calorie">열량</label>
                    <input type="number" name="calorie" v-model="productDetail.calorie" step="0.01" class="short-input"/>
                    <label for="carbohydrate">탄수화물</label>
                    <input type="number" name="carbohydrate" v-model="productDetail.carbohydrate" step="0.01" class="short-input"/>
                    <label for="sugars">당류</label>
                    <input type="number" name="sugars" v-model="productDetail.sugars" step="0.01" class="short-input"/>
                    <label for="protein">단백질</label>
                    <input type="number" name="protein" v-model="productDetail.protein" step="0.01" class="short-input"/>
                    <br>
                    <label for="fat">지방</label>
                    <input type="number" name="fat" v-model="productDetail.fat" step="0.01" class="short-input"/>
                    <label for="aturatedFat">포화지방</label>
                    <input type="number" name="aturatedFat" v-model="productDetail.aturatedFat" step="0.01" class="short-input"/>
                    <label for="natrium">나트륨</label>
                    <input type="number" name="natrium" v-model="productDetail.natrium" step="0.01" class="short-input"/>
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
  
    </v-col>
    <v-col>
        <p>수정 전</p>
        <v-col v-for="(imagePath, idx) in product.productImgList" :key="idx" md="3">
            <v-img :src="require(`@/assets/product/${imagePath.editedImg}`)" aspect-ratio="1">
            </v-img>
        </v-col>
    </v-col>
    <v-col>
        <p>수정 후</p>
        <v-col v-for="(url, index) in imageUrls" :key="index" md="3">
            <v-img :src="url" :alt="'Image ' + index" aspect-ratio="1"></v-img>
        </v-col>
    </v-col>
</v-row>
  
    <div>
        <v-btn type="submit" color="blue">수정 완료</v-btn>
        <router-link :to="{name: 'ProductReadPage',
                        params: { productId: productId }}">
            <v-btn color="red">취소</v-btn>
        </router-link>
    </div>
      </form>
    </v-container>
  </template>
  
  <script>
import axiosInst from '@/utility/axiosObject'

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
              productDetail: {
                calorie: '',
                carbohydrate: '',
                sugars: '',
                protein: '',
                fat: '',
                aturatedFat: '',
                natrium: '',
              },
              files: '',
            imageUrls: [],
          }
      },
      created () {
          this.title = this.product.title
          this.content = this.product.content
          this.price = this.product.price
          this.productDetail = this.product.productDetail
          console.log("rrrr : " + JSON.stringify(this.product.productDetail))
      },
      methods: {
          onSubmit () {
              let formData = new FormData()
  
              for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('productImgList', this.files[idx])
              }
  
              const { title, content, price, productId, productDetail } = this
              let productInfo = {
                title: title,
                content: content,
                price: price,
                productDetail: productDetail
              }
  
              console.log('productInfo: ' + JSON.stringify(productInfo))
  
              if(this.files.length == 0) {
                console.log("파일 없이 수정")

                axiosInst.put(`/products/modify-text/${productId}`, productInfo)
                    .then(res => {
                        if(res.data) {
                            alert("수정 완료")
                            this.$router.push('/product-list')
                        }
                    })
                    .catch(() => {
                        alert("수정 오류")
                    })
              } else {
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
              }
          },
          handleFileUpload(event) {
            this.files = event.target.files
            this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
        },
      },
      mounted () {
          console.log('modify form - files: ' + this.productImgs)
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
.short-input {
    width: 5em;
}
  </style>