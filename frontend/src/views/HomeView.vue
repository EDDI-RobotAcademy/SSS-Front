<template>
  <div>
    <carousel-form />
    <banner-form />
    <popup-form />
    <top-button-form />
  </div>
</template>

<script>

import PopupForm from "@/components/main/PopupForm.vue";
import CarouselForm from "@/components/main/CarouselForm.vue";
import BannerForm from "@/components/main/BannerForm.vue";
import TopButtonForm from "@/components/main/TopButtonForm.vue";
export default {
  name: 'HomeView',
  components: {
    PopupForm,
    CarouselForm,
    BannerForm,
    TopButtonForm
  },
}

</script>
