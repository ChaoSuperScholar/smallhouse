<template>
	<view>
		<view v-if="canIUse">
			<view class='header'>
				<image src='../../static/image/index3.png'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像，手机号等)</text>
			</view>
			<button class='bottom' v-show="!userInfo" type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo"
			 withCredentials='true'>授权登录
			</button>
			<button class='bottom' v-show="userInfo" type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号
			</button>
			<button class='bottom' type='primary' @click="goindex">取消登录</button>
		</view>
		<view v-else>请升级微信版本</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				userInfo: null,
				code: null,
				mobile:'',
				type:'',
			};
		},
		onLoad(e) {
			if(e.type){
				this.type = e.type
			}
			// uni.switchTab({
			// 	url:'../index/index'
			// })
			// return
			var that = this
			wx.getSetting({
				success: function(res) {
					if (res.authSetting['scope.userInfo']) {
						wx.getUserInfo({
							success: function(res) {
								that.userInfo = res.userInfo;
								console.log(that.userInfo);
							}
						});
					}
				}
			})
		},
		methods: {
			goindex() {
				uni.navigateBack({

				})
			},
			getPhoneNumber(e) {
				var _this = this
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					_this.code = loginRes.code
					let scene = '',
						dat;
					uni.getStorage({
						key: 'scene',
						success(res) {
							console.log(res);
							scene = res.data;
							
							if (e.detail.encryptedData) {
								dat = {
									code: _this.code,
									iv:encodeURIComponent(e.detail.iv),
									encryptedData: encodeURIComponent(e.detail.encryptedData)
								}
							} else if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
								uni.showToast({
									title: '请获取手机号完成登录',
									icon: 'none'
								})
								return
							}
							if (scene !== '') {
								dat.scene = scene
							}
							_this.Login(dat)
						},
						fail() {
							console.log(e);
							if (e.detail.encryptedData) {
								dat = {
									code: _this.code,
									iv: encodeURIComponent(e.detail.iv),
									encryptedData: encodeURIComponent(e.detail.encryptedData)
								}
							} else if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
								uni.showToast({
									title: '请获取手机号完成登录',
									icon: 'none'
								})
								return
							}
							_this.Login(dat)
						}
					})
				  }
				});
				
			},
			Login(dat) {
				let _this =this;
				_this.$request('applet.php?map=applet_bind_member_mobile&code=' + this.code+'&iv='+dat.iv+'&encryptedData='+dat.encryptedData+'&appid=wxe57483a62f88b851', {}, res => {
					if(res.ec == 200){
						_this.mobile = res.data;
						_this.bangding();
					}
				})
			},
			bindGetUserInfo(e) {
				var that = this;
				if (e.detail.userInfo) {
					//插入登录的用户的相关信息到数据库
					that.userInfo = e.detail.userInfo
					//授权成功后，跳转进入小程序首页
				} else if (e.detail.errMsg === "getUserInfo:fail 登录用户不是该小程序的开发者") {
					uni.showToast({
						icon: 'none',
						title: '登录用户不是该小程序的开发者'
					})
					setTimeout(() => {
						uni.switchTab({
							url: 'index'
						})
					}, 2000)
				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '警告',
						cancelText: '不授权',
						confirmText: '授权',
						confirmColor: '#37C31A',
						content: '若不授权微信登录，则无法正常使用小程序；点击重新获取授权，则可重新使用；若点击不授权，将无法使用便捷服务。',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								wx.openSetting({
									success: (res) => {
										if (res.authSetting['scope.userInfo']) {
											wx.getUserInfo({
												success: res => {
													that.userInfo = res.userInfo
												}
											})
										} else {
											console.info("再次不允许");
											uni.switchTab({
												url: 'index'
											})
										}
									}
								});
							} else if (res.cancel) {
								console.log('弹出框用户点击取消')
								uni.switchTab({
									url: 'index'
								})
							}
						}
					})
				}
			},
			bangding(){
				this.$request('applet.php?map=applet_update_member_info&nickname='+this.userInfo.nickName+'&sex='+this.userInfo. gender+'&mobile='+this.mobile+'&avatar='+this.userInfo.avatarUrl,{},res=>{
					if(res.ec ==200){
						uni.setStorageSync('slient',0)
						if(this.type == 2){
							uni.switchTab({
								url:'/pages/index/index'
							})
						}else{
							uni.navigateBack();
						}
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
