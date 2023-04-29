<template>
  <v-app>
    <HeaderOne/>
    <HeaderTwo style="position: sticky; top: 0; z-index: 1;"/>
    <top-button-form />
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import HeaderOne from '@/views/NavigationMenu/HeaderOne.vue';
import HeaderTwo from '@/views/NavigationMenu/HeaderTwo.vue';
import Footer from '@/views/NavigationMenu/Footer.vue';
import TopButtonForm from "@/components/main/TopButtonForm.vue";
  
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    HeaderOne,
    HeaderTwo,
    Footer,
    TopButtonForm

  }
};
</script>

<style>

</style>