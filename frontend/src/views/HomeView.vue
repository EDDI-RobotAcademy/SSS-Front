<template>
  <div>
  <popup-form/>
  <carousel-form/>
  <banner-form/>
</div>
</template>

<script>

import PopupForm from "@/components/main/PopupForm.vue";
import CarouselForm from "@/components/main/CarouselForm.vue";
import BannerForm from "@/components/main/BannerForm.vue";
export default {
  name: 'HomeView', 
  components: {
    PopupForm,
    CarouselForm,
    BannerForm
  },
}
</script>
