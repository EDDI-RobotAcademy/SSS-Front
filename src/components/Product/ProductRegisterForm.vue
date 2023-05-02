<template>
    <v-container>
        <v-row>
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <v-row style="min-width: 500px;">
                    <v-col cols="6" class="d-flex flex-column justify-content-center" style="min-width: 500px;">
                        <div class="d-flex justify-content-center">
                            <v-col v-for="(url, index) in imageUrls" :key="index" cols="6">
                                <div class="d-flex justify-content-center">
                                    <img style="width: 500px;" :src="url" :alt="'Image ' + index" aspect-ratio="1" />
                                </div>
                            </v-col>
                        </div>
                        <div class="d-flex justify-content-center">
                            <v-col cols="12">
                                <div class="d-flex justify-content-center">
                                    <div class="input-group mb-3" style="width: 70%;">
                                        <input type="file" class="form-control" id="inputGroupFile01" ref="files" multiple
                                            @change="handleFileUpload" aria-describedby="inputGroupFileAddon01">
                                    </div>
                                </div>
                            </v-col>

                        </div>
                    </v-col>
                    <v-col cols="6" class="justify-end">

                        <div class="input-group mb-3" style="width: 550px; margin: 10px;">
                            <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">재료명</span>
                            <input type="text" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" v-model="name" id="inputGroup-sizing-lg">
                        </div>
                        <div class="input-group mb-3" style="width: 550px; margin: 10px;">
                            <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">가격</span>
                            <input type="text" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" v-model="price" id="inputGroup-sizing-lg">
                        </div>

                        <div class="input-group mb-3" style="width: 550px; height: 300px; margin: 10px;">
                            <span style="width: 150px;" class="input-group-text" id="inputGroup-sizing-default">상세정보</span>
                            <input type="text" class="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" v-model="content" id="inputGroup-sizing-lg">
                        </div>

                        <v-row>
                            <div class="ingredientInfo">
                                <v-col cols="12" class="foodInfoGroup">

                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">열량</span>
                                        <input type="number" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" v-model="productDetail.calorie"
                                            id="inputGroup-sizing-lg">
                                    </div>
                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">탄수화물</span>
                                        <input type="number" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default"
                                            v-model="productDetail.carbohydrate" id="inputGroup-sizing-lg">
                                    </div>

                                </v-col>

                                <v-col cols="12" class="foodInfoGroup">

                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">당류</span>
                                        <input type="number" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" v-model="productDetail.sugars"
                                            id="inputGroup-sizing-lg">
                                    </div>
                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">단백질</span>
                                        <input type="number" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" v-model="productDetail.protein"
                                            id="inputGroup-sizing-lg">
                                    </div>

                                </v-col>

                                <v-col cols="12" class="foodInfoGroup">

                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">지방</span>
                                        <input type="number" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" v-model="productDetail.fat"
                                            id="inputGroup-sizing-lg">
                                    </div>
                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">포화지방</span>
                                        <input type="number" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" v-model="productDetail.aturatedFat"
                                            id="inputGroup-sizing-lg">
                                    </div>

                                </v-col>

                                <v-col cols="12" class="foodInfoGroup">

                                    <div class="input-group mb-3" style="width: 250px; margin: 5px;">
                                        <span class="input-group-text" id="inputGroup-sizing-default">나트륨</span>
                                        <input type="text" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" v-model="productDetail.natrium"
                                            id="inputGroup-sizing-lg">
                                    </div>
                                </v-col>
                            </div>
                        </v-row>

                    </v-col>

                </v-row>


                <div class="d-flex justify-content-center" style="margin-top: 50px">
                    <v-btn style="background-color: rgb(54, 109, 50); color:white; width: 150px;" type="submit">등록</v-btn>
                    <router-link :to="{ name: 'ProductListPage' }">
                        <v-btn style="background-color: red; color:white; width: 150px;">취소</v-btn>
                    </router-link>
                </div>


            </form>
        </v-row>
    </v-container>
</template>
  
<script>

export default {
    name: "ProductRegisterForm",
    data() {
        return {
            title: '',
            price: 0,
            content: '',
            productDetail: {
                calorie: 0,
                carbohydrate: 0,
                sugars: 0,
                protein: 0,
                fat: 0,
                aturatedFat: 0,
                natrium: 0,
            },
            files: '',
            imageUrls: [],
        }
    },
    methods: {
        onSubmit() {
            let formData = new FormData()
            for (let idx = 0; idx < this.files.length; idx++) {
                formData.append('productImgList', this.files[idx])
            }
            console.log('productImgList: ' + this.productImgList)

            const { title, price, content, productDetail } = this
            let productInfo = {
                title: title,
                price: price,
                content: content,
                productDetail: productDetail
            }
            console.log('productInfo: ' + JSON.stringify(productInfo))
            formData.append("productInfo", new Blob([JSON.stringify(productInfo)], { type: "application/json" }))
            console.log('formdata: ' + JSON.stringify(formData))
            this.$emit('submit', formData)
        },
        handleFileUpload(event) {
            this.files = event.target.files
            this.imageUrls = Array.from(this.files).map((file) => URL.createObjectURL(file))
        },
    }
}
</script>
  
<style scoped>
.input-group-text {
    background-color: #739E42;
    color: white;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    width: 100px;
    font-weight: bold;
    font-size: 19px;
}

.ingredientInfo {
    margin-top: 20px;
    margin-left: -8px;
    min-width: 800px;
    align-items: center;
}

.foodInfoGroup {
    display: flex;
    margin-top: -20px;
    align-items: center;
}
</style>