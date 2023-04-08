<template>
  <v-container>
  <v-row>
    <v-col cols="6">
    <table>
      <tr>
        <td>게시물 번호</td>
        <td>
          <input type="text" :value="sideProductId" readonly/>
        </td>
      </tr>
      <tr>
        <td>얼마야</td>
        <td>
          <input type="number" :value="sideProduct.price" readonly/>
        </td>
      </tr>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" :value="sideProduct.title" readonly/>
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea cols="50" rows="10" :value="sideProduct.content" readonly/>
        </td>
      </tr>
    </table>
  </v-col>
    <v-col cols="6">
      <v-img :src="require(`@/assets/selfSalad/${sideProduct.sideProductImg.editedImg}`)"/>
    </v-col>
  </v-row>
</v-container>
</template>
  
  <script>
  export default {
      name: "SideProductReadForm",
      props: {
        sideProduct: {
          type: Object,
          required: true,
        },
        sideProductId: {
          type: String,
          required: true,
        }
      }

  }
  </script>
  
  <style>
  </style>