<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/views/NavigationMenu/HeaderUi.vue';
  
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Header,
  }
};
</script>