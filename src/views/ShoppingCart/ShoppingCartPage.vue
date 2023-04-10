<template>
  <div>
    <shopping-cart-form/>
  </div>
</template>

<script>

import ShoppingCartForm from "@/components/ShoppingCart/ShoppingCartForm";
import {mapActions} from "vuex";

export default {
  name: "ShoppingCartPage",
  components: {ShoppingCartForm},
  
}
</script>

<style scoped>

</style>