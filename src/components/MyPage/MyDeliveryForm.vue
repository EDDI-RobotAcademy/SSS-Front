<template>
  <v-card flat style="width: 100%">
    <div class="search-bar">
      <button class="btn" @click="searchLastYear">최근 1년</button>
      <button class="btn" @click="searchLastWeek">최근 1주일</button>
      <button class="btn" @click="searchLast3Months">최근 3개월</button>
        <div class="date-input">
          <input type="date" class="input" v-model="dateRange.start">
          <span class="date-separator">~</span>
          <input type="date" class="input" v-model="dateRange.end">
        </div>
        <v-text-field v-model="searchQuery" style="width: 300px; margin-right: 20px;" type="text" placeholder="찾고싶은 제품을 입력하세요"/>
        <v-btn style="background-color: #609966; color: white;" type="submit" @click="searchDate">
        검색
      </v-btn>
    </div>

    <v-card-text>
      <v-container style="width: 1000px">
        <div v-if="!completeOrders || (Array.isArray(completeOrders) && completeOrders.length === 0)" style="margin-top: 50px" align="center">
          <h2>주문 내역이 없습니다.</h2>
        </div>
        <div v-else>
          <v-card>
            <v-card-title style="background-color: white">
              <span style="font-size: 30px; font-weight: bold; color: black;">주문 내역</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <table> 
                <thead style="margin-top: 20px; background-color:#739e42; color:white">
                  <tr>
                    <th>주문 번호</th>
                    <th>주문 일자</th>
                    <th>주문 상품</th>
                    <th>결제 금액</th>
                    <th>주문 상태</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-for="completeOrder in completeOrders" :key="completeOrder.orderId">
                  <td>{{ completeOrder.merchant_uid }}</td>
                  <td>{{ completeOrder.paid_at | formatDate }}</td>
                  <td>{{ completeOrder.itemResponse[0].title }}</td>
                  <td>{{ completeOrder.paid_amount | comma }}원</td>
                  <td>{{ completeOrder.orderStateType == "PAYMENT_COMPLETE" ? "결제완료" : completeOrder.orderStateType }}
                 
                  </td>
                  <td>
                    <my-delivery-detail-form :completeOrder="completeOrder"/><br>
                    <v-btn v-if="completeOrder.orderStateType == 'PAYMENT_COMPLETE'" 
                        @click="writeReview(completeOrder.itemResponse[0].perId)" color="#739e42" small dark>후기작성</v-btn>
                      <v-dialog v-if="completeOrder.orderStateType == 'PAYMENT_COMPLETE'" v-model="reviewDialog" width="650">
                        <review-register-form :product="product" :completeOrder="completeOrder"/>
                      </v-dialog>
                    </td>
                 
                            
                </tbody>
              </table>
            </v-card-text>
            <!--주문 상세 내역 폼 만들기-->
          </v-card>
        </div>
      </v-container>

  </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ReviewRegisterForm from '@/components/Product/review/ReviewRegisterForm.vue'
import MyDeliveryDetailForm from '@/components/MyPage/MyDeliveryDetailForm.vue'

const ordercartModule = 'ordercartModule'
const productModule = 'productModule'

export default {
  name: "MyDeliveryForm",
  components: {ReviewRegisterForm, MyDeliveryDetailForm },
  data() {
    return {
      reviewDialog: false,
      searchQuery: '',
      searchBy: 'title',
      dateRange: {
        start: null,
        end: null
      },
    }
  },
  computed: {
    ...mapState(ordercartModule, [
      'completeOrders'
    ]),
    ...mapState(productModule, [
      'product'
    ])
  },
  mounted() {
    this.reqMyOrderListToSpring()
    console.log("주문내역")
    // flatPickr(this.$refs.datepicker, {
    //   mode: 'range',
    //   dateFormat: 'Y.m.d',
    //   onClose: this.searchByDate
    // }),
  },
  methods: {
    ...mapActions(ordercartModule, [
      'reqMyOrderListToSpring'
    ]),
    ...mapActions(productModule, [
      'requestProductToSpring'
    ]),
    async showOrderDetails(orderId, index) {
      this.orderId = orderId
      this.completeOrderIndex = index
      this.showOrderDetail = true
      await this.reqOrderedListFromSpring(paymentId)
    },
    searchByDate(selectedDates) {
      // 선택한 날짜 범위로 검색 로직
    },
    searchLastYear() {
      // 최근 1년 검색 로직
    },
    searchLastWeek() {
      // 최근 1주일 검색 로직
    },
    searchLast3Months() {
      // 최근 3개월 검색 로직
    },
    searchDate(){
      // 입력한 날짜 범위로 검색 로직
        const query = this.searchQuery.toLowerCase();
        if (query === '') {
          this.dpitems = this.products;
        } else {
          if (this.searchBy === 'title') { 
            this.dpitems = this.products.filter(product => product.title.toLowerCase().includes(query));
          }
        }
        this.currentPage = 1;
      },
      writeReview(productId) {
        this.reviewDialog = true
        this.requestProductToSpring(productId)
      },
  },
  created () {
      if (this.products && this.products.length > 0) {
        this.searchProducts();
      }
    },
    watch: {
      products() {
        if (this.products && this.products.length > 0) {
          this.searchProducts();
        }
      },
    },
  filters: {
      comma(val) {
        return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      formatDate(value) {
        const date = new Date(value);
        const year = date.getFullYear();
        
        let month = date.getMonth() + 1;
        month = month > 9 ? month : `0${month}`;

        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let hours = date.getHours();
        hours = hours > 9 ? hours : `0${hours}`;
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }  
  },
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

th,
td {
  padding: 0.5rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  text-align: center;
  vertical-align: middle;
}

th {
  border-bottom: 2px solid #848e98;
}

table th {
  font-weight: bold;
  text-align: center;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.btn {
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}

.btn:hover {
  background-color: #7c95af;
}


.input {
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
}


.calendar-input .input {
  width: 200px;
}

.calendar-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.calendar-icon i {
  font-size: 20px;
  color: #007bff;
  cursor: pointer;
}
</style>