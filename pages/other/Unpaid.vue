<template>
	<view class="content">
		<view class="list">
			<view class="items" v-for="(item,index) in goodsList" :key="index">
				<view class="title">
					<view class="left">订单编号：{{item.tid}}</view>
					<view class="type">
						{{item.status_desc}}
					</view>
				</view>
				<view class="goods">
					<image :src="item.cover" mode=""></image>
					<view class="right">
						<view class="names">
							{{item.name}}
						</view>
						<view class="money">
							<view class="left">
								￥<text>{{item.price_fee}}</text>
							</view>
							<view class="pay_moey">
								待付款：￥{{item.price_fee}}
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="set">
						<view class="time">
							预约时间：{{item.start_time}}
						</view>
						<view class="btn">
							去付款
						</view>
					</view>
					<view class="daojishi" v-if="item.close_time > 0">
						剩余{{item.msg}}后自动取消支付
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[],
				page:0,
				plum_session_applet:''
				
			}
		},
		onLoad() {
			this.plum_session_applet = uni.getStorageSync('plum_session_applet');
			this.getMsg();
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		onReachBottom() {
			this.getMsg();
		},
		methods: {
			// 获取数据
			getMsg(){
				this.$request('applet.php?map=applet_service_trade_list&plum_session_applet='+this.plum_session_applet+'&page='+this.page+'&status=1',{
				}, res => {
					if (res.ec == 200) {
						let data = res.data.list;
						if (data.length > 0) {
							this.page++
							this.goodsList = this.goodsList.concat(data);
							this.timer && clearTimeout(this.timer)
							this.timeDown()
						} else if (data.length == 0 && this.page != 1) {
							uni.showToast({
								icon: 'none',
								title: '暂无更多数据'
							})
						}
					}
				})
			},
			timeDown() {
				this.goodsList.map(item => {
					if (item.close_time > 0) {
						let minutes, seconds
						minutes = Math.floor((item.close_time / 60) % 60);
						seconds = Math.floor(item.close_time % 60);
						this.$set(item, 'msg')
						item.msg = minutes + '分' + seconds + '秒后';
						item.close_time--
					}
					return item
				})
				this.timer = setTimeout(_ => {
					this.timeDown()
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		min-height: 100vh;
		height: auto;
		background-color: #F5F5F5;
	}

	.items {
		width: 750rpx;
		height: 424rpx;
		margin-bottom: 18rpx;
		background: #FFFFFF;
		padding: 0 30rpx;

		.title {
			width: 100%;
			height: 97rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #E5E5E5;

			.left {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #656565;
			}

			.type {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #DF0023;
			}
		}

		.goods {
			display: flex;
			padding: 20rpx 0;

			image {
				width: 210rpx;
				height: 167rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}

			.right {
				flex: 1;
				padding-left: 20rpx;
				display: flex;
				flex-flow: column;
				height: 167rpx;

				.names {
					height: 120rpx;
					font-size: 30rpx;
					line-height: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}

				.money {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #DF0023;

						text {
							font-size: 40rpx;
						}
					}

					.pay_moey {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #DF0023;
					}
				}
			}
		}

		.bottom {
			height: 118rpx;
			display: flex;
			flex-flow: column;
			justify-content: center;

			.set {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.time {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #656565;
				}

				.btn {
					width: 150rpx;
					height: 60rpx;
					background: #DF0023;
					border-radius: 10rpx;
					font-size: 31rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 60rpx;
				}
			}

			.daojishi {
				font-size: 23rpx;
				font-family: Source Han Sans CN;
				font-weight: 300;
				color: #DF0023;
			}
		}
	}
</style>
