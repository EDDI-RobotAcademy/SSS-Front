<template>
    <div>
      <v-dialog
          v-model="dialog"
          max-width="650"
          persistent
      >
        <v-card align="center">
            <v-card-actions>
                <v-card-title class="text-h5">후기 수정</v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="cancel"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          <div>
            <p>{{ product.title }}</p>
            <v-img
                :src="require(`@/assets/product/${product.productImgs[0].editedImg}`)"
                max-width="200"
                max-height="150"
                contain
            ></v-img>
          </div>
          <div>
            <p class="mt-5 mb-3">샐러드는 어떠셨나요?</p>
            <v-rating
                v-model="rating"
                :value="review.rating"
                background-color="grey"
                color="yellow darken-1"
                x-large
            ></v-rating>
            <p>{{ rating }}</p>
          </div>
          <div>
            <v-textarea
                v-model="content"
                background-color="grey lighten-4"
                style="width: 600px"
                label="상품평을 작성해 주세요."
                :rules="content_rule"
                solo
                required
            ></v-textarea>
          </div>
          <div class="mb-10">
            <v-file-input multiple
                @change="addFile"
                style="width: 550px"
                color="#205C37"
                prepend-icon="mdi-camera"
                label="사진 추가하기"
            />
            <p>등록된 이미지</p>
            <div style="display: flex;">
                <div v-for="image in review.reviewImgs" :key="image.reviewImgId">
                    <v-img :src="require(`@/assets/review/${image.editedImg}`)" max-height="150" max-width="200" contain></v-img>
                </div>
            </div>
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="edit" large>수정</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import {mapActions} from "vuex";

  const productModule = 'productModule'

  export default {
    name: "ReviewModifyForm",
    data() {
      return {
        dialog: false,
        rating: 0,
        content: '',
        files: [],
        imageUrls: [],
        content_rule: [
          v => !!v || '필수 입력 사항입니다.',
          v => !(v && v.length < 10) || '10자 이상 입력해 주세요.',
        ]
      }
    },
    props: {
      review: Object,
      product: Object,
    },
    created() {
      this.rating = this.review.rating
      this.content = this.review.content
      this.reviewId = this.review.reviewId
      this.$root.$on('clickModify', (reviewId) => {
      if (reviewId === this.reviewId) {
        this.dialog = true
        }
      })
    },
    methods: {
      ...mapActions(productModule, [
        'requestModifyReviewTextToSpring',
        'requestModifyReviewToSpring'
      ]),
      addFile(files) {
        this.files = files
        this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
      },
      async edit() {
        console.log(this.files)
        if (!(this.files.length === 0)) {
  
          let formData = new FormData()
          for(let idx = 0; idx < this.files.length; idx++) {
              formData.append('reviewImgList', this.files[idx]);
          }
          console.log(formData)
          const { rating, content, reviewId} = this
          let fileInfo = {
            rating: rating,
            content: content
          }
          console.log(reviewId)

          formData.append("reviewInfo", new Blob([JSON.stringify(fileInfo)], {type: "application/json"}))
          await this.requestModifyReviewToSpring({reviewId, formData})
        } else {
            const {rating, content} = this
            const reviewId = this.review.reviewId
            await this.requestModifyReviewTextToSpring({reviewId, rating, content})
        }
        this.$router.go(this.$router.currentRoute)
        this.dialog = false
      },
      cancel() {
        this.dialog = false
      },
    },
  }
  </script>
  
  <style scoped>
  
  </style>