<template>
  <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{on}">
            <v-btn small outlined color="#739e42" v-on="on">주문상세</v-btn>
        </template>
    <v-card>
      <v-card-actions>
        <v-card-title class="pl-3 pt-5">주문 내역 상세</v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="pr-4" icon @click="cancel"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-actions>
        <v-card-text>
          <v-row class="row">
            <p class="sub-title">받는분</p>
            <p class="content">{{ completeOrder.recipient }}</p>
          </v-row>
          <v-divider class="mt-1 mb-3"/>
          <v-row class="row">
            <p class="sub-title">주문날짜</p>
            <p class="content">{{ completeOrder.paid_at | formatDate }}</p>
          </v-row>
          <v-divider class="mt-1 mb-3"/>
          <v-row class="row">
            <p class="sub-title">배송지</p>
            <p class="content">
              {{ completeOrder.city }}
              {{ completeOrder.street }}
              {{ completeOrder.addressDetail }}
              ({{ completeOrder.zipcode }})
            </p>
          </v-row>
          <v-divider class="mt-1 mb-3"/>
          <v-row class="row">
            <p class="sub-title">요청사항</p>
            <p class="content">{{ completeOrder.deliveryMemo }}</p>
          </v-row>
          <v-divider class="mt-1 mb-3"/>
      </v-card-text>
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
  methods: {
    cancel() {
        this.dialog = false
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
.sub-title {
  font-weight: bold;
  font-size: 14px;
  width: 100px;
}

.content {
  font-size: 14px;
}

.row {
  margin-left: 6px;
}

.v-divider {
  margin: 10px 0;
}
</style>
