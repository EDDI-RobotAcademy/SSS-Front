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
                    <td>{{ Item.totalPrice / Item.quantity | comma }}원</td>
                    <td>{{ Item.quantity }}</td>
                    <td>{{ Item.totalPrice | comma }}원</td>
                  </tr>
                </template>
            </tbody>
          </table>
        </v-card-text>
      </v-card>
        
          <v-dialog v-model="showModal" width="800"  @change="showNewDelivery">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                      <div class="text-h4 font-weight-black">신규 배송지 등록</div>
                    <v-btn @click="KakaoAddressApi" color="#609966" dark>주소검색</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex" style="width: auto;">
                      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">우편 번호</p>
                      <v-text-field v-model="zipcode" type="text" :disabled="false" outlined dense required style="width: auto; max-width: 600px; font-size: 17px;"/>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex" style="width: auto;">
                      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">도로명 주소</p>
                      <v-text-field v-model="city" type="text" :disabled="false" outlined dense required style="width: 600px; font-size: 17px;"/>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex" style="width: auto;">
                      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">지번 주소</p>
                      <v-text-field v-model="street" type="text" :disabled="false" outlined dense required style="width: 600px; font-size: 17px;"/>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex" style="width: auto;">
                      <p style="font-size: 17px; color: #40513B; padding-right: 30px; padding-top: 7px; min-width: 120px;">상세 주소</p>
                      <v-text-field v-model="addressDetail" type="text" :disabled="false" outlined dense required style="width: 600px; font-size: 17px;"/>            
                    </div>
                  </v-col>
                  <v-btn @click="registerAddress">주소등록</v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>

        <div style="margin-top: 20px;">
          <v-btn @click="showAddresList">배송지 목록 확인하기</v-btn>
        </div>


        <div class="d-flex justify-content-between">
          <div class="shipping_box1" style="width: 48%; display: inline-block;">
            <div class="shipping_box1_line1">
              <div class="shipping_txt">
                <span>
                  <input type="radio" name="radio" checked>
                  <label for="defaultType">기본 배송지</label>
                </span>
                <span>기본</span>
              </div>
            </div>

            <div class="shipping_box1_line2">
              <label for="name" class="form-label">받으시는 분<span style="color: red;">*</span></label>
              <input type="text" id="name" class="form-input"/>
              <label for="phone" class="form-label">연락처<span style="color: red;">*</span></label>
              <input type="tel" id="phone" class="form-input"/>
              <span>[{{ zipcodeDefault }}] {{ cityDefault }} {{addressDetailDefault}}</span>
            </div>
            <div class="shipping_delivery_detail">
              <select id="selection" class="form-select" v-model="selectedOption">
                <option hidden>배송 메모를 선택해주세요.</option>
              <option>부재시 핸드폰으로 연락주세요.</option>
              <option>부재시 경비실에 맡겨주세요.</option>
              <option>배송전에 연락주세요.</option>
              <option>택배보관함에 보관해주세요.</option>
              <option disabled></option>
              <option value="direct">직접 입력</option>
            </select>
              <textarea v-if="selectedOption === 'direct'"
              style="width: 100%; height: 70px; border: 1px solid #ccc;
              border-radius: 5px; margin-top: 10px;"
              maxlength="20"
              placeholder="최대 20자까지 입력 가능합니다."
              v-model="directEntryText"
              ></textarea>
          </div>
          </div>
          <div class="shipping_box1" style="width: 48%; display: inline-block;" @click="openModal()">
            <div class="shipping_box1_line1">
              <div class="shipping_txt">
                <span>
                  <input type="radio" name="radio">
                  <label for="defaultType">신규 배송지</label>
                </span>
              </div>
            </div>
            <div class="shipping_box1_line2">
              <label for="name" class="form-label">받으시는 분<span style="color: red;">*</span></label>
              <input type="text" id="name" class="form-input"/>
              <label for="phone" class="form-label">연락처<span style="color: red;">*</span></label>
              <input type="tel" id="phone" class="form-input"/>
              <span> </span>
            </div>
            <div class="shipping_delivery_detail">
              <select id="selection" class="form-select" v-model="selectedOption2">
                <option hidden>배송 메모를 선택해주세요.</option>
              <option>부재시 핸드폰으로 연락주세요.</option>
              <option>부재시 경비실에 맡겨주세요.</option>
              <option>배송전에 연락주세요.</option>
              <option>택배보관함에 보관해주세요.</option>
              <option disabled></option>
              <option value="direct2">직접 입력</option>
            </select>
              <textarea v-if="selectedOption2 === 'direct2'"
              style="width: 100%; height: 70px; border: 1px solid #ccc;
              border-radius: 5px; margin-top: 10px;"
              maxlength="20"
              placeholder="최대 20자까지 입력 가능합니다."
              v-model="directEntryText2"
              ></textarea>
          </div>
          </div>
        </div>
      
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
        <v-btn color=#d333 v-if="selectedPayment === 'kakao'" @click="KakaoPay()">
          <v-icon>mdi-credit-card-check-outline</v-icon>
          <strong>결제하기</strong>
        </v-btn>
        <v-btn color=#d333 v-else-if="selectedPayment === 'creditCard'" @click="cardPay()">
          <v-icon>mdi-credit-card-check-outline</v-icon>
          <strong>결제하기</strong>
        </v-btn>
        <v-btn block color="teal" v-else disabled>
            <v-icon>mdi-credit-card-check-outline</v-icon>
            <strong>결제하기</strong>
        </v-btn>
      </div>
      </v-container>
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

  methods: {
    ...mapActions( memberModule, [
    'requestUpdateMemberInfoToSpring',
    ]),
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
    showNewDelivery() {
      this.defaultDelivery = false;
      document.querySelector('.hi').style.display = 'none';
      document.querySelector('.bye').style.display = 'flex';
    },
    // 신규 배송지 주소 등록
    registerAddress() {
      const zipcode= this.zipcode
      const city= this.city
      const street= this.street
      const addressDetail= this.addressDetail
      
      this.$emit("submit", { zipcode, city, street, addressDetail });
    },
    setDeliveryRequest () {
      // const addressId = 1
      // const recipient = '김창주'
      // const deliveryMemo= '배송 메모'
      const addressId = ''
      const recipient = ''
      const deliveryMemo= ''
      const recipientPhone=''


      // const zipcode = '01303'
      // const city = '서울 강북구 삼양로 123길 1(수유동)'
      // const street = '서울 강북구 수유동 287'
      // const addressDetail = '14'

      let deliveryRegisterRequest = {
        addressId: null,
        // recipient: null,
        // deliveryMemo: null,
        // recipientPhone: null,
        // zipcode: null,
        // city: null,
        // street: null,
        // addressDetail: null,
      };
      // 배송정보 주소id, recipient, deliverymemo = deliveryRegisterRequest
      return deliveryRegisterRequest = {
        addressId,
        recipient: '',
        deliveryMemo:'',
        recipientPhone:'',
        // zipcode,
        // city,
        // street,
        // addressDetail,
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

      let itemId;
      switch (selectedItems[i].category) {
        case "PRODUCT":
          itemId = selectedItems[i].productId;
          break;
        case "SIDE":
          itemId = selectedItems[i].sideProductId;
          break;
        case "SELF":
          itemId = selectedItems[i].selfSaladId;
          break;
        default:
          itemId = null;
          break;
      }

      this.orderItemRegisterRequestList.push({
          itemId,
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
      const pay_method = ''
      const paid_amount = this.$store.state.ordercartModule.orderList.orderSave.totalPrice + this.deliveryFee
           
       // 결제정보 merchant_id, imp_uid, pay_method, paid_amount, paid_at = paymentRequest
      return paymentRequest = {
        merchant_uid, imp_uid, pay_method, paid_amount
      }
    },
    cardPay: function () {
      this.randomNumber = Math.floor(Math.random() * 100000000);
      while (this.usedNum.includes(this.randomNumber)) {
          this.randomNumber = Math.floor(Math.random() * 100000000);
      }
      this.usedNum.push(this.randomNumber);

      // 결제 금액 totalPrice + deliveryFee = totalOrderPrice
      const totalPrice = this.$store.state.ordercartModule.orderList.orderSave.totalPrice
      const deliveryFee = totalPrice < 50000 ? 3000 : 0;

      const email = this.$store.state.memberModule.memberInfoAboutSignIn.userEmail
            
      IMP.request_pay({ // param
          pg: "html5_inicis.INIpayTest",
          pay_method: "card",
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
              paymentRequest.pay_method = 'card'

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
            paymentRequest.pay_method = 'kakaoPay'
                        
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
  }
},
  filters: {
  comma(val) {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  },
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
      selectedOption: '배송 메모를 선택해주세요.',
      directEntryText: '',
      selectedOption2: '배송 메모를 선택해주세요.',
      directEntryText2: '',
      orderItemRegisterRequestList : [],
      selectedPayment: null,
        dialog: false,
        merchant_uid : 'ORD',
        randomNumber : 0,
        usedNum : [],
        lsDeliveryList: [],
        selectedAddress: null,

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
      zipcode: '',
      city: '',
      street: '',
      addressDetail: '',
      setAddress: false,
      setDestination: true,
      paymentPrice: 0,
      totalCount: 0,
      nonDiscountPrice: 0,
      person: '',
      address: '',
      addressDetail: '',
      product: [],
      defaultDelivery: true, // 기본 배송지 선택 여부
      showNew: false,
      deliveryList: [],
      cityDefault: this.$store.state.memberModule.memberInfoModify.city,
      streetDefault: this.$store.state.memberModule.memberInfoModify.street,
      addressDetailDefault: this.$store.state.memberModule.memberInfoModify.addressDetail,
      zipcodeDefault: this.$store.state.memberModule.memberInfoModify.zipcode ,
      addressPass: false,
      city: '',
      street: '',
      street: '',
      addressDetail: '',
      buyer_name: '',

      phoneNumber: '',
      recipient: '',
  }
  }
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
.shipping_box1 {
  padding: 24px 20px;
  border: 2px solid #dddddd;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 10px;
}

.shipping_box1_line1 {
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.shipping_box1_line2 {
  display: block;
  margin-top: 5px;
}

.shipping_delivery_detail {
  margin-top: 10px;
  padding-top: 10px;
  display: block;
}

.shipping_txt {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px ;
}

.shipping_txt span:nth-child(1),
.shipping_font {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: -.6px;
  color: #333;
  margin-right: 10px;
}

.shipping_txt span:nth-child(2),
.shipping_txt span:nth-child(3) {
  display: inline-block;
  height: 16px;
  border: 1px solid #11b082;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -.5px;
  color: #fff;
  padding: 0 10px;
  margin-right: 5px;
  background-color: #11b082;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>