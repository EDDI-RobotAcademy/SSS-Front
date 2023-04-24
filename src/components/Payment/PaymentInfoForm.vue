<template>
  <div class="white" style="font-family: Arial" @submit.prevent="KakaoPay" ref="form">
    <v-container style="width: 75%; margin-left: 218px">
      <div class="fly">
        <p style="font-weight: bold; font-size: 17px">
          결제정보
        </p>
        <v-card class="pt-3 pl-3 pb-3" style="background-color: #F2F2F2; font-size: 15px" outlined>
          <span>상품금액<span style="text-align:right;display: inline-block; width: 150px">{{ paymentPrice}}원</span></span><br>
          <span class="ml-3 mt-3" style="display: inline-block; font-size: 12px; color: #A4A4A4">⨽ 상품금액 <span style="text-align:right;display: inline-block; width: 134px">{{nonDiscountPrice}}원</span></span><br>
          <span class="ml-3" style="font-size: 12px; color: #A4A4A4">⨽ 할인금액 <span style="text-align:right;display: inline-block; width: 134px">{{nonDiscountPrice - paymentPrice}}원</span></span><br>
          <span class="pt-3 pb-3" style="display: inline-block;">배송비
            <span v-if="this.paymentPrice  >= 50000" style="text-align:right;display: inline-block; width: 160px">0원</span>
            <span v-else style="text-align:right;display: inline-block; width: 160px">{{ deliveryFee }}원</span>
          </span><br>
          <v-divider/>
          <span class="pt-3" style="display: inline-block;">총 결제금액
            <span v-if="this.paymentPrice  >= 50000" style="text-align:right;display: inline-block; width: 126px">{{totalPrice}}원</span>
            <span v-else style="text-align:right;display: inline-block; width: 126px">{{ totalPrice + deliveryFee }}원</span></span>
        </v-card>
      </div>

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

    
    <!-- 주문 상품 및 가격 정보
    <v-col>
      <v-card class="me-8 pa-5" flat outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline">
                    <div>
                        <p>주문 상품</p>
                        <v-divider class="mt-3" color="black"></v-divider>    
                    </div>
                </v-list-item-title>
                <div v-if="orderList.orderSave.directOrderCheck">
                    <v-row v-for="(orderItem, index) in orderList" :key="index">
                        <v-col cols="3">
                            <v-list-item-avatar class="d-flex justify-start" tile size="100">
                                <v-img/>
                            </v-list-item-avatar>
                        </v-col>
                        <v-col>
                            <v-card-text>
                                <div><h5><strong>{{ orderItem.product.productName }}</strong></h5></div>
                                <p></p>
                                <div><h6><strong>{{ orderItem.count }}</strong>개</h6></div>
                                <p></p>
                                <div><h6><strong>{{ new Intl.NumberFormat().format(orderItem.totalPrice) }}</strong>원</h6></div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </div>
                <div v-else>
                    <v-row v-for="(orderItem, index) in orderList.orderSave.selectItems" :key="index">
                        <v-col cols="3">
                            <v-list-item-avatar class="d-flex justify-start" tile size="100">
                                <v-img/>
                            </v-list-item-avatar>
                        </v-col>
                        <v-col>
                            <v-card-text>
                                <div><h5><strong>{{ orderItem.product.productName }}</strong></h5></div>
                                <p></p>
                                <div><h6><strong>{{ orderItem.count }}</strong>개</h6></div>
                                <p></p>
                                <div><h6><strong>{{ new Intl.NumberFormat().format(orderItem.price * orderItem.count) }}</strong>원</h6></div>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </div>
                <v-divider class="my-3" color="black"></v-divider>
                <v-row>
                    <v-col>
                        <div class="mb-3">상품 금액</div>
                        <div>배송비</div>
                    </v-col>
                    <v-col>
                        <div class="d-flex justify-end mb-3"><strong>{{ new Intl.NumberFormat().format(orderList.orderSave.totalPrice) }}</strong>원</div>
                        <div class="d-flex justify-end">
                          <p v-if="orderList.orderSave.totalPrice > 49999"><strong>0</strong>원</p>
                          <p v-else><strong>3,000</strong>원</p>
                        </div>
                    </v-col>
                </v-row>
                <v-divider class="mt-0 mb-1" color="black"></v-divider>
                <v-row>
                    <v-col>
                        <div class="text-h5 mb-3">결제 총액</div>
                    </v-col>
                    <v-col>
                        <div class="d-flex justify-end text-h5">
                            <p v-if="orderList.orderSave.totalPrice > 49999">
                                <strong>{{ new Intl.NumberFormat().format(orderList.orderSave.totalPrice) }}</strong>원
                            </p>
                            <p v-else>
                                <strong>{{ new Intl.NumberFormat().format(orderList.orderSave.totalPrice + 3000) }}</strong>원
                            </p>
                        </div>
                    </v-col>
                </v-row> -->

                <div class="pay">
                  <v-btn color=#d333 v-if="selectedPayment === 'kakao'" @click="KakaoPay">
                    <v-icon>mdi-credit-card-check-outline</v-icon>
                    <strong>결제하기</strong>
                  </v-btn>
                  <v-btn color=#d333 v-else-if="selectedPayment === 'credit-card'" @click="cardPay">
                    <v-icon>mdi-credit-card-check-outline</v-icon>
                    <strong>결제하기</strong>
                  </v-btn>
                  <v-btn color=#d333 v-else disabled>
                    <v-icon>mdi-credit-card-check-outline</v-icon>
                    <strong>결제하기</strong>
                  </v-btn>
                </div>
           <!-- </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col> -->
    </v-container>
  </div>
</template>

<script>

const IMP = window.IMP; // 생략 가능

import {mapActions, mapState} from "vuex";
import axios from 'axios'

const paymentModule = 'paymentModule'

export default {
  name: "PaymentInfoForm",
  methods: {
    ...mapActions(paymentModule, [
              // "reqOrderPageDeliveryListToSpring"
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
    // 정보전달 : 상품id, 회원id, 주문개수, 주문가격
    setSendInFo () {
      const sendInfo = {
        productId: [],
        memberId: [],
        orderCount: [],
        orderPrice:[],
      };
      const orderSave = this.orderList.orderSave;
      let memberInfoAboutSignIn = JSON.parse(localStorage.getItem("memberInfoAboutSignIn"));
      let memberId = memberInfoAboutSignIn.userId;

      const product = orderSave.product;
      sendInfo.productId.push(product.productId);
      sendInfo.memberId.push(memberId);
      sendInfo.orderCount.push(orderSave.count);
      sendInfo.orderPrice.push(orderSave.totalPrice);

      this.sendInfo = sendInfo;
      console.log(sendInfo)
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
    async KakaoPay() {
      try {
          const response = await axios.post("http://localhost:7777/payment/kakaoPay");
          console.log(response.data);
          const box = response.data.next_redirect_pc_url;
          const paymentWindow = window.open(box);
          
          window.addEventListener('message', async (event) => {
            if (event.data === 'payment_success') {
              paymentWindow.close();
              await axios.post("http://localhost:7777/payment/kakaoPaySuccess", {
                productId: this.product.id,
              });
              this.$router.push('/my-info');
            }
          });
        } catch (error) {
          console.error("Error initiating Kakao Pay payment:", error);
        }
      // // 상품리스트에 저장된 상품의 금액
      // const paymentPrice = this.orderList.orderSave.paymentPrice;
      // const deliveryFee = totalPrice < 50000 ? 3000 : 0;
      // const totalPrice = paymentPrice + deliveryFee;
  
      // this.randomNumber = Math.floor(Math.random() * 1000000);
      // for (let i = 0; i < this.usedNum.length; i++) {
      //     if(this.usedNum[i] == this.randomNumber){
      //         continue;
      //     }
      // }
  
      // let productName;
      // if(this.orderList.orderSave.directOrderCheck) {
      //     productName = this.orderList.orderSave.product.productName
      // } else {
      //     for (let i = 0; i < this.orderList.orderSave.selectItems.length; i++) {
      //         productName = this.orderList.orderSave.selectItems[i].product.productName
      //     }
      // }
              
      // IMP.request_pay({
  
      //     pg: "kakaopay.TC0ONETIME",
      //     pay_method: "card",
      //     merchant_uid: this.merchant_uid + this.randomNumber,
      //     name: productName,
      //     amount: amount, // 결제금액
      //     buyer_email: this.member.email,
      //     buyer_name: this.member.name,
      //     buyer_tel: this.member.phoneNumber,
      //     buyer_addr: this.defaultDelivery.road + this.defaultDelivery.addressDetail,
      //     buyer_postcode: this.defaultDelivery.zipcode
  
      // }, rsp => { // callback
      //     if (rsp.success) {
      //         // 결제 성공 시
      //         let imp_uid = rsp.imp_uid
      //         this.merchant_uid += this.randomNumber
      //         this.usedNum.push(this.randomNumber)
  
      //         this.setSendInfo()
      //         this.setDeliveryRequest()
  
      //         const paymentPrice = this.orderList.orderSave.paymentPrice;
      //         const deliveryFee = paymentPrice < 50000 ? 3000 : 0;
  
      //         const totalPrice = paymentPrice + deliveryFee;
      //         const merchant_uid = this.merchant_uid
      //         const sendInfo = this.sendInfo
      //         const phoneNumber = this.defaultDelivery.phoneNumber
      //         const recipientName = this.defaultDelivery.recipientName
      //         const road = this.defaultDelivery.road
      //         const addressDetail = this.defaultDelivery.addressDetail
      //         const zipcode = this.defaultDelivery.zipcode
      //         const selectedDeliveryReq = this.selectedDeliveryReq
  
      //         this.$emit("payment-success", { amount, merchant_uid, sendInfo, imp_uid, phoneNumber, recipientName, road, addressDetail, zipcode, selectedDeliveryReq })
      //       } else {
      //           // 결제 실패 시
      //           alert ("결제에 실패했습니다. 다시 시도해주세요.")
      //         }
      //     });
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
    },
  computed : {
    ...mapState([paymentModule, [
      'orderList',
      'orderDeliveryList'
    ]
    ]),
  },
  data() {
    return{
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
      totalPrice:0,
      paymentPrice: 0,
      totalCount: 0,
      nonDiscountPrice: 0,
      person: '',
      name: '',
      address: '',
      addressDetail: '',
      phone: '',
      product: [],
      cartItemId: '',
      defaultDelivery: true, // 기본 배송지 선택 여부
      showNew: false,
      deliveryList: [],
      cityDefault: this.$store.state.memberModule.memberInfoModify.city,
      streetDefault: this.$store.state.memberModule.memberInfoModify.street,
      addressDetailDefault: this.$store.state.memberModule.memberInfoModify.addressDetail,
      zipcodeDefault: this.$store.state.memberModule.memberInfoModify.zipcode ,
      zipcode: '',
      city: '',
      street: '',
      addressDetail: '',
      addressPass: false,
      deliveryFee:'', //확인필요

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
  margin-top: 200px;
  position:fixed;
  left:50%;
  width:250px;
  top:100px;
  height:210px;
  margin-left:650px;
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

</style>