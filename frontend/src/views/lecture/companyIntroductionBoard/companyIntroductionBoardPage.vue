<template>
    <v-container>
      <h2>회사 소개</h2>
    </v-container>
  </template>
  
  <script>
  import CompanyIntroductionBoardForm from '@/components/lecture/companyIntroductionBoard/companyIntroductionBoardForm'
  
  export default {
      components: { CompanyIntroductionBoardForm },
      name: "companyIntroductionBoard",
      methods: {
          ...mapActions ([
              'requestCreateBoardToSpring'
          ]),
        
      }
  }
  
  </script>
  
  <style>
  </style>