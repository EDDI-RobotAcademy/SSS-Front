<template>
  <v-container>
  <div>
    <div class="div">
    <table>
      <tr>
        <td>게시물 번호</td>
        <td>
          <input type="text" :value="sideproduct.productId" readonly/>
        </td>
      </tr>
      <tr>
        <td>얼마야</td>
        <td>
          <input type="number" :value="sideproduct.price" readonly/>
        </td>
      </tr>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" :value="sideproduct.title" readonly/>
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea cols="50" rows="10" :value="sideproduct.content" readonly/>
        </td>
      </tr>
    </table>
  </div>
  </div>
</v-container>
</template>
  
  <script>
  export default {
      name: "SideProductReadForm",
      props: {
        sideproduct: {
          type: Object,
          require: true,
        }
      }

  }
  </script>
  
  <style>
  </style>