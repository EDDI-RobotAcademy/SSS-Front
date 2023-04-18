<template>
    <div class="text-center">
      <v-select
        v-model="sort"
        :items="sorts"
      ></v-select>
      <v-menu :sort="sort">
        <v-list>
          <v-list-item v-for="(product, index) in sortedProducts" :key="index">
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>  

<script>
  import { mapActions, mapState } from 'vuex'

  const productModule = 'productModule'

  export default {
    name: "SortProduct",
    data: () => ({
      sorts: [
        '등록순',
        '조회순',
        '좋아요순',
      ],
      sort: '등록순',
    }),
    computed: {
      ...mapState(productModule, ["products"]),
      sortedProducts() {
        // if (this.sort === "조회순") {
        //   return this.products.sort((a, b) => {
        //     if (b.viewCnt === a.viewCnt) {
        //       return b.productId - a.productId;
        //     } else {
        //       return b.viewCnt - a.viewCnt;
        //     }
        //   });
        // } else {
        //   return this.products.sort((a, b) => b.productId - a.productId);
        // }
        switch(this.sort) {
          case "조회순":
            return this.products.sort((a, b) => {
              if (b.viewCnt === a.viewCnt) {
                return b.productId - a.productId;
              } else {
                return b.viewCnt - a.viewCnt;
              }
            });
          case "좋아요순":
            return this.products.sort((a, b) => {
              if (b.favoriteCnt === a.favoriteCnt) {
                return b.productId - a.productId;
              } else {
                return b.favoriteCnt - a.favoriteCnt;
              }
            })
          default:
            return this.products.sort((a, b) => b.productId - a.productId);
        }
      },
    },
    methods:{
      ...mapActions(productModule, [
        'requestSortProductsToSpring',
        'requestSortFavoriteToSpring'
      ]),
    },
    mounted() {
      this.requestSortProductsToSpring()
      this.requestSortFavoriteToSpring()
    }
  }
</script>
  
  <style scoped>
  
  .margin {
    margin-left: 150px;
    margin-right: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .main_box {
    border: 1px solid lightgrey;
  }
  
  .sub_box {
    display: flex;
  }
  
  .title {
    border-right: 1px solid lightgrey;
    color: white;
    font-weight: 500;
    margin: 0 10px 0 0;
    text-align: center;
    padding-top: 6px;
    font-size: 15px;
    width: 20%;
    padding-top: 12px;
    font-weight: bold;
    background: #6699FF;
  }
  </style>