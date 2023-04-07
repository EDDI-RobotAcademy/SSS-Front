<template>
  <v-container>
  <a href="#" class="go-to-top">TOP</a>
  </v-container>
</template>

<script>
export default {
  name: 'TopButtonPage',

}
</script>

<style scoped>
* {
  margin:0;
  padding:0;
  font-size: 12px;
}
a.go-to-top{
  position:absolute;
  bottom:100px;
  right:100px;
  z-index:99;

  display: inline-block;
  width:30px;
  height:30px;
  border-radius: 15px;

  line-height:30px;
  text-align:center;
  text-decoration:none;

  background: #ccc;
  opacity: 0.7;
  color:#fff;
}

</style>