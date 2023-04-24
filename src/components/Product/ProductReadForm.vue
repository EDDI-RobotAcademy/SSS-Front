<template>
  <v-container>

  <div>
    <v-row>
      <v-col cols="5">
        <v-img :src="require(`@/assets/product/${product.productImgs[this.idx].editedImg}`)" 
                aspect-ratio="1" width="500" height="500">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" justify="center">
              <v-progress-circular indeterminate color="grey lightesn-5"/>
            </v-row>
          </template>
        </v-img>
      </v-col>
      
      <v-col cols="6">           
        <div class="product-info">
          <div class="d-flex justify-content-between align-items-center title">
          <h3>{{ product.title }}</h3>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <h4>판매가</h4>
          <h4>{{ product.price | comma }}원</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <p>배송비</p>
          <p>{{ deliveryFee | comma }}원
          (5만원 이상 무료배송)</p>
        </div>
          <div class="d-flex justify-content-between align-items-center" style="border-radius: 8px; background-color: #EDF1D6; padding: 10px">
            <p>구매수량</p>
            <div class="d-flex align-items-center">
              <v-btn style="background-color: #9DC08B;" rounded class="mr-2" elevation="0" color="lightengray" small @click="qtyDesc">
                <v-icon size="15">mdi-minus</v-icon>
              </v-btn>
              <div>{{ quantity }}</div>
              <v-btn style="background-color: #9DC08B;" rounded class="ml-2" elevation="0" color="lightengray" small @click="qtyInc">
                <v-icon size="15">mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="row">
            <p class="col-sm-4" style="text-align: left">총 합계</p>
            <div class="col-sm-8" align="right">
              <p>{{ quantity * product.price | comma }}원</p>
            </div>
          </div>
        </div>
        
        <v-row>
          <v-col align="center">
            <!-- v-if/v-else 로 찜 버튼 클릭 여부 나누기-->
                <v-btn v-if="!this.favoriteInfo.isLike" x-large icon @click="clickFavorite">
                  <v-icon >mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn v-else x-large icon color="red" @click="clickFavorite" >
                  <v-icon >mdi-heart</v-icon>
                </v-btn>
              </v-col>
          <v-col>
            <v-btn
              @click="clickAddCart"
                width="240px"
                x-large style="background-color: #9DC08B; color: white;"><v-icon>mdi-cart-variant</v-icon><span style="color:white">장바구니</span></v-btn>
          </v-col>
          <v-col>      
            <v-btn
                @click="btnDirectPurchase"
                btn-name="바로구매"
                width="240px"
                x-large style="background-color: #9DC08B; color: white;"><v-icon>mdi-shopping</v-icon><span style="color:white">바로구매</span></v-btn>
          </v-col>  
        </v-row>    
      </v-col>
    </v-row>  

    <v-divider></v-divider>

    <div class="detail">
      <v-tabs v-model="tab" grow>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-title>
              {{ product.content }}
            </v-card-title>
            <v-card-text class="mt-5">
              
              <v-row>
                <v-col cols="2" style="background-color: #9DC08B;">
                  <span><h2 style="color:white">채소 구성</h2></span>
                </v-col>
                <v-col align="center" v-for="(image, index) in product.productImgs.slice(1)" :key="index" cols="2">
                  <v-img :src="require(`@/assets/product/${image.editedImg}`)" max-width="200" contain></v-img>
                </v-col>
              </v-row>
              
              <v-row style="margin-top: 80px;">
                <h2>영양성분표</h2>
                <table class="ingredient" style="width: 100%; margin: 0 auto; height: 100px; text-align: center;">                
                    <tr style="background-color: #9DC08B;">
                      <th>메뉴</th>
                      <th>열량(kcal)</th>
                      <th>탄수화물(g)</th>
                      <th>당류(g)</th>
                      <th>단백질(g)</th>
                      <th>지방(g)</th>
                      <th>포화지방(g)</th>
                      <th>나트륨(mg)</th>
                    </tr>
                    <tr>
                      <td>{{product.title}}</td>
                      <td>{{ product.productDetail.calorie }}</td>
                      <td>{{ product.productDetail.carbohydrate }}</td>
                      <td>{{ product.productDetail.sugars }}</td>
                      <td>{{ product.productDetail.protein }}</td>
                      <td>{{ product.productDetail.fat }}</td>
                      <td>{{ product.productDetail.aturatedFat }}</td>
                      <td>{{ product.productDetail.natrium }}</td>
                    </tr>
                </table>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text align="center">
              <review-form :product="product"/>
            </v-card-text>
          </v-card>
        </v-tab-item>

      </v-tabs-items>
    </div>
  </div>
</v-container>
</template>

<script>
import ReviewForm from "@/components/Product/review/ReviewForm.vue"

export default {
  name: "ProductReadForm",
  components: {ReviewForm},
  data() {
    return {
      tab2: null,
      tab: null,
      idx: 0,
      quantity: 1,
      items: [
        {tab: '상품설명'},
        {tab: '상품후기'},
      ],
      deliveryFee: 3000,
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
    }
  },
  methods: {
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
        const productId = this.product.productId
        const quantity = this.quantity

        this.$emit('addCart', {productId, quantity})
    },
    btnDirectPurchase() {
      // 바로구매 클릭 이벤트
    },
    clickFavorite() {
      // 찜(좋아요) 클릭 이벤트
      if(this.$store.state.memberModule.isAuthenticated) {
        const productId = this.product.productId
        const isLike = !this.favoriteInfo.isLike
        this.favoriteInfo.isLike = isLike
        
        const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId
        localStorage.setItem(`${memberId}_${productId}_like`, JSON.stringify({ memberId, productId, isLike }));
    
        this.$emit('saveFavorite', {productId, isLike})
      } else {
        alert("로그인한 사용자만 가능합니다.")
      }
    }
},
}
</script>

<style scoped>
.product-info {
  margin-top: 60px;
}
.ingredient th {
  font-size: 1.4em;
  color:white;
}
.ingredient td {
  font-size: 1.4em;
}
*{
    color: #40513B;
  }
</style>