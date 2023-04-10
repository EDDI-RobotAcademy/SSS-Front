<template>
  <div class="review-wrap">
    <div class="review-header">
        <v-row class="mb-4" no-gutters>
            <v-col cols="6" class="mt-8">
                <p>후기 {{ reviews.length }}개</p>
            </v-col>
            <v-col cols="6">
                <p style="font-size: 20px" v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
                    리뷰 평점 {{ 0 }}</p>
                <p style="font-size: 15px" v-else>리뷰 평점 {{ totalRate }}</p>
                <v-rating
                    :value="totalRate"
                    background-color="grey"
                    color="yellow darken-1"
                    dense
                    half-increments
                    readonly
                    x-large
                ></v-rating>
            </v-col>
        </v-row>
        <v-divider></v-divider>
    </div>
    <div class="review-container">
        <li v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
          <p class="mb-7">작성된 리뷰가 없습니다.</p>
          <v-divider width="1070px"></v-divider>
        </li>
        <li v-for="review in reviews" :key="review.reviewId" v-else>
          <review-content
              :review="review" :reviewImgs="reviewImgs"/>
        </li>
    </div>
  </div>

</template>

<script>
import ReviewContent from "@/components/Product/review/ReviewContent.vue"
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
    name: "ReviewForm",
    components: {ReviewContent},
    data() {
        return {
            review: {
                type: Object
            },
            totalRate: 0
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapActions(productModule, [
            'requestReadReviewToSpring',
        ])
    },
    created() {
        const productId = this.product.productId
        this.requestReadReviewToSpring(productId)
    },
    beforeUpdate() {
        let tmpRate = 0
        for(let i = 0; i < this.reviews.length; i++) {
            tmpRate += this.reviews[i].rating
        }
        this.totalRate = parseFloat((tmpRate / this.reviews.length).toFixed(1)) //평균 별점 얻기. toFixed(1) : 소수점 한자리로 반올림
    },
    computed: {
        ...mapState(productModule, [
            'reviews', 'reviewImgs'
        ])
    }
}
</script>

<style scoped>
* {
    list-style: none;
}
.review-header {
    margin: 30px;
}
</style>