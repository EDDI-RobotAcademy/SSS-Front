import {
    REQUEST_ADD_CART_LIST_TO_SPRING,
    REQUEST_SELFSALAD_ADD_CART_LIST_TO_SPRING,
    REQUEST_SELFSALAD_TO_SPRING
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
//리스트
async requestAddCartListToSpring({ commit }, memberId) {
    return await axiosInst.get(`/cart/list/${memberId}`)
    .then((res) => {
        commit(REQUEST_ADD_CART_LIST_TO_SPRING, res.data);
        console.log('리스트 연결');
    })
},
//삭제
async requestDeleteCartToSpring ({}, payload) {
    const { itemId, category } = payload

    const confirmDelete = window.confirm("상품을 삭제하시겠습니까?");

    if (confirmDelete) {
        return await axiosInst.delete("/cart/delete", {
            data: { itemId, itemCategoryType: category }
        })
            .then(() => {
                alert("장바구니에서 삭제되었습니다.")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    }
},
//수정
async requestModifyCartToSpring ({}, payload) {
    const { itemId, quantity, category } = payload

    return await axiosInst.put("/cart/modify", {
        itemId: itemId,
        quantity: quantity,
        itemCategoryType: category
    })
        .then(() => {
            alert("수량이 변경되었습니다.")
        })
        .catch(() => {
            alert("문제 발생!")
        })
},
//셀프 샐러드 장바구니 추가
async requestSelfSaladAddCartToSpring({}, payload) {
    // const { title, quantity, totalPrice, totalCalorie, memberId, selfSaladRequestList } = payload;
    // let json = JSON.stringify(payload);
    console.log("payload  "+JSON.stringify(payload))
    try {
        await axiosInst.post("/cart/selfsalad/register", payload , {
        headers: {
            'Content-Type': 'application/json'
        }})
    if (confirm("장바구니가 추가되었습니다. 장바구니로 이동하시겠습니까?")) {
    window.location.href = "http://localhost:8080/my-info-cart";
    } else {
    }
    } catch (error) {
        alert("문제가 발생하여 장바구니에 추가되지 않았습니다.");
    }
},
//리스트
async requestSelfSaladAddCartListToSpring({ commit }, memberId) {
    return await axiosInst.get(`/cart/list/${memberId}`)
    .then((res) => {
        commit(REQUEST_SELFSALAD_ADD_CART_LIST_TO_SPRING, res.data);
        console.log('리스트 연결');
    })
},
//셀프샐러드 수정 읽기
async requestSelfSaladToSpring ({ commit }, itemId) {
    console.log("액션에서 출력한 아이디는 "+itemId)
    return await axiosInst.get(`/cart/selfsalad/read/${itemId}`)
        .then((res) => {
            commit(REQUEST_SELFSALAD_TO_SPRING, res.data)
            console.log('읽기 연결');
    })
},

async requestSelfSaladCartModifyToSpring({}, payload) {
    const itemId = payload.itemId; // payload에서 itemId 추출
    console.log("payload  "+JSON.stringify(payload))
    console.log("itemId: ", itemId)
    await axiosInst.put(`/cart/selfsalad/modify/${itemId}`, payload, {
        headers: {
            'Content-Type': 'application/json'}})
        .then(() => {
                alert("수정이 완료 되었습니다.")
        })
        .catch(() => {
            alert("문제가 발생하여 장바구니 수정이 되지 않았습니다.");
        })
    }
}
