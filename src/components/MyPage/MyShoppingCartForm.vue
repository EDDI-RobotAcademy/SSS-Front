<template>
  <v-container>
    <!-- 장바구니 상품 표시 카드 -->
    <v-card flat style="width: 100%">
      <v-card-text>
        <v-container style="width: 1000px" v-if="!cartItems || (Array.isArray(cartItems) && cartItems.length === 0)">
          <div style="margin-top: 50px" align="center">
            <h2>장바구니에 상품이 없습니다.</h2>
          </div>
        </v-container>

        <v-container>
          <v-card>
            <v-card-title style="background-color: #80a84f" @click="SSSOpen = !SSSOpen">
              <span style="font-size: 30px; font-weight: bold; color: white;">Order / Payment</span>
              <v-spacer></v-spacer>
              <v-btn style="color: white;" text @click="selectRemoveItem">
                <v-icon>mdi-delete-outline</v-icon>
                선택 삭제
              </v-btn>
            </v-card-title>
            <v-card-text v-if="SSSOpen">
              <table>
                <thead>
                  <tr style="margin-top: 20px;">
                    <th>전체 {{ selfSaladCount }}개</th>
                    <th class="itemCheck ms-8 mt-14">
                      <v-checkbox class="allCheckbox" v-model="allChecked" />
                    </th>
                    <th colspan="2">상품명</th>
                    <th>판매가</th>
                    <th>수량</th>
                    <th>주문관리</th>
                    <th>배송비/배송 형태</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(cartItem, idx) in cartItems">
                    <tr :key="idx" v-if="cartItem.category === 'SELF_SALAD'">
                      <td>{{ idx + 1 }}</td>
                    <td class="itemCheck" align="left">
                      <v-checkbox class="itemCheckbox" v-model="checkedValues" :value="cartItem.cartItemId" />
                    </td>
                    <td></td>
                    <td>
                      <v-img :src="require(`@/assets/logo/3sss.jpg`)"
                        style="max-width: 80px; max-height: 100px;" />
                        {{ cartItem.title }}
                      </td>
                    <td>
                      <p>{{ cartItem.totalPrice / cartItem.quantity | comma }}원</p>
                    </td>
                    <td>
                      <v-btn class="mr-2" icon small @click="descQuantity(idx)">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      {{ cartItem.quantity }}
                      <v-btn class="ml-2" icon small @click="incQuantity(idx)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <p>{{ cartItem.totalPrice | comma }}원</p>
                    </td>
                    <td>
                      <v-btn @click="removeItem(idx)">
                        삭제하기
                      </v-btn>
                  <v-btn @click="openModal(idx)">
                    수정하기
                  </v-btn>
                    </td>
                    <td style="text-align: center;">
                      <p>택배배송<br>
                      <span style="font-weight: bold;">배송비무료</span><br>
                        0원 이상 무료</p>
                    </td>
                  </tr>
                  </template>
                </tbody>
              </table>
            </v-card-text>
          </v-card>
        </v-container>
        

        <v-container>
          <v-card>
            <v-card-title style="background-color: #80a84f" @click="ProductOpen = !ProductOpen">
              <span style="font-size: 30px; font-weight: bold; color: white;">Order / Payment</span>
              <v-spacer></v-spacer>
              <v-btn style="color: white;" text @click="selectRemoveItem">
                <v-icon>mdi-delete-outline</v-icon>
                선택 삭제
              </v-btn>
            </v-card-title>
            <v-card-text v-if="ProductOpen">
              <table>
                <thead>
                  <tr style="margin-top: 20px;">
                    <th>전체 {{ProductCount}} 개</th>
                    <th class="itemCheck ms-8 mt-14">
                      <v-checkbox class="allCheckbox" v-model="allChecked" />
                    </th>
                    <th colspan="2">상품명</th>
                    <th>판매가</th>
                    <th>수량</th>
                    <th>주문관리</th>
                    <th>배송비/배송 형태</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(cartItem, idx) in cartItems">
                    <tr :key="idx" v-if="cartItem.category === 'PRODUCT' || cartItem.category === 'SIDE'">
                      <td>{{ idx + 1 }}</td>
                    <td class="itemCheck" align="left">
                      <v-checkbox class="itemCheckbox" v-model="checkedValues" :value="cartItem.cartItemId" />
                    </td>
                    <td>
                      <router-link :to="{ name: 'ProductReadPage', params: { productId: cartItem.productId.toString() } }">
                        <v-img :src="require(`@/assets/product/${cartItem.editedImg}`)"
                        style="max-width: 100px; max-height: 100px;" />
                      </router-link>
                      </td>
                    <td>{{ cartItem.title }}</td>
                    <td>
                      <p>{{ cartItem.totalPrice / cartItem.quantity | comma }}원</p>
                    </td>
                    <td>
                      <v-btn class="mr-2" icon small @click="descQuantity(idx)">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      {{ cartItem.quantity }}
                      <v-btn class="ml-2" icon small @click="incQuantity(idx)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <p>{{ cartItem.totalPrice | comma }}원</p>
                    </td>
                    <td>
                      <v-btn @click="removeItem(idx)">
                        삭제하기
                      </v-btn>
                    </td>
                    <td style="text-align: center;">
                      <p>택배배송<br>
                      <span style="font-weight: bold;">배송비무료</span><br>
                        0원 이상 무료</p>
                    </td>
                  </tr>
                  </template>


                </tbody>
              </table>
            </v-card-text>
          </v-card>
        </v-container>

        <v-dialog v-model="showModal">
          <self-salad-modify-cart-page @close="closeModal"  />
        </v-dialog>

      
          <div class="sticky-nav">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; width: 800px; margin: 0 auto;">
              <div>
                <h5 style="font-weight: normal; color: white;">선택 상품금액</h5>
                <span style="font-size: 30px; font-weight: bold; color: white;">
                  {{ totalPrice | comma }}
                </span>
                <span style="color: white;">원</span>
              </div>
              <h2 style="margin-top: 10px; color: white;">+</h2>
              <div>
                <h5 style="font-weight: normal; color: white;">배송비</h5>
                <div v-if="checkedValues.length === 0">
                  <span style="font-size: 30px; font-weight: bold; color: white;">
                    0
                  </span>
                  <span style="color: white;">원</span>
                </div>
                <div v-else-if="totalPrice < 50000">
                  <span style="font-size: 30px; font-weight: bold; color: white;">
                    {{ deliveryFee | comma}}
                  </span>
                  <span style="color: white;">원</span>
                </div>
                <div v-else>
                  <span style="font-size: 30px; font-weight: bold; color: white;">무료배송</span>
                </div>
              </div>
              <div style="border-left: 2px solid white; margin-left: 50px; color: white;"></div>
              <div style="display: flex; align-items: center;">
                <div v-if="checkedValues.length === 0">
                  <h5 style="font-weight: normal; color: white;">총 주문금액</h5>
                  <span style="font-size: 30px; font-weight: bold; color: white;">
                    0
                  </span>
                  <span style="color: white;">원</span>
                </div>
                <div v-else>
                  <h5 style="font-weight: normal; color: white;">총 주문금액</h5>
                  <span style="font-size: 30px; font-weight: bold; color: white;">
                    {{ totalPrice+deliveryFee | comma }}
                  </span>
                  <span style="color: white;">원</span>
                </div>
                <div style="margin-left: 50px;">
                  <v-btn>
                    <h4>{{ checkedValues.length }}건 주문하기</h4>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        

        

    </v-card-text>
    </v-card>
</template>


<script>

import SelfSaladModifyCartPage from "@/views/SelfSalad/SelfSaladModifyCartPage.vue";


export default {
  name: "MyShoppingCartForm",
  components: { SelfSaladModifyCartPage },
  props: {
    cartItems: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
      checkedValues: [],
      SSSOpen: true,
      ProductOpen: true,
      showModal: false,
      deliveryFee: 3000
    }
  },
  methods: {
    incQuantity(idx) {
      this.cartItems[idx].quantity++
      const itemId = this.cartItems[idx].cartItemId
      const quantity = 1
      const category = this.cartItems[idx].category
      this.$emit('onModify', { itemId, category, quantity })
    },
    descQuantity(idx) {
      if (this.cartItems[idx].quantity > 1) {
        this.cartItems[idx].quantity--
        const itemId = this.cartItems[idx].cartItemId
        const quantity = -1
        const category = this.cartItems[idx].category
        this.$emit('onModify', { itemId, category, quantity })
      }
    },
    selectAll() {
      this.allSelected = !this.allSelected;
      this.cartItems.forEach(item => (item.selected = this.allSelected));
    },
    //개별 삭제
    removeItem(idx) {
      const itemId = this.cartItems[idx].cartItemId
      const category = this.cartItems[idx].category
      console.log(category)
      this.$emit('onDelete', { itemId, category })
    },
    //모달창 열고 카트 아이디 보내주기
    openModal(idx) {
      const itemId = this.cartItems[idx].cartItemId
      this.showModal = true;
      this.$emit('onSSSModify', { itemId })

    },
    toggleAll(value) {
      this.checkedValues = value ? this.cartItems.map(cartItem => cartItem.cartItemId) : [];
    },
    async selectRemoveItem() {
      let deleteCartMessage = confirm("선택한 상품을 삭제하시겠습니까?")
      if (deleteCartMessage) {
        let selectCartItemId = []
        let category = 'PRODUCT'
        for (let i = 0; i < this.cartItems.length; i++) {
          if (this.checkedValues.includes(this.cartItems[i].cartItemId)) {
            selectCartItemId.push(this.cartItems[i].cartItemId)
            selectCartItemId.push(category)
          }
        }
        console.log('itemId: ' + selectCartItemId)
        await this.requestDeleteCartToSpring({ selectCartItemId })
        window.location.reload(true);
      }
    },
    // 모달을 열기 위한 메서드
    // openModal() {
    //   this.showModal = true;
    // },
    // 모달을 닫기 위한 메서드
    closeModal() {
      this.showModal = false;
    },
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
    totalPrice() {
      let sum = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.checkedValues.includes(this.cartItems[i].cartItemId)) {
        sum += this.cartItems[i].totalPrice;
        }
      }
      return sum;
    },
    //셀프 샐러드 개수
    selfSaladCount() {
      return this.cartItems.filter(item => item.category === 'SELF_SALAD').length;
    },
    //완제품 개수
    ProductCount() {
      return this.cartItems.filter(item => item.category === 'PRODUCT' || item.category === 'SIDE').length;
    },
    allChecked: {
      get() {
        return this.checkedValues.length === this.cartItems.length;
      },
      set(value) {
        this.toggleAll(value);
      }
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

table tr:hover {
  background-color: #f5f5f5;
}

th,
td {
  padding: 0.5rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

th {
  border-bottom: 2px solid #848e98;
}

table th {
  font-weight: bold;
  text-align: center;
}
.sticky-nav {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: hsl(204, 12%, 58%);
}
</style>