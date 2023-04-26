<template>
  <v-container>
    <my-page/>
    <my-delivery-form/>
  </v-container>
</template>


<script>
import MyDeliveryForm from '@/components/MyPage/MyDeliveryForm.vue'
import MyPage from "@/views/MyPage/MyPage.vue"



import { mapActions, mapState } from 'vuex'

const ordercartModule = 'ordercartModule'

export default {
  name: "MyDeliveryPage",
  components: { MyDeliveryForm, MyPage },
  data() {
    return {
    }
  },
}
</script>

<style scoped></style>