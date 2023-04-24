import {
    REQUEST_ORDER_PAGE_DELIVERY_LIST_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosObject'

export default {
    // 주문 페이지에서 보는 배송지 목록
    reqOrderPageDeliveryListToSpring({ commit }, memberId) {
        return axiosInst.get(`/delivery/list/${memberId}`)
            .then((res) => {
                let returnData = JSON.stringify(res.data);
                console.log("리턴 데이터: "+ returnData);
                
                localStorage.setItem("lsDeliveryList", JSON.stringify(res.data));
                commit(REQUEST_ORDER_PAGE_DELIVERY_LIST_TO_SPRING, res.data);
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    // 결제 성공시 주문정보 저장    
    reqRegisterOrderToSpring({}, payload) {
        const { amount, merchant_uid, sendInfo, imp_uid, phoneNumber, recipientName, road, addressDetail, zipcode, selectedDeliveryReq } = payload
        return axiosInst.post("/order/register",
            { amount, merchant_uid, sendInfo, imp_uid, phoneNumber, recipientName, road, addressDetail, zipcode, selectedDeliveryReq })
            .then((res) => {
                console.log(res)
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },

}