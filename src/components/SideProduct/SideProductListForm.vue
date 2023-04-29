<template>
  <v-container>
    <v-row>
      <v-col v-if="!sideProducts || (Array.isArray(sideProducts) && sideProducts.length === 0)">
        <p>현재 등록된 상품이 없습니다!</p>
      </v-col>
      <v-col style="min-width: 300px;" v-else v-for="(sideProduct, idx) in calData" :key="idx" cols="4">
        <side-product-card style="width:300px" :sideProduct="sideProduct"/>
      </v-col>
    </v-row>
    <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#2c4636"
      class="mt-10"
      flat
    ></v-pagination>
  </v-container>
</template>

<script>
import SideProductCard from '@/components/SideProduct/SideProductCard.vue';

export default {
  name: "SideProductListForm",
  components: { SideProductCard },
  data() {
      return {
        listData: ["sideProducts"],
        dataPerPage: 8,
        curPageNum: 1,
      };
  },
  props: {
    sideProducts: {
      type: Array
    }
  },
  computed: {
          startOffset() {
            return (this.curPageNum - 1) * this.dataPerPage;
          },
          endOffset() {
            return this.startOffset + this.dataPerPage;
          },
          numOfPages() {
            return Math.ceil(this.sideProducts.length / this.dataPerPage);
          },
          calData() {
            return this.sideProducts.slice(this.startOffset, this.endOffset);
          },
        },
}
</script>

<style scoped>

</style>