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
        <!-- <v-row> 메인 사진 하단에 선택해서 넘길 수 있는 작은 이미지
          <template>
            <v-tabs width="400" height="100"
                        show-arrows background-color="transparent"
                        v-model="tab2">
              <v-tab @click="selectedImg(index)"
                      v-for="(item, index) in product.productImgs" :key="index">
              
                      <v-card width="80px" height="80px">
                        <v-img :src="require(`@/assets/product/${item.editedImg}`)" aspect-ratio="1" class="grey lighten-2">
                        </v-img>
                      </v-card>
              </v-tab>
            </v-tabs>
          </template>
        </v-row> -->
      </v-col>
      
      <v-col cols="6">           
        <div>
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
        </div>
        
        <v-row>
          <v-col align="center">
            <!-- v-if/v-else 로 찜 버튼 클릭 여부 나누기-->
                <v-btn v-if="isTrue == false" x-large icon @click="clickToggle">
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn v-else x-large icon color="red" @click="clickToggle">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>
          <v-col>
            <v-btn
                @click="btnCart"
                width="240px"
                x-large><v-icon>mdi-cart-variant</v-icon><span>장바구니</span></v-btn>
          </v-col>
          <v-col>      
            <v-btn
                @click="btnDirectPurchase"
                btn-name="바로구매"
                width="240px"
                x-large><v-icon>mdi-shopping</v-icon><span>바로구매</span></v-btn>
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
                <v-col cols="2" style="background-color: green;">
                  <span><h2 style="color:white">채소 구성</h2></span>
                </v-col>
                <v-col align="center" v-for="(image, index) in product.productImgs.slice(1)" :key="index" cols="2">
                  <v-img :src="require(`@/assets/product/${image.editedImg}`)" max-width="200" contain></v-img>
                </v-col>
              </v-row>
              
              <v-row style="margin-top: 80px;">
                <h2>영양성분표</h2>
                <table class="ingredient" style="width: 100%; margin: 0 auto; height: 100px; text-align: center;">                
                    <tr style="background-color: green;">
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
                      <td>264.4</td>
                      <td>36.4</td>
                      <td>11.1</td>
                      <td>7.3</td>
                      <td>11.8</td>
                      <td>1.6</td>
                      <td>368.7</td>
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

        <v-tab-item>
          <v-card flat>
            <v-card-title>
              Q&A
            </v-card-title>
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
      // 좋아요 토글 기능
      isTrue: false,
      tab2: null,
      tab: null,
      idx: 0,
      quantity: 1,
      totalPrice: 0,
      items: [
        {tab: '상품설명'},
        {tab: '상품후기'},
        {tab: 'Q&A'},
      ],
      deliveryFee: 3000,  //productInfo를 따로 만들것인지...(배송비, 찜 정보 등)
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
  },
  methods: {
    // selectedImg(e) {
    //   // 메인 이미지 하단 이미지 클릭하면 메인 사진으로 뜨게하기
    //   this.idx = e;
    // },
    // 좋아요 토글 기능
    clickToggle() {
      this.isTrue = !this.isTrue
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
    btnCart() {
      // 장바구니 클릭 이벤트
    },
    btnDirectPurchase() {
      // 바로구매 클릭 이벤트
    },
    btnFavorite() {
      // 찜(좋아요) 클릭 이벤트
    },
  },
  beforeUpdate() {
    this.totalPrice = this.product.price * this.quantity
  },
};
</script>

<style scoped>
.table {
  margin-top: 10px;
  width: 100%;
}
.v-tab {
  padding: 0;
  position: relative;
}
.ingredient th {
  font-size: 1.4em;
}
.ingredient td {
  font-size: 1.4em;
}
</style>
