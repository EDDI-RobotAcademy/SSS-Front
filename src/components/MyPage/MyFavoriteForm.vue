<template>
  <v-container>
  <!-- (좋아요) 찜 목록 -->
  <v-card flat style="width: 100%">
    <v-card-text>
      <h2 style="margin-left: 50px">찜 목록</h2>
      <div align="right" class="mr-3 mb-3">총 {{ favoriteList.length }} 건</div>
      <v-divider style="margin-top: 30px"></v-divider>
      <div class="item-container">
        <div class="item-info" v-for="(item, index) in favoriteList" :key="index">
          <img :src="require(`@/assets/product/${item.productImgList[0].editedImg}`)"
            max-width="100%" max-height="250" contain/>
          <p class="content" @click="productView(item)">{{ item.title }}</p>
          <p class="price" @click="productView(item)">{{ item.price | comma }} 원</p>
          <div class="button">
            <v-col>
              <v-btn class="ml-0 ma-2" @click="clickAddCart(item.productId)">장바구니</v-btn>
              <v-btn @click="cancelFavorite(item.productId)">찜 삭제</v-btn>
            </v-col>
          </div>
        </div>
      </div>  
      <div class="item-info" v-if="!favoriteList || (Array.isArray(favoriteList) && favoriteList.length === 0)">
        <p align="center" class="mt-15 mb-15">찜한 상품이 없습니다.</p>
      </div>
    </v-card-text>
  </v-card>
  </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'
const productModule = 'productModule'
const memberModule = 'memberMoudle'
export default {
  name: "MyFavoriteForm",
  async mounted() {
    if (this.$store.state.memberModule.memberInfoAboutSignIn && this.$store.state.memberModule.memberInfoAboutSignIn.userId) {
    await this.requestFavoriteListToSpring();
  }
  },
  computed: {
    ...mapState(productModule, [
      'favoriteList'
    ]),
    ...mapState(memberModule, [
      'memberInfoAboutSignIn'
    ])
  },
  methods: {
    ...mapActions(productModule, [
      'requestFavoriteListToSpring',
      'requestSaveFavoriteToSpring'
    ]), 
    async cancelFavorite(payload) {
      const productId = payload
      const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
      await this.requestSaveFavoriteToSpring(productId)
      localStorage.removeItem(`${memberId}_${productId}_like`)
      alert("해당 상품 찜을 취소하였습니다.")
      this.$router.go(this.$router.currentRoute)
    },
    clickAddCart(payload) {
        const productId = payload
        const quantity = 1
        this.$emit('addCart', {productId, quantity})
    },
    productView(item) {
      this.$router.push({name: 'ProductReadPage', params: {productId: String(item.productId)}})
    }
  },
  filters: {
      comma(val) {
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
  },
}
</script>

<style scoped>
.item-container {
  display: flex;
  flex-wrap: wrap;
}

.item-info {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-right: 2%;
  margin-bottom: 2%;
}

.content {
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
}

.price {
  color: green;
  text-align: center;
}

.item-info .button {
  margin-top: 40px;
  margin-left: 10%;
}
</style>