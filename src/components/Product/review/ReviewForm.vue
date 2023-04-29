<template>
  <div class="review-wrap">
    <div class="review-header">
        <v-row class="mb-4" no-gutters>
            <v-col cols="6" class="mt-8">
                <p>후기 {{ reviews.length }}개</p>
            </v-col>
            <v-col cols="6">
                <p style="font-size: 20px" v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
                    후기 평점 {{ 0 }}</p>
                <p style="font-size: 15px" v-else>후기 평점 {{ totalRate }}</p>
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
        <v-row>
            <v-col v-if="!reviews || (Array.isArray(reviews) && reviews.length === 0)">
              <p class="mb-7">작성된 후기가 없습니다.</p>
              <v-divider width="1070px"></v-divider>
            </v-col>
            <v-row v-for="review in paginated('reviews')" :key="review.reviewId" v-else>
                <v-col>
                  <review-content 
                      :review="review"/>
                </v-col>
            </v-row>
        </v-row>
        <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#2c4636"
      class="mt-10 pagination-wrapper"
      flat
    ></v-pagination>
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
            paginate: ['reviews'],
            totalRate: 0,
            curPageNum: 1,
            perPage: 3,
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
        ]),
        paginated(name) {
            return this[name].slice(this.startOffset, this.endOffset);
    },
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
            'reviews'
        ]),
        startOffset() {
        return (this.curPageNum - 1) * this.perPage;
        },
        endOffset() {
        return this.startOffset + this.perPage;
        },
        numOfPages() {
        return Math.ceil(this.reviews.length / this.perPage);
        },
        paginatedReviews() {
        return this.reviews.slice(this.startOffset, this.endOffset);
        },
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
.pagination {
  text-align: center;
}
</style>