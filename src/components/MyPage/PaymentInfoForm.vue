<template>
  <v-container>
    <div class="fly">
      <v-card class="pt-3 pl-3 pb-3" outlined style="background-color: #F2F2F2; font-size: 15px;">
        <div v-for="(Items, id) in orderList" :key="id">
          <span>주문 금액<span style="text-align:right;display: inline-block; width: 150px">{{Items.totalPrice | comma}}원</span></span><br>
          <span class="ml-3 mt-3" style="display: inline-block; font-size: 12px; color: #A4A4A4">⨽ 상품개수 <span style="text-align:right;display: inline-block; width: 134px">{{Items.selectedItems.length}}개</span></span><br>
          <span class="ml-3" style="font-size: 12px; color: #A4A4A4">⨽ 할인금액 <span style="text-align:right;display: inline-block; width: 134px">0원</span></span><br>
          <span class="pt-3 pb-3" style="display: inline-block;">배송비
            <span v-if="Items.totalPrice >= 50000" style="text-align:right;display: inline-block; width: 160px">0원</span>
            <span v-else style="text-align:right;display: inline-block; width: 160px">3,000원</span>
          </span><br>
          <v-divider />
          <span class="pt-3" style="display: inline-block;">총 결제금액
            <span v-if="Items.totalPrice >= 50000" style="text-align:right;display: inline-block; width: 126px">{{Items.totalPrice | comma}}원</span>
            <span v-else style="text-align:right;display: inline-block; width: 126px">{{Items.totalPrice + 3000 | comma}}원</span>
          </span>
        </div>
      </v-card>
    </div>
    
    <v-card>
        <v-card-title style="background-color: white; align-items: center;">
          <span style="font-size: 30px; font-weight: bold; color: black;">Order / Payment</span>
          <v-spacer></v-spacer>
          <router-link :to="{name: 'MyShoppingCartPage'}" style="text-decoration: none;">
            <p style="font-size: 10px; font-weight: bold; color: black; margin-right: 5px;">장바구니 > </p>
          </router-link>
            <p style="font-size: 12px; font-weight: bold; color: black; margin-right: 5px;"> 주문서 </p>
            <p style="font-size: 10px; font-weight: bold; color: black;"> > 주문완료</p>
        </v-card-title>
        <v-card-text>
          <table>
            <thead>
              <tr style="margin-top: 20px;">
                <th>상품명</th>
                <th>판매가</th>
                <th>수량</th>
                <th>주문 금액</th>
              </tr>
            </thead>
            <tbody>
                <template v-for="(Items) in orderList">
                  <tr v-for="(Item, idx) in Items.selectedItems" :key=idx>
                    <td style="text-align: center;">
                      <v-img :src="Item.category.includes('SELF') ? require(`@/assets/logo/3sss.jpg`) : require(`@/assets/product/${Item.editedImg}`)"
                      style="max-width: 100px; max-height: 100px; display: block; margin: 0 auto;" />
                      <div style="font-weight: bold;">{{ Item.title }}</div>
                    </td>
                    <td>{{ Item.totalPrice | comma }}원</td>
                    <td>{{ Item.quantity }}</td>
                    <td>{{ Item.totalPrice * Item.quantity | comma }}원</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </v-card-text>
        </v-card>
      </v-container>

      <h3>주문/결제 하기</h3>
      <v-divider class="mt-3 mb-3"/>


        <v-row class="member-row" >
          <p class="member-tool" style="text-align: left" >주문하는분 닉네임 
            : [ {{ this.$store.state.memberModule.memberInfoAboutSignIn.userNickName }} ]
          </p>
        </v-row>
        <v-divider class="mt-1 mb-3"/>

        <v-row class="member-row" >
          <p class="member-tool" style="text-align: left">이메일
          : [ {{ this.$store.state.memberModule.memberInfoAboutSignIn.userEmail }} ] </p>
        </v-row>
        <v-divider class="mt-1 mb-3"/>
      
        <v-row class="member-row" >
          <p class="member-tool" style="text-align: left" >배송지</p>
            <div class="my-tabs">

                  <span>
                    <input type="radio" id="defaultType" name="deliveryType" checked @change="showDefaultDelivery">
                    <label for="defaultType">기본배송지</label>
                  </span>
                  
                  <span>
                    <input type="radio" id="deliveryTypeNew" name="deliveryType" @change="showNewDelivery">
                    <label for="deliveryTypeNew">신규배송지</label>
                  </span>
            </div>
            <button @click="showAddresList">배송지 목록</button>
        </v-row>

          <v-row class="hi">
            <v-col cols="12">
              <v-text-field label="도로명" v-model="cityDefault" readonly></v-text-field>
              <v-text-field label="지번" v-model="streetDefault" readonly></v-text-field>
              <v-text-field label="상세주소" v-model="addressDetailDefault" readonly></v-text-field>
              <v-text-field label="우편번호" v-model="zipcodeDefault" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row class="bye" style="display:none">
            <v-col cols="12">
              <div class="btn-address">
                <v-btn @click="KakaoAddressApi" color="#609966" dark>주소검색</v-btn>
              </div>
              <v-text-field label="도로명" v-model="city" readonly></v-text-field>
              <v-text-field label="지번" v-model="street" readonly></v-text-field>
              <v-text-field label="우편번호" v-model="zipcode" readonly></v-text-field>
              <v-text-field label="상세주소" v-model="addressDetail"  type="text"></v-text-field>
              <v-text-field label="수령인" v-model="name"></v-text-field>
              <v-text-field label="연락처" v-model="phone"></v-text-field>
            <v-btn @click="registerAddress">등록</v-btn>

            </v-col>
          </v-row>

        <v-divider class="mb-10"/>

      <v-divider class="mt-3 mb-3"/>
      
      
        <v-card>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headLine">
              <h4>결제 수단</h4>
              <v-divider class="mt-3" color="black"></v-divider>
            <div class="mb-3">
              <v-btn-toggle v-model="selectedPayment" mandatory color=#dd333 variant="outlined">
                <v-btn value="kakao">카카오페이</v-btn>
                <v-btn value="creditCard">신용카드</v-btn>
              </v-btn-toggle>
            </div>

            <v-row justify="center" v-if="selectedPayment === 'kakao'">
              <v-sheet class="mt-5 mb-5" rounded :heigh="150" :width="180" color="yellow">
                <v-img></v-img>
              </v-sheet>
            </v-row>
            <v-row justify="center" v-if="selectedPayment === 'creditCard'">
              <v-sheet class="mt-5 mb-5" rounded :heigh="150" :width="200">
                <v-img></v-img>
              </v-sheet>
            </v-row>

            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      


        <div class="pay">
          <v-btn color=#d333  @click="KakaoPay()">
            <v-icon>mdi-credit-card-check-outline</v-icon>
            <strong>결제하기</strong>
          </v-btn>
          <!-- <v-btn color=#d333 v-else-if="selectedPayment === 'credit-card'" @click="cardPay">
            <v-icon>mdi-credit-card-check-outline</v-icon>
            <strong>결제하기</strong>
          </v-btn>
          <v-btn color=#d333 v-else disabled>
            <v-icon>mdi-credit-card-check-outline</v-icon>
            <strong>결제하기</strong>
          </v-btn> -->
        </div>
  </div>
</template>

<script>

const IMP = window.IMP; // 생략 가능
IMP.init("imp38785014");

import {mapActions, mapState} from "vuex";
import axios from 'axios'
import { arrayExpression } from "@babel/types";

// const paymentModule = 'paymentModule'
const ordercartModule = 'ordercartModule'
const memberModule = 'memberModule'

import PaymentInfoPage from "@/views/MyPage/PaymentInfoPage.vue";

export default {
  name: "PaymentInfoForm",
  components: { PaymentInfoPage },
  props: {
    selectedItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(ordercartModule, [
              // "reqOrderPageDeliveryListToSpring"
    ]),
    ...mapState(ordercartModule, [
      'orderList'
    ]),
    incQuantity(idx) {
      this.cartItems[idx].quantity++
      const itemId = this.cartItems[idx].cartItemId
      const quantity = 1
      this.$emit('onModify', { itemId, quantity })
    },
    descQuantity(idx) {
      if (this.cartItems[idx].quantity > 1) {
        this.cartItems[idx].quantity--
        const itemId = this.cartItems[idx].cartItemId
        const quantity = -1
        this.$emit('onModify', { itemId, quantity })
      }
    },
    selectAll() {
      this.allSelected = !this.allSelected;
      this.cartItems.forEach(item => (item.selected = this.allSelected));
    },
    //모달창 열고 카트 아이디 보내주기
    openModal(idx) {
      this.cartItemId = idx
      this.showModal = true;
      this.$emit('onSSSModify', idx)

    },
    toggleAll(value) {
      this.checkedValues = value ? this.cartItems.map(cartItem => cartItem.cartItemId) : [];
      //카트 아이템 아이디 리스트로 담아줌
      console.log(this.checkedValues)
    },
    // 모달을 닫기 위한 메서드
    closeModal() {
      this.showModal = false;
    },
    // 라디오버튼 'hi', 'bye' 클릭
    showDefaultDelivery() {
      this.defaultDelivery = true;
      document.querySelector('.hi').style.display = 'flex';
      document.querySelector('.bye').style.display = 'none';
    },
    showNewDelivery() {
      this.defaultDelivery = false;
      document.querySelector('.hi').style.display = 'none';
      document.querySelector('.bye').style.display = 'flex';
    },
    showAddresList() {
      const addressList = document.createElement("div");
      addressList.id = "address-list";
      addressList.innerHTML = `
      <ul>
        <li>${this.$store.state.memberModule.memberInfoModify.city}</li>
      </ul>
      `;
      const newWindow = window.open("", "배송지 목록", "width=300, height=200");
      newWindow.document.body.appendChild(addressList);
    },
    registerAddress() {
      const data= {
        userId: '',
        address: {
          name: this.$store.state.memberModule.memberInfoAboutSignIn.userNickName,
          phone: this.phone,
          address: this.address
        }
      }
      axios.put('/member/profile-address/register/' + data.userId, data.address)
      .thes(response => {
        console.log('Address registered:', response.data)
      })
      .catch(error => {
        console.log('등록실패:', error)
      })
    },
    setDeliveryRequest () {
      const addressId = 1
      const recipient = '김창주'
      const deliveryMemo= '배송 메모'
      const zipcode = '01303'
      const city = '서울 강북구 삼양로 123길 1(수유동)'
      const street = '서울 강북구 수유동 287'
      const addressDetail = '14'

      let deliveryRegisterRequest = {
        addressId: null,
        recipient: null,
        deliveryMemo: null,
        zipcode: null,
        city: null,
        street: null,
        addressDetail: null,
      };
      // 배송정보 주소id, recipient, deliverymemo = deliveryRegisterRequest
      return deliveryRegisterRequest = {
        addressId,
        recipient,
        deliveryMemo,
        zipcode,
        city,
        street,
        addressDetail,
       }
    },
    setOrderItemRequest() {
      // 아이템등록 category, itemId, quantity  = orderItemRegisterRequestList
      const selectedItems = this.$store.state.ordercartModule.orderList.orderSave.selectedItems;
      const orderItemRegisterRequestList = [] 
      for (let i = 0; i < selectedItems.length; i++) {
        this.orderItemRegisterRequestList.push({
            itemId: selectedItems[i].cartItemId,
            category: selectedItems[i].category,
            quantity: selectedItems[i].quantity
        });
      }
    },
    setPaymentRequest() {
      let paymentRequest = {
        merchant_uid: null,
        imp_uid: null,
        pay_method: null,
        paid_amount: null,
      };

      const merchant_uid = this.merchant_uid
      const imp_uid = 'imp38785014'
      const pay_method = 'kakaoPay'
      const paid_amount = this.$store.state.ordercartModule.orderList.orderSave.totalPrice + this.deliveryFee

     
       // 결제정보 merchant_id, imp_uid, pay_method, paid_amount, paid_at = paymentRequest
      return paymentRequest = {
        merchant_uid, imp_uid, pay_method, paid_amount
      }
    },
    KakaoPay: function () {
      this.randomNumber = Math.floor(Math.random() * 100000000);
      while (this.usedNum.includes(this.randomNumber)) {
          this.randomNumber = Math.floor(Math.random() * 100000000);
      }
      this.usedNum.push(this.randomNumber);

      // 결제 금액 totalPrice + deliveryFee = totalOrderPrice
      const totalPrice = this.$store.state.ordercartModule.orderList.orderSave.totalPrice
      const deliveryFee = totalPrice < 50000 ? 3000 : 0;

      const email = this.$store.state.memberModule.memberInfoAboutSignIn.userEmail
      IMP.request_pay({ //param
          pg: "kakaopay.TC0ONETIME",
          pay_method: "kakaopay",
          merchant_uid: this.merchant_uid + this.randomNumber,
          name: 'SSS',
          amount : totalPrice + deliveryFee, // 결제금액 this.totalPrice + this.deliveryFee
          buyer_email: email, //this.$store.state.memberModule.memberInfoAboutSignIn.userEmail,
          buyer_name: this.$store.state.memberModule.memberInfoAboutSignIn.userNickName,
          buyer_tel: '010-1212-1212',
          buyer_addr: "서울특별시 강남구 신사동",
          buyer_postcode: "001-181",
  
  
      }, rsp => { // callback
          if (rsp.success) {
            // 결제 성공 시
            let imp_uid = rsp.imp_uid
            this.merchant_uid += this.randomNumber
            this.usedNum.push(this.randomNumber)

            
            this.setOrderItemRequest()
            

            const totalPrice = this.$store.state.ordercartModule.orderList.orderSave.totalPrice  
            const deliveryFee = totalPrice < 50000 ? 3000 : 0;

            //결제 총 금액
            const totalOrderPrice = totalPrice + deliveryFee

            //결제정보
            const paymentRequest = this.setPaymentRequest()

            // 배송지 정보 
            const deliveryRegisterRequest = this.setDeliveryRequest()
            // 상품정보 
            const orderItemRegisterRequestList = this.orderItemRegisterRequestList


            this.$emit("payment-success", { totalOrderPrice, deliveryRegisterRequest, paymentRequest, orderItemRegisterRequestList })
            
            } else {
                // 결제 실패 시
                alert ("결제에 실패했습니다. 다시 시도해주세요.")
              }
          });
    },
      KakaoAddressApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullRoadAddr = data.roadAddress;
          let extraRoadAddr = '';

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr;
          }

          this.zipcode = data.zonecode;
          this.city = fullRoadAddr;
          this.street = data.jibunAddress;
          this.addressPass = true;

        }
      }).open()
    },
  },  
  filters: {
  comma(val) {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  // created() {
  //   if(this.$route.query.selectedItems){
  //     try { 
  //       let selectedItems = JSON.parse(this.$route.query.selectedItems);
  //       console.log(selectedItems);
  //     } catch (e) {
  //       console.error("selectedItems 데이터가 유효하지 않습니다.", e);
  //     }
  //   } else {
  //     console.log("selectedItems 데이터가 전달되지 않았습니다.")
  //   }
    
  // },
  computed : {

    ...mapState(ordercartModule,[
      'orderList'
    ]),
    ...mapState(memberModule,[
      'MemberProfile',
      'memberInfoModify'
  ]),
  },
  data() {
    return{
      orderItemRegisterRequestList : [],
      selectedPayment: null,
        dialog: false,
        selectedOption: "",
        merchant_uid : 'ORD',
        randomNumber : 0,
        usedNum : [],
        lsDeliveryList: [],
        selectedAddress: null,

      cartItems: {
        type: arrayExpression,
        require: true,
      },
      checkedValues: [],
      showModal: false,
      cartItemId: 0,
      deliveryFee: 3000,

      selectedPayment: null,
      DEFAULT_DESTINATION_TYPE: "default",
      NEW_DESTINATION_TYPE: "new",
      selectedDestinationType: "default",
      defaultDestination: {
        name: "",
        phone: "",
        address: "",
      },
      newDestination: {
        name: "",
        phone: "",
        address: "",
      },
      setAddress: false,
      setDestination: true,
      paymentPrice: 0,
      totalCount: 0,
      nonDiscountPrice: 0,
      person: '',
      name: '',
      address: '',
      addressDetail: '',
      phone: '',
      product: [],
      defaultDelivery: true, // 기본 배송지 선택 여부
      showNew: false,
      deliveryList: [],
      cityDefault: this.$store.state.memberModule.memberInfoModify.city,
      streetDefault: this.$store.state.memberModule.memberInfoModify.street,
      addressDetailDefault: this.$store.state.memberModule.memberInfoModify.addressDetail,
      zipcodeDefault: this.$store.state.memberModule.memberInfoModify.zipcode ,
      addressPass: false,

    }
  },
}
</script>

<style scoped>
.member-info-card .member-row {
  margin-top: 10px;
  margin-left: 20px;
}
.member-info-card .member-request-direct {
  margin-right: 20px;
  margin-left: 190px;
}
.member-info-card .member-row .member-tool{
  font-size: 14px;
  font-weight: bold;
  width: 170px;
  margin-right: 0px;
  padding-right: 0px;
}
.member-info-card .member-row .member-info{
  font-size: 14px;
}
.member-info-card .member-row .member-request-select{
  padding: 0px !important;
  max-width: 500px;
  font-size: 14px;
  min-height: 20px !important;
}
.fly {
  position: fixed;
  z-index: 9999;
  left: 40%;
  top: 1px;
  width: 250px;
  height: 210px;
  margin-top: 200px;
  margin-left: 650px;
}
.my-tabs span + span {
    margin-left: 50px;
}
.pay{
  margin-left: 250px;
}

h2 {
  margin-left: 220px;
}
.btn-address{
  margin-left: -5px;
  padding-bottom: 5px;
}
.pay {
  margin-top: 20px;
  margin-left: -1px;
}
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
.sticky-nav {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: hsl(204, 12%, 58%);
}
</style>