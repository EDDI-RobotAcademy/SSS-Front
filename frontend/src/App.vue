<template>
  <v-app>
    <!-- <navigation-menu-page/> -->
    <v-main>
      <router-view/>
    </v-main>
    <!-- <Footer/> -->
  </v-app>
</template>

<script>
// import Footer ;
// import Navigation ;

export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    // Navigation,
    // Footer
  },
};
</script>