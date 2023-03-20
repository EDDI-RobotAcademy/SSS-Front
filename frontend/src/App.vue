<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '@/views/NavigationMenu/HeaderUi.vue';
import Footer from '@/views/NavigationMenu/FooterUi.vue';
  
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Header,
    Footer
  }
};
</script>