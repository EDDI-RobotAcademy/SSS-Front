<template>
    <v-container>
        <v-col cols="12" style="margin-bottom:-10px">
            <span style="font-size: 60px; font-weight: bold; margin-top: 30px; font-family:'HSBombaram';">REGISTER</span>
            <div class="line" />
            <div>
                <product-modify-form v-if="product" :productId="productId" :product="product" :productImgs="productImgs"
                    @submit="onSubmit" />
                <p v-else>로딩중 ........</p>
            </div>
        </v-col>
    </v-container>
</template>
  
<script>

import ProductModifyForm from '@/components/Product/ProductModifyForm.vue'
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
    components: { ProductModifyForm },
    name: "ProductModifyPage",
    props: {
        productId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(productModule, [
            'product', 'productImgs'
        ])
    },
    methods: {
        ...mapActions(productModule, [
            'requestProductToSpring',
            'requestProductModifyToSpring',
            'requestProductImageToSpring',
        ]),
        async onSubmit(payload) {
            console.log('payload: ' + JSON.stringify(payload))

            await this.requestProductModifyToSpring(payload)
            await this.$router.push({
                name: 'ProductReadPage',
                params: { productId: this.productId, productImgs: this.productImgs }
            })
            //    this.$router.go(0)  // 새로고침 해야지만 수정 사항 반영되서 추가했는데 로딩이 좀 이상하게 됨,,
        }
    },
    async created() {
        await this.requestProductToSpring(this.productId)
        await this.requestProductImageToSpring(this.productId)
    }
}

</script>
  
<style scoped>
.line {
    width: 100%;
    border-bottom: 7px solid #40513B;
    margin-top: -24px;
}

* {
    /* color: #40513B; */
    color: #40513B;
}

@font-face {
    font-family: 'HSBombaram';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>