<template>
    <v-container>
        <v-col cols="12" style="margin-bottom:-10px">
      <span style="font-size: 60px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
      <div class="line"/>
            <product-register-form @submit="onSubmit"/>
        </v-col>
    </v-container>
  </template>
  
  <script>
  import ProductRegisterForm from '@/components/Product/ProductRegisterForm.vue';
  import { mapActions } from 'vuex';

  const productModule = 'productModule'

  
  export default {
      components: { ProductRegisterForm },
      name: "ProductRegisterPage",
      methods: {
          ...mapActions (productModule, [
              'requestCreateProductToSpring'
          ]), 
          async onSubmit (payload) {  
              await this.requestCreateProductToSpring(payload)
              await this.$router.push({ 
                  name: 'ProductListPage'
              })
          }
      }
  }
  </script>
  
  <style scoped>
      .line{
    width: 100%;
    border-bottom: 7px solid #40513B;
    margin-top: -24px;
}
*{
    /* color: #40513B; */
    color: #40513B;
  }
  @font-face {
    font-family: 'HSBombaram';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  </style>