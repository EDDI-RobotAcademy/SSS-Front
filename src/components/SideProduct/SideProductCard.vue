<template>
<v-container>
  <v-card v-if="showPreview" class="v-card">
    <v-card-text>
      <v-img :src="previewImage" aspect-ratio="1">
        <template v-slot:placeholder>
          <v-progress-circular indeterminate color="lighten-5-grey"/>
        </template>
      </v-img>
      <p class="product-title">{{ sideproduct.title }}</p>
      <p class="product-price">{{ sideproduct.price  }} 원</p>
        <div>
          <v-btn color="green" @click="showPreview = false">취소</v-btn>
          <router-link :to="{ name: 'SideProductModifyPage',
                    params: { sideProductId: sideproduct.sideProductId.toString() } }">
                    <v-btn color="blue">수정하기</v-btn>
          </router-link>
          <v-btn color="red" @click="onDelete">삭제</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <v-img :src="require(`@/assets/selfSalad/${sideproduct.sideProductImg.editedImg}`)"
  @click="showPreview = true; previewImage = require(`@/assets/selfSalad/${sideproduct.sideProductImg.editedImg}`);"
/>
      <p class="product-title">{{ sideproduct.title }}</p>
      <p class="product-price">{{ sideproduct.price  }} 원</p>
</v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "SideProductCard",
  data() {
    return {
      showPreview: false,
      previewImage: "",
    }
  },
  props: {
    sideproduct: {
      type: Object,
      required: true,
    },          
    filters: {
    // 상품 금액 천단위 콤마 찍기
    numberFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
},
methods:{
      ...mapActions([
        'requestDeleteSideProductToSpring'
      ]),
      async onDelete() {
        await this.requestDeleteSideProductToSpring(this.sideProductId)
        await this.$router.push({name : 'SideProductListPage'}).catch(()=>{});
      }
    },
}
</script>

<style scoped>

.product-title {
  margin-top: 5px;
  font-weight: bold;
}

.product-price {
  color: green;
}
.v-card {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  display: flex;
  z-index: 9999;
  max-width: 400px;
  margin: auto;
}
</style>