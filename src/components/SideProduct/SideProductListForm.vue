<template>
  <v-container>
    <v-row>
      <v-col v-if="!sideproducts || (Array.isArray(sideproducts) && sideproducts.length === 0)">
        <p>현재 등록된 상품이 없습니다!</p>
      </v-col>
      <v-col v-else v-for="(sideproduct, idx) in sideproducts" :key="idx" cols="3">
        <side-product-card :sideproduct="sideproduct"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideProductCard from '@/components/SideProduct/SideProductCard.vue';

export default {
  name: "SideProductListForm",
  components: { SideProductCard },
  props: {
    sideproducts: {
      type: Array
    }
  },
}
</script>

<style scoped>

</style>