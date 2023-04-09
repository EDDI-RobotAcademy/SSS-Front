<template>
  <div class="review-content">
    <v-row>
        <v-col cols="4" align="right">
            <div class="mr-3">
                <p>{{ review.regDate }}</p>
                <v-rating
                    :value="review.rating"
                    background-color="grey"
                    color="yello darken-1"                    
                    readonly
                    dense
                ></v-rating>
            </div>
        </v-col>
        <v-col cols="8" align="left">
            <div class="ml-3">
                <!-- <p>{{ review.member.nickname | comma }}</p> -->
                <p>{{ review.content }}</p>
            </div>
            <div v-if="review.reviewImgs && review.reviewImgs.length > 0">
                <div v-for="(image, index) in review.reviewImgs" :key="index">
                    <v-img
                        :src="require(`@/assets/review/${image.editedImg}`)"
                        height="300" width="400" contain @click="openReview"
                    ></v-img>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>사진 후기</v-card-title>
        <v-divider></v-divider>
        <v-card-text cols="6">
          <div v-for="(image, index) in review.reviewImgs" :key="index">
            <v-img
              :src="require(`@/assets/review/${image.editedImg}`)"
              height="300" width="400" contain
            ></v-img>
          </div>
        </v-card-text>
        <v-card-text cols="6">
            <!-- <p>{{ review.member.nickname | comma }}</p> -->
            <p>{{ review.content }}</p>
            <p>{{ review.regDate }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeReview">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const productModule = 'productModule'

export default {
    name: "ReviewContent",
    props: {
        review: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        ...mapActions(productModule, [
            'requestReviewImageToSpring',
        ]),
        openReview() {
            this.dialog = true
        },
        closeReview() {
            this.dialog = false
        }
    },
    created() {
        const reviewId = this.review.reviewId
        this.requestReviewImageToSpring(reviewId)
    },
    filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
}
</script>

<style scoped>
.review-content {
    position: relative;
    list-style: none;
    padding: 10px;
}
</style>