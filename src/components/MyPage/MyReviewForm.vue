<template>
  <v-container>
    <v-card flat style="width: 100%">
      <v-card-text>
        <h2 style="margin-left: 50px">내가 작성한 리뷰</h2>
        <v-divider style="margin-top: 30px"></v-divider>
        <v-container style="width: 1000px">
          <div style="margin-top: 50px" align="center">
            <h2>작성한 리뷰가 없습니다.</h2>
          </div>
        </v-container>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: "MyReviewForm",
}
</script>

<style scoped></style>