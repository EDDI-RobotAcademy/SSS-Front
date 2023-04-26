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
      <!-- <v-container style="width: 1000px">
        <div style="margin-top: 50px" align="center">
          <h2>주문 내역이 없습니다.</h2>
        </div>
      </v-container> -->

      <v-container>
        <v-card>
          <v-card-title style="background-color: white">
            <span style="font-size: 30px; font-weight: bold; color: black;">Delivery</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <table>
              <thead>
                <tr style="margin-top: 20px;">
                  <th>전체 개</th>
                  <th colspan="2">상품 정보</th>
                  <th>주문 일자</th>
                  <th>주문 금액(수량)</th>
                  <th>주문 상태</th>
                  <th>배송비/배송 형태</th>
                </tr>
              </thead>
              <tbody>
                <template>
                  <tr>
                    <td></td>
                  <td>
                    <!-- <router-link :to="{ name: 'ProductReadPage', params: { productId: cartItem.productId.toString() } }">
                    </router-link> -->
                    <!-- <v-img :src="cartItem.category.includes('SELF') ?
                    require(`@/assets/logo/3sss.jpg`) :
                    require(`@/assets/product/${cartItem.editedImg}`)"
                    style="max-width: 100px; max-height: 100px;" /> -->
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <p></p>
                  </td>
                  <td>
                  </td>
                  <td style="text-align: center;">
                  </td>
                </tr>
                </template>
              </tbody>
            </table>
          </v-card-text>
        </v-card>
      </v-container>
  </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "MyDeliveryForm",
  // components: {ReviewModifyForm},
  data() {
    return {
      searchQuery: '',
      searchBy: 'title',
      dateRange: {
        start: null,
        end: null
      }
    }
  },
  mounted() {
    flatPickr(this.$refs.datepicker, {
      mode: 'range',
      dateFormat: 'Y.m.d',
      onClose: this.searchByDate
    })
  },
  methods: {
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
      }
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