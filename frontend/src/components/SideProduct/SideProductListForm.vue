<template>
  <v-container>
    <v-row>
      <v-col v-for="(sideproduct, idx) in sideproducts" :key="idx" cols="3">
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