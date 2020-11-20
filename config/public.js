import {
	request
} from './api.js'
const pub = {
	pay(tid){
		request(`applet.php?map=applet_pay_service_trade&tid=${tid}`,{},res=>{
			uni.requestPayment({
				provider: "wxpay",
				appId: res.data.appId,
				package: res.data.package,
				nonceStr: res.data.nonceStr,
				paySign: res.data.paySign,
				signType: res.data.signType,
				timeStamp: res.data.timeStamp,
				success: function(res) {
					uni.navigateTo({
						url:'/pages/appointment/appointment'
					})
				},
				fail: (err) => {
					uni.showToast({
						icon: 'none',
						title: '微信支付 失败'
					})
				}
			})
		})
	}
}

export default pub
