import {
    REQUEST_ADD_CART_LIST_TO_SPRING,
    REQUEST_SELFSALAD_ADD_CART_LIST_TO_SPRING,
    REQUEST_SELFSALAD_TO_SPRING,
    
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
// 장바구니에 추가
async requestAddCartToSpring({}, payload) {
    const { itemId, category, quantity } = payload;

    try {
        await axiosInst.post("/cart/register", { itemId, category, quantity },
        {
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("userToken"),
                'Content-Type': 'application/json'
            }
        });
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
async requestAddCartListToSpring({ commit }) {
    return await axiosInst.get(`/cart/list`,
    {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        }
    })
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
    const { itemId, quantity } = payload

    return await axiosInst.put("/cart/modify", {
        itemId: itemId,
        quantity: quantity,
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
    const { title, quantity, totalPrice, totalCalorie, selfSaladRequestList } = payload;
    let newTemp = []; // 새로운 배열 생성
    for (let i = 0; i < selfSaladRequestList.length; i++) {
        const { ingredientId, selectedAmount, amountType } = selfSaladRequestList[i];
        if (selectedAmount > 0) {
            newTemp.push({ ingredientId, selectedAmount, amountType });
        } 
    }
    console.log("payload  "+JSON.stringify(payload))
    try {
        await axiosInst.post("/cart/selfsalad/register", {title, quantity, totalPrice, totalCalorie, selfSaladRequestList: newTemp} , {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("userToken"),
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

//셀프샐러드 수정 읽기
async requestSelfSaladToSpring ({ commit }, itemId) {
    console.log("액션에서 출력한 아이디는 "+itemId)
    return await axiosInst.get(`/cart/selfsalad/read/${itemId}`)
        .then((res) => {
            commit(REQUEST_SELFSALAD_TO_SPRING, res.data)
            console.log('읽기 연결');
    })
},
//셀프샐러드 수정 완료
async requestSelfSaladCartModifyToSpring({}, payload) {
    const itemId = payload.itemId; // payload에서 itemId 추출

    console.log("payload  "+JSON.stringify(payload))
    console.log("itemId: "+ itemId)
    
    const {totalPrice, totalCalorie, selfSaladModifyRequestList} = payload;

    await axiosInst.put(`/cart/selfsalad/modify/${itemId}`, 
    { totalPrice, totalCalorie, selfSaladModifyRequestList} , {
        headers: {
            'Content-Type': 'application/json'}})
        .then(() => {
                alert("수정이 완료 되었습니다.")
        })
        .catch(() => {
            alert("문제가 발생하여 장바구니 수정이 되지 않았습니다.");
        })
    },

//선택 삭제
async requestSelectDeleteCartToSpring ({}, payload) {      
    console.log("액션에서 찍은 삭제 리스트 : "+ JSON.stringify(payload))

    return await axiosInst.delete("/cart/delete/list", { data: payload })
        .then(() => {
        alert("장바구니에서 삭제되었습니다.")
        })
        .catch(() => {
        alert("문제 발생!")
        })
    },
// 주문성공시 주문 정보 저장
async reqRegisterOrderToSpring({}, payload) {
    const {totalOrderPrice, deliveryRegisterRequest, paymentRequest, orderItemRegisterRequestList} = payload;

    try {
        await axiosInst.post("order/register",
    {totalOrderPrice, deliveryRegisterRequest, paymentRequest, orderItemRegisterRequestList},
    {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        }
    });
}
    // }   .then((res) => {
    //     console.log(res)
    //     this.$router.push('/purchase-complete');
    //     // window.location.href = "http://localhost:8080/purchase-complete"
    // })
    catch (error) {
        alert("오류발생 !!!")
    }
},
// 신규 배송지 등록
async reqMyPageRegisterDeliveryToSpring({}, payload) {
    const { zipcode, city, street, addressDetail } = payload
    console.log(payload);
    try {
        await axiosInst.put(`/member/profile-address/register`, 
        { zipcode, city, street, addressDetail },
        {
            headers: {
            'Authorization': 'Bearer '+localStorage.getItem("userToken"),
            }
        })          
        console.log("신규 배송지 등록 : "+ JSON.stringify(payload))
        alert('신규 배송지가 성공적으로 등록되었습니다.');
    } catch {
        alert('신규 배송지 등록되지 않았다!')
    }
          
          
},

}



