<template>
  <v-container>
    <v-card flat style="width: 100%">
      <v-card-text>
        <h2 style="margin-left: 50px">내가 작성한 리뷰</h2>
        <v-divider style="margin-top: 30px"></v-divider>
        <v-container style="width: 1000px">
          <div v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)" style="margin-top: 50px" align="center">
            <h2>작성한 리뷰가 없습니다.</h2>
          </div>
          <div v-else v-for="review in reviews" :key="review.reviewId">
            <div class="reviewCard">
              <v-card outlined>
                <div class="mt-4 ml-4">
                  <v-row>
                    <v-col cols="2">
                      <router-link
                          :to="{ name: 'ProductReadPage',
                                    params: { productId: review.productId.toString()}}">
                        <v-img
                            style="margin: auto"
                            :src="require(`@/assets/product/${review.product.productImgs[0].editedImg}`)"
                            max-height="50px"
                            max-width="50px"
                            contain/>
                      </router-link>
                    </v-col>
                    <v-col>
                      <!-- <p style="font-size: 14px">주문 번호 : {{ myReview.orderInfo }}</p> -->
                      <p style="font-size: 15px">상품명 : {{ review.product.title }}</p>
                    </v-col>
                  </v-row>
                </div>
                <v-divider></v-divider>
                <v-row class="ma-1">
                  <v-col>
                    <div class="product">
                      <div v-if="review.reviewImgs && review.reviewImgs.length > 0">
                        <v-img
                            :src="require(`@/assets/review/${review.reviewImgs[0].editedImg}`)"
                          style="margin: auto" max-height="150px" max-width="200px" contain/>
                    </div>  
                    <div class="noImage" v-else>
                        등록된 사진이 없습니다
                    </div>
                    </div>
                  </v-col>
                  <v-col>
                    <v-card-text>
                      <p>{{ review.regDate }}</p>
                      <v-rating
                          :value="review.rating"
                          background-color="grey"
                          color="yellow darken-1"
                          readonly
                          half-increments
                          dense/>
                    </v-card-text>
                    <v-card-text>
                      <p>{{ review.content }}</p>
                    </v-card-text>
                  </v-col>
                </v-row>
                <v-row no-gutters dense>
                  <v-col class="mr-3 mb-2" align="right">
                    <v-btn small @click="clickModify(review.reviewId)"
                        >수정</v-btn>
                    <v-btn small @click="clickDelete(review.reviewId)"
                        >삭제</v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <review-modify-form
                  ref="ReviewModifyForm"
                  :review="review" :product="product"/>
            </div>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ReviewModifyForm from '@/components/Product/review/ReviewModifyForm.vue'

const productModule = 'productModule'

export default {
  name: "MyReviewForm",
  components: {ReviewModifyForm},
  props: {
    review: Object
  },
  methods: {
    ...mapActions(productModule, [
      'requestReadMyReviewToSpring', 'requestProductInfoToSpring', 'requestProductToSpring', 'requestDeleteReviewToSpring'
    ]),
    clickModify(reviewId) {
        this.$root.$emit('clickModify', reviewId)
    },
    async clickDelete(reviewId) {
      await this.requestDeleteReviewToSpring(reviewId)
      this.$router.go(this.$router.currentRoute)
    }    
  },
  async mounted() {
    const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId;
    await this.requestReadMyReviewToSpring(memberId)
    const productRequests = this.reviews.map(review => {
        const productId = review.productId
        this.requestProductToSpring(productId)
        return this.requestProductInfoToSpring(productId)
    })

    Promise.all(productRequests)
        .then(products => {
            for (let i = 0; i < this.reviews.length; i++) {
                this.reviews[i].product = products[i]
            }
        })
  },
  computed: {
    ...mapState(productModule, [
      'reviews'
    ])
  },
  // created() {
  //   const memberId = this.$store.state.memberModule.memberInfoAboutSignIn.userId;
  //   this.requestReadMyReviewToSpring(memberId)
  // }
}
</script>

<style scoped>
.reviewCard {
  margin: 20px
}
.product {
  margin-top: 10px;
}
.noImage {
  border: 1px #eeeeee solid;
  width: 200px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  margin: auto;
}
</style>