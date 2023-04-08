<template>
  <v-container>
    <v-row>
      <v-col v-if="!sideProducts || (Array.isArray(sideProducts) && sideProducts.length === 0)">
        <p>현재 등록된 상품이 없습니다!</p>
      </v-col>
      <v-col v-else v-for="(sideProduct, idx) in sideProducts" :key="idx" cols="3">
        <side-product-card :sideProduct="sideProduct"/>
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
    sideProducts: {
      type: Array
    }
  },
}
</script>

<style scoped>

</style>