<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-img :src="require(`@/assets/product/${product.productImgs[this.idx].editedImg}`)" aspect-ratio="1" class="grey lighten-2">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" justify="center">
              <v-progress-circular indeterminate color="grey lightesn-5"/>
            </v-row>
          </template>
        </v-img>
        <v-row>
          <template>
            <v-tabs width="400" height="100"
                        show-arrows background-color="transparent"
                        v-model="tab2">
              <v-tab @click="selectedImg(index)"
                      v-for="(item, index) in product.productImgs" :key="index">
              
                      <v-card width="80px" height="80px">
                        <v-img :src="require(`@/assets/product/${item.editedImg}`)" aspect-ratio="1" class="grey lighten-2">
                          <!-- <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" justify="center">
                              <v-progress-circular indeterminate color="grey lightesn-5"/>
                            </v-row>
                          </template> -->
                        </v-img>
                      </v-card>
              </v-tab>
            </v-tabs>
          </template>
        </v-row>
      </v-col>
      
      <v-col cols="7">           
        <table>
          <tr>
            <td>상품 번호</td>
            <td>
              <input type="text" :value="product.productId" readonly/>
            </td>
          </tr>
          <tr>
            <td>상품명</td>
            <td>
              <input type="text" :value="product.title" readonly/>
            </td>
          </tr>
          <tr>
            <td>가격</td>
            <td>
              <input type="number" :value="product.price" readonly/>
            </td>
          </tr>
          <tr>
            <td>본문</td>
            <td>
              <textarea cols="50" rows="5" :value="product.content" readonly/>
            </td>
          </tr>
          <tr>
            <td>
              <p>배송비</p>
              <p>{{ deliveryFee | comma }}원</p>
            </td>
          </tr>
          <div align="center" style="margin-top: 20px" >
            <!-- v-if/v-else 로 찜 버튼 클릭 여부 나누기-->
                <v-btn icon color="#568869" @click="btnFavorite" x-large><v-icon>mdi-heart-outline</v-icon></v-btn>
                <v-btn icon color="red" @click="btnFavorite" x-large><v-icon>mdi-heart</v-icon></v-btn>
          </div>      
          
        </table>
        <v-row>
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

      <v-tabs-items>
        <v-tab-item>
          <v-card flat>
            <v-card-title>
              상품설명
            </v-card-title>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-title>
              구매후기
            </v-card-title>
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
</template>

<script>
export default {
  name: "ProductReadForm",
  data() {
    return {
      tab2: null,
      tab: null,
      idx: 0,
      items: [
        {tab: '상품설명'},
        {tab: '구매후기'},
        {tab: 'Q&A'},
      ],
      deliveryFee: '',
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
    selectedImg(e) {
      // 메인 이미지 하단 이미지 클릭하면 메인 사진으로 뜨게하기
      this.idx = e;
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
};
</script>

<style scoped>
.table {
  margin-top: 10px;
  width: 100%;
}
.detail {
  border: 1px solid
}

.v-tab {
  padding: 0;
  position: relative;
}
</style>
