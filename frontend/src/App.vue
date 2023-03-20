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
import Header from '@/views/NavigationMenu/Header.vue';
import Footer from '@/views/NavigationMenu/Footer.vue';
  
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