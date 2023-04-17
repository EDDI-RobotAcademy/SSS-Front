import {
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
// 장바구니에 추가
async requestAddCartToSpring({}, payload) {
    const { memberId, itemId, category, quantity } = payload;

    try {
        await axiosInst.post("/cart/register", { memberId, itemId, category, quantity });
        if (confirm("장바구니가 추가되었습니다. 장바구니로 이동하시겠습니까?")) {
            // this.$router.push({ name: 'MyShoppingCartPage' }) 
            // this.$router.push('/my-info-cart');
            // Vue.prototype.$router.push('/my-info-cart')
            window.location.href = "http://localhost:8080/my-info-cart"
        } else {
        }
    } catch (error) {
        alert("문제가 발생하여 장바구니에 추가되지 않았습니다.");
    }
},
}