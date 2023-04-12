<template>
<v-container>
  <v-card v-if="showPreview && !deletionSuccess" class="v-card">
    <v-card-text>
      <v-img :src="previewImage" aspect-ratio="1">
        <template v-slot:placeholder>
          <v-progress-circular indeterminate color="lighten-5-grey"/>
        </template>
      </v-img>
      <p class="product-title">{{ sideProduct.title }}</p>
      <p class="product-price">{{ sideProduct.price | comma }}원</p>
        <div>
          <v-btn color="green" @click="showPreview = false">취소</v-btn>
          <router-link :to="{ name: 'SideProductModifyPage',
                    params: { sideProductId: sideProduct.sideProductId.toString() } }">
                    <v-btn color="blue">수정하기</v-btn>
          </router-link>
          <v-btn color="red" @click="onDelete">삭제</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <v-img :src="require(`@/assets/selfSalad/${sideProduct.sideProductImg.editedImg}`)"
  @click="showPreview = true; previewImage = require(`@/assets/selfSalad/${sideProduct.sideProductImg.editedImg}`);"
/>
      <p class="product-title">{{ sideProduct.title }}</p>
      <p class="product-price">{{ sideProduct.price  }} 원</p>
</v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

const sideProductModule = 'sideProductModule'

export default {
  name: "SideProductCard",
  data() {
    return {
      showPreview: false,
      deletionSuccess: false,
      previewImage: "",
    }
  },
  props: {
    sideProduct: {
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
      ...mapActions(sideProductModule, [
        'requestDeleteSideProductToSpring',
      ]),
      async onDelete() {
        await this.requestDeleteSideProductToSpring(this.sideProduct.sideProductId)
        await this.$router.push({name : 'SideProductListPage'}).catch(()=>{});
        //삭제 성공시 모달창 닫음
        this.deletionSuccess = true
        //리스트로 돌아 갔을 때 화면 새로고침
        window.location.reload(true);
      }
    }
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