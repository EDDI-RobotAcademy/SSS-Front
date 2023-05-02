<template>
  <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{on}">
            <v-btn small outlined color="#739e42" v-on="on">상세 보기</v-btn>
        </template>
    <v-card>
      <p class="pl-3 pt-5">상세 주문 정보</p>
      <v-divider class="mt-1 mb-3"/>
      <v-row>
        <p class="sub-title">수령인 </p>
        <p class="content">{{ completeOrder.recipient }}</p>
      </v-row>

      <v-divider class="mt-1 mb-3"/>
      <v-row>
        <p class="sub-title">주문날짜 </p>
        <p class="content">
          {{ completeOrder.paid_at | formatDate }}
        </p>
      </v-row>
      <v-divider class="mt-1 mb-3"/>
      <v-row>
        <p class="sub-title">배송지 </p>
        <p class="content">
          {{ completeOrder.city }}
          {{ completeOrder.street }}
          {{ completeOrder.addressDetail }}
          ({{ completeOrder.zipcode }})
        </p>
      </v-row>
      <v-divider class="mt-1 mb-3"/>
      <v-row>
        <p class="sub-title">요청사항 </p>
        <p class="content">
          {{ completeOrder.deliveryMemo }}
        </p>
      </v-row>
      <v-divider class="mt-1 mb-3"/>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "MyDeliveryDetailForm",
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    completeOrder: Object,
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
.sub-title {
  padding-top: 15px;
  font-weight: bold;
  padding-left: 25px;
  font-size: 14px;
  width: 100px;
}
.content {
  padding-top: 15px;
  padding-left: 50px;
  font-size: 14px;
}
</style>
