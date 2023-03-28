<template>
    <div>
      <table>
        <tr>
          <td>상품 번호</td>
          <td>
            <input type="text" :value="product.productId" readonly/>
          </td>
        </tr>
        <tr>
          <td>상품명</td>
          <td>
            <input type="text" :value="product.title" readonly/>
          </td>
        </tr>
        <tr>
          <td>등록일자</td>
          <td>
            <input type="text" :value="product.regDate" readonly/>
          </td>
        </tr>
        <tr>
          <td>본문</td>
          <td>
            <textarea cols="50" rows="20" :value="product.content" readonly/>
          </td>
        </tr>
        <tr>
          <td>가격</td>
          <td>
            <input type="number" :value="product.price" readonly/>
          </td>
        </tr>
      </table>
      <v-row>
        <v-col v-for="(imagePath, idx) in product.productImgs" :key="idx" cols="12">
          <v-img :src="require(`@/assets/${imagePath.editedImg}`)" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" justify="center">
                <v-progress-circular indeterminate color="grey lightesn-5"/>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
  
    </div>
  </template>
  
  <script>
  
  export default {
      name: "ProductReadForm",
      props: {
          product: {
              type: Object,
              required: true,
          },
      },
      created() {
          console.log(this.productImgs)
      }
  }
  
  </script>
  
  <style>
  
  </style>