<template>
    <div>
        <v-card align="center"> 
            <v-card-actions>
                <v-card-title class="text-h5">후기 작성</v-card-title>
            </v-card-actions>
          <div>
            <p v-if="product && product.title">{{ product.title }}</p>
            <v-img v-if="product && product.productImgList"
                :src="require(`@/assets/product/${product.productImgList[0].editedImg}`)"
                max-width="200"
                max-height="150"
                contain
            ></v-img>
          </div>
          <div>
            <p class="mt-5 mb-3">샐러드는 어떠셨나요?</p>
            <v-rating
                v-model="rating"
                :value="rating"
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
            <!-- <p>사진 등록</p>
            <div v-for="(url, index) in imageUrls" :key="index" md="3">
            <v-img :src="url" :alt="'Image ' + index" aspect-ratio="1"></v-img>
            </div> -->
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" large>등록</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
    </div>
  </template>
  
  <script>
  import {mapActions, mapState} from "vuex";

  const productModule = 'productModule'
  const memberModule = 'memberModule'

  export default {
    name: "ReviewRegisterForm",
    data() {
      return {
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
      completeOrder: Object,
      product: Object,
    },
    created() {
      console.log("id: " + this.memberInfoAboutSignIn.userId)
      console.log("productId: " + this.product.productId)
      console.log("orderId: " + this.completeOrder.orderId)
    },
    methods: {
      ...mapActions(productModule, [
        'requestRegisterReviewTextToSpring',
        'requestRegisterReviewToSpring'
      ]),
      addFile(files) {
        this.files = files
        this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
      },
      async submit() {
        console.log(this.files)
        if (!(this.files.length === 0)) {
  
          let formData = new FormData()
          for(let idx = 0; idx < this.files.length; idx++) {
              formData.append('reviewImgList', this.files[idx]);
          }
          console.log(formData)
          const { rating, content} = this
          let fileInfo = {
            memberId: this.memberInfoAboutSignIn.userId,
            productId: this.product.productId,
            rating: rating,
            content: content,
            orderId: this.completeOrder.orderId
          }

          formData.append("reviewInfo", new Blob([JSON.stringify(fileInfo)], {type: "application/json"}))
          await this.requestRegisterReviewToSpring(formData)
        } else {
            const {rating, content} = this
            const memberId = this.memberInfoAboutSignIn.userId
            const productId = this.product.productId
            const orderId = this.completeOrder.orderId
            await this.requestRegisterReviewTextToSpring({memberId, productId, rating, content, orderId})
        }
        this.$router.go(this.$router.currentRoute)
      },
    },
    computed: {
      ...mapState(memberModule, [
        'memberInfoAboutSignIn'
      ])
    }
  }
  </script>
  
  <style scoped>
  
  </style>