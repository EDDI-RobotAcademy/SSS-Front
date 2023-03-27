<template>
  <v-container>
  <h3>게시글 목록</h3>
  <div class="div">
    <table>
      <tr>
        <th align="center" width="100">No</th>
        <th align="center" width="640">음료</th>
        <th align="center" width="150">가격</th>
      </tr>
      <tr v-if="!sideproducts || (Array.isArray(sideproducts) && sideproducts.length === 0)">
        <td colspan="4">
            현재 등록된 게시물이 없습니다!
        </td>
      </tr>
      <tr v-else v-for="sideproduct in sideproducts" :key="sideproduct.productId">
        <td>
          {{ sideproduct.productId }}
        </td>
        <td>
          <router-link :to="{ name: 'SideProductReadPage',
                            params: { productId: sideproduct.productId.toString() }}">
            {{ sideproduct.title }}
          </router-link>
        </td>
        <td>
          {{ sideproduct.price }}
        </td>
      </tr>
    </table>
  </div>
</v-container>
</template>
  
  <script>
  export default {
      name: "SideProductReadForm",
      props: {
        sideproducts: {
            type: Array
        }
    
      }

  }
  </script>
  
  <style>
  </style>