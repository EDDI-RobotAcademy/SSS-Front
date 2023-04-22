<template>
  <div class="review-content">
    <v-row>
        <v-col cols="4" align="right">
            <div class="mr-3">
                <p>{{ review.nickName | comma }}</p>
                <v-rating
                :value="review.rating"
                background-color="grey"
                color="yello darken-1"                    
                readonly
                dense
                ></v-rating>
                <p>{{ review.regDate }}</p>
            </div>
        </v-col>
        <v-col cols="8" align="left">
            <div class="ml-3">
                
                <p>{{ review.content }}</p>
            </div>
            <v-row v-if="review.reviewImgs && review.reviewImgs.length > 0">
                <v-col v-for="image in review.reviewImgs" :key="image.reviewImgId" cols="2">
                    <v-img
                        :src="require(`@/assets/review/${image.editedImg}`)"
                        height="100" width="200" contain @click="openReview"
                    ></v-img>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
          <v-card-actions>
            <v-card-title style="font-size: 25px;">사진 후기</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeReview"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-img
                      :src="require(`@/assets/review/${selectedImg || review.reviewImgs[0].editedImg}`)"
                      height="300" width="400" contain
                    ></v-img>
                </v-col>
                <v-col cols="12" md="6">
                    <p style="font-weight: bold;">{{ review.nickName | comma }} 님</p>
                    <p>{{ review.content }}</p>
                    <p>{{ review.regDate }}</p>
                </v-col>
            </v-row>
        </v-container>
        <v-card-text>
            <v-row>
                <v-col v-for="image in review.reviewImgs" :key="image.reviewImgId" cols="2">
                <v-img
                    :src="require(`@/assets/review/${image.editedImg}`)"
                    height="100" width="100" contain
                    @click="selectedImg = image.editedImg"
                ></v-img>
                </v-col>
            </v-row>
        </v-card-text>
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
            required: true,
            default: () => {}
        },
        reviewImgs: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            selectedImg: null,
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
            this.currentImg = ''
        },
        changeImg(image) {
            this.selectedImg = image;
        }
    },
    created() {
        const reviewId = this.review.reviewId
        this.requestReviewImageToSpring(reviewId)
    },
    filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    watch: {
        dialog(val) {
            if (!val) {
                this.currentImg = ''
            }
        }
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
.image-container {
    display: flex;
    flex-wrap: wrap;
}
</style>