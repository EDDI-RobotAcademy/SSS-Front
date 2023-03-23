<template>
    <div class="white" style="font-family: Arial">
        <v-row justify="center">
            <v-col>
                <h1>SelfSaladSell</h1>
                <v-img :src="require('@/assets/logo/3sss-ko.jpg')" width="120" class="mx-auto mb-6"/>
                <textarea cols="50" rows="20" v-model="companyIntroductionBoard"/>
            </v-col>
        </v-row>
    </div>
  </template>
  
  <script>
  
  export default {
      name: "companyIntroductionBoard",
      data () {
          return {
              text: '내용',
              
          }
      },
      methods: {
          onSubmit () {
              const { text, image } = this
              this.$emit('submit', { text, image })
          }
      }
  }
  
  </script>
  
  <style>
  
  </style>