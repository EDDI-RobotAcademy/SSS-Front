<template>
    <div>
        <div class="review-content">
            <v-row>
                <v-col cols="4" align="right">
                    <div class="mr-3">
                        <p>{{ review.nickName | comma }} 님</p>
                        <v-rating
                        :value="review.rating"
                        background-color="grey"
                        color="yello darken-1"                    
                        readonly
                        dense
                        ></v-rating>
                        <p>{{ review.regDate | formatDate }}</p>
                    </div>
                </v-col>
                <v-col cols="8" align="left">
                    <div class="ml-3">
                        <p>{{ review.content }}</p>
                        <v-row v-if="review.reviewImgs && review.reviewImgs.length > 0">                          
                            <v-col v-for="image in review.reviewImgs" :key="image.reviewImgId" cols="2">
                            <v-img
                            :src="require(`@/assets/review/${image.editedImg}`)"
                            height="100"
                            width="200"
                            contain
                            @click="openReview(image.editedImg)"
                            ></v-img>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        <v-divider></v-divider>
        </div>  
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
                            <p>{{ review.regDate | formatDate }}</p>
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
    },
    created() {
        console.log("리뷰", this.review)
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
    filters: {
        comma(val) {
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        formatDate(value) {
        const date = new Date(value);
        const year = date.getFullYear();
        
        let month = date.getMonth() + 1;
        month = month > 9 ? month : `0${month}`;

        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let hours = date.getHours();
        hours = hours > 9 ? hours : `0${hours}`;
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${year}-${month}-${day} ${hours}:${minutes}`;  
        },
    watch: {
        dialog(val) {
            if (!val) {
                this.currentImg = ''
            }
        }
    },
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