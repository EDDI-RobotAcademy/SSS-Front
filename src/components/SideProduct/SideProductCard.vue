<template>
  <v-container>
    <v-dialog v-model="showPreview" width="500">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col col="12">
          <v-img
            :src="require(`@/assets/product/${sideProduct.sideProductImg.editedImg}`)"
            aspect-ratio="1"
            />
          </v-col>
              <p class="product-title">{{ sideProduct.title }}</p>
              <p class="product-price">{{ sideProduct.price | comma }}원</p>
              <v-col cols="12">
              <div class="d-flex justify-content-between align-items-center" style="background-color: #3f792d; padding: 10px">
                <div class="d-flex align-items-center">
                <p style="font-size:15px; color: white; margin: 0;">구매수량</p>
              </div>
                <div class="d-flex align-items-center">
                  <v-btn class="mr-2" elevation="0" color="#EDF1D6" small @click="qtyDesc">
                    <v-icon size="15">mdi-minus</v-icon>
                  </v-btn>
                  <div style="color: white;">{{ quantity }}</div>
                  <v-btn class="ml-2" elevation="0" color="#EDF1D6" small @click="qtyInc">
                    <v-icon size="15">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
              <v-col cols="12">
                <div style="display: flex; flex-direction: row; justify-content: space-between;">
    <p style="text-align: left; margin: 0; font-size: 20px;">총 합계</p>
    <p style="text-align: right; margin: 0; font-size: 20px;">{{ totalPrice | comma }}원</p>
  </div>
</v-col>
<v-col>
  <div class="d-flex justify-center align-center justify-space-between">
    <v-btn @click="clickAddCart" width="150" height="40" color="#3f792d">
      <v-icon size="24" style="color: white;">mdi-cart-variant</v-icon>
      <span style="color: white;">장바구니</span>
    </v-btn>
    <v-btn width="150" height="40" color="#3f792d" @click="showPreview = false" class="ml-2">
      <v-icon size="24" style="color: white;">mdi mdi-close</v-icon>
      <span style="color: white;">닫기</span>
    </v-btn>
  </div>
  <div class="d-flex justify-center align-center justify-space-between mt-5">
    <router-link :to="{ name: 'SideProductModifyPage',
          params: { sideProductId: sideProduct.sideProductId.toString() } }">
      <v-btn width="150" height="40" color="blue" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'">수정하기</v-btn>
    </router-link>
          <v-btn width="150" height="40" color="red" v-if="memberInfoAboutSignIn.authorityType === 'ADMIN'" @click="onDelete">삭제</v-btn>
  </div>
</v-col>
        </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-img
      :src="require(`@/assets/product/${sideProduct.sideProductImg.editedImg}`)"
      @click="showPreview = true"
      aspect-ratio="1"
    />
    <p style="text-align: center;" class="product-title">{{ sideProduct.title }}</p>
    <p style="text-align: center;" class="product-price">{{ sideProduct.price | comma }} 원</p>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

const sideProductModule = 'sideProductModule'
const ordercartModule = 'ordercartModule'
const memberModule = 'memberModule'


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
    ...mapState(memberModule, [
        'memberInfoAboutSignIn'
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
        const itemId = this.sideProduct.sideProductId
        const quantity = this.quantity
        const category = 'SIDE'
        console.log('SIDE productId: '+ itemId )
        console.log('SIDE quantity: '+ quantity )
        console.log('SIDE category: '+ category )
        this.requestAddCartToSpring({ itemId, category, quantity})
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
.v-card {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  display: flex;
  z-index: 9999;
  max-width: 400px;
  margin: auto;
}

</style>