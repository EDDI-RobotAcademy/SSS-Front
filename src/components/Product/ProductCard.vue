<template>
  <v-container class="text-center">
    <v-row>
    <div class="productCard">
      <div class="thumbnail-wrapper">
        <router-link :to="{ name: 'ProductReadPage',
              params: { productId: product.productId.toString() }}">
        <img class="thumbnail" :src="require(`@/assets/product/${product.productImgList[0].editedImg}`)">
      </router-link>
        <div>
          <v-btn icon @click="clickAddCart">
            <v-icon >mdi-cart-variant</v-icon>
          </v-btn>
          <v-btn icon @click="clickFavorite">
            <v-icon v-if="!isLiked">mdi-heart-outline</v-icon>
            <v-icon v-else color="red">mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>
      <p style="text-align: center;" class="product-title">{{ product.title }}</p>
      <p style="text-align: center;" class="product-price">{{ product.price | comma }}원</p>

      <v-dialog v-model="quantityModal" max-width="500">
        <v-card>
          <v-card-actions>
            <v-card-title class="text-h5">수량 선택</v-card-title>
            <v-spacer></v-spacer>
            <v-btn text @click="quantityModal = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>
            <div class="d-flex align-items-center">
              <div>{{ product.title }}</div>
              <v-spacer></v-spacer>
              <v-btn style="background-color: #9DC08B;" rounded class="mr-2" elevation="0" color="lightengray" small @click="qtyDesc">
                <v-icon size="15" color="white">mdi-minus</v-icon>
              </v-btn>
              <div>{{ quantity }}</div>
              <v-btn style="background-color: #9DC08B;" rounded class="ml-2 mr-6" elevation="0" color="lightengray" small @click="qtyInc">
                <v-icon size="15" color="white">mdi-plus</v-icon>
              </v-btn>
              {{ product.price * quantity | comma }}원
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="checkQuantity">담기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
  </v-container>
</template>
  
<script>
  export default {
      name: "ProductCard",
      data() {
          return {
              idx: 0,
              quantityModal: false,
              quantity: 1
          }
      },
      filters: {
        comma(val) {
          return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
      },
      props: {
          product: {
              type: Object,
              required: true,
          },
          favoriteInfo: {
              type: Object,
              required: true,
        },
          favoriteList: {
                type: Array,
                required: true,
        }
      },
      methods: {
        clickFavorite() {
      // 찜(좋아요) 클릭 이벤트
      if(this.$store.state.memberModule.isAuthenticated) {
        const productId = this.product.productId
        const isLike = !this.favoriteInfo.isLike
        console.log("productId: "+productId)
        console.log("isLike: "+isLike)
        
        const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
        console.log("memberId: "+memberId)
        localStorage.setItem(`${memberId}_${productId}_like`, JSON.stringify({ memberId, productId, isLike }));
    
        this.$emit('saveFavorite', {productId, isLike})
      } else {
        alert("로그인한 사용자만 가능합니다.")
      }
    },
        clickAddCart(event) {
          event.preventDefault();
          this.quantityModal = true
        },
        checkQuantity() {
          if(this.$store.state.memberModule.isAuthenticated) {

            const productId = this.product.productId
            const quantity = this.quantity
            console.log('addCart event emitted with payload:', {productId, quantity});
            this.$emit('addCart', {productId, quantity})
          } else {
            alert("로그인한 사용자만 가능합니다.")
            this.quantityModal = false
      }
        },
        qtyDesc() {
          if (this.quantity > 1) {
            this.quantity--;
          }
        },
        qtyInc() {
          this.quantity++;
        },
      },
    computed:{
      //favoriteList에 담긴 productId와 card에 담긴 productId가 일치하는지 확인
      isLiked() {
        const favorite = this.favoriteList.some(item => item.productId === this.product.productId);
      return favorite;
    },
      }
  }
</script>
  
<style scoped>
 .productCard{
  align-items: center;
  justify-content: center;
  flex-direction: column;
 }

  .thumbnail {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
 .product-title {
    font-size: 25px;
    text-align: center;
    margin-top: 30px;
  }
  .product-price {
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    margin-top: 10px;
  }
  
  *{
    color: #40513B;
  }

  .thumbnail-wrapper {
  position: relative;
}
.buttonContainer {
  position: absolute;
  top: 80%;
  left: 70%;
  transform: translate(-20%, -30%);
  opacity: 0.7;
  pointer-events: auto;
}

.cartButton {
  background-color: transparent;
  color: #40513B;
}

</style>