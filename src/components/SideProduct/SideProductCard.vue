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
      <div class="d-flex justify-content-between align-items-center" style="background-color: lightgray; padding: 10px">
        <p>구매수량</p>
        <div class="d-flex align-items-center">
          <v-btn class="mr-2" elevation="0" color="lightengray" small @click="qtyDesc">
            <v-icon size="15">mdi-minus</v-icon>
          </v-btn>
          <div>{{ quantity }}</div>
          <v-btn class="ml-2" elevation="0" color="lightengray" small @click="qtyInc">
            <v-icon size="15">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="row">
        <p class="col-sm-4" style="text-align: left">총 합계</p>
        <div class="col-sm-8" align="right">
          <p>{{ totalPrice | comma }}원</p>
        </div>
      </div>
        <div>
          <v-btn color="green" @click="showPreview = false">취소</v-btn>
          <v-btn
              @click="clickAddCart"
                width="240px"
                x-large><v-icon>mdi-cart-variant</v-icon><span>장바구니</span></v-btn>
          <router-link :to="{ name: 'SideProductModifyPage',
                    params: { sideProductId: sideProduct.sideProductId.toString() } }">
                    <v-btn color="blue">수정하기</v-btn>
          </router-link>
          <v-btn color="red" @click="onDelete">삭제</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <v-img :src="require(`@/assets/product/${sideProduct.sideProductImg.editedImg}`)"
  @click="showPreview = true; previewImage = require(`@/assets/product/${sideProduct.sideProductImg.editedImg}`);"
/>
      <p class="product-title">{{ sideProduct.title }}</p>
      <p class="product-price">{{ sideProduct.price | comma  }} 원</p>
</v-container>
</template>

<script>
import {mapActions} from 'vuex'

const sideProductModule = 'sideProductModule'
const ordercartModule = 'ordercartModule'


export default {
  name: "SideProductCard",
  data() {
    return {
      showPreview: false,
      deletionSuccess: false,
      previewImage: "",
      quantity: 1,
      totalPrice: 0
    }
  },
  props: {
    sideProduct: {
      type: Object,
      required: true,
    }
},
methods:{
      ...mapActions(sideProductModule, [
        'requestDeleteSideProductToSpring',
      ]),
      ...mapActions(ordercartModule, [        
          'requestAddCartToSpring'    
    ]),
      async onDelete() {
        await this.requestDeleteSideProductToSpring(this.sideProduct.sideProductId)
        await this.$router.push({name : 'SideProductListPage'}).catch(()=>{});
        //삭제 성공시 모달창 닫음
        this.deletionSuccess = true
        //리스트로 돌아 갔을 때 화면 새로고침
        window.location.reload(true);
      },
      qtyDesc() {
      if(this.quantity > 1) {
        this.quantity--
      } else {
        this.quantity = 1
      }
    },
    qtyInc() {
      this.quantity++
    },
    clickAddCart() {
      // 장바구니 클릭 이벤트
        const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
        const itemId = this.sideProduct.sideProductId
        const quantity = this.quantity
        const category = 'SIDE'
        console.log('SIDE memberId: '+ memberId )
        console.log('SIDE productId: '+ itemId )
        console.log('SIDE quantity: '+ quantity )
        console.log('SIDE category: '+ category )
        this.requestAddCartToSpring({memberId, itemId, category, quantity})
      }
    },
    beforeUpdate() {
    this.totalPrice = this.sideProduct.price * this.quantity
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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