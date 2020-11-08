const baseurl = 'https://myd.jixuantiant.com/'
// const baseurl = '/api'

const request = (url, data, callback) => {
	uni.showLoading({
		title: '请等待！'
	})
	let header = {}
	if (uni.getStorageSync('plum_session_applet')) {
		let token = uni.getStorageSync('plum_session_applet');
		url.indexOf('?') == -1 ? url += `?plum_session_applet=${token}` : url += `&plum_session_applet=${token}`
	} else {
		// url.indexOf('?') == -1 ? url += `?plum_session_applet=1` : url += `&plum_session_applet=1`
	}
	uni.request({
		url: baseurl + url,
		data,
		header,
		method: 'POST',
		success: function(res) {
			uni.hideLoading()
			if (res.data.ec == 400) {
				// uni.removeStorage({
				// 	key: 'userToken'
				// });
				uni.showToast({
					icon: 'none',
					title: res.data.em
				});
				// uni.reLaunch({
				// 	url: '/pages/login/login'
				// });
			} else if (res.data.ec == 200) {
				callback(res.data)
			} else if (res.data.ec == 501) {
				uni.showModal({
					title: '提示',
					content: res.data.em,
					showCancel: false,
					success(r) {
						callback(res.data)
					}
				});
			} else {
				uni.showModal({
					title: '提示',
					content: res.data.em,
					showCancel: false,
				});
			}
		}
	});
}

module.exports = {
	request,
	baseurl
}
