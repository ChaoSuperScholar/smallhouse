<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key='index' @click="godetails(item)">
				<image :src="item.cover" mode=""></image>
				<view class="right">
					<view class="names">
						{{item.name}}
					</view>
					<view class="produt">
						{{item.brief}}
					</view>
					<view class="money">
						<view class="left">
							￥<text>{{item.price}}</text>
						</view>
						<view class="pay_moey">
							剩余办公室:{{item.stock}}
						</view>
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
				page: 0,
				list: []
			}
		},
		onLoad() {
			this.plum_session_applet = uni.getStorageSync('plum_session_applet');
			this.getMsg();
		},
		onReachBottom() {
			this.getMsg();
		},
		methods: {
			//	获取数据		
			getMsg() {
				this.$request('applet.php?map=applet_zf_my_collet'+'&page= '+this.page+'&plum_session_applet='+this.plum_session_applet ,{
					page: this.page,
					plum_session_applet:this.plum_session_applet
				}, res => {
					if (res.ec == 200) {
						let data = res.data.list;
						if (data.length > 0) {
							this.page++
							this.list = this.list.concat(data);
						} else if (data.length == 0 && this.page != 1) {
							uni.showToast({
								icon: 'none',
								title: '暂无更多数据'
							})
						}
					}
				})
			},
			//去商品详情
			godetails(e){
				let url
				if(e.type==1){
					url=`/pages/detail/detail?x=2&typ=2&id=${e.id}`
				}else{
					url=`../detail/detail?typ=2&id=${e.id}&x=2`
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		min-height: 100vh;
		height: auto;
		background-color: #FFFFFF;
	}

	.item {
		height: 270rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
		width: 690rpx;
		margin: 0 30rpx;

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
				font-size: 35rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #151515;
			}

			.produt {
				font-size: 29rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #777777;
				padding-top: 15rpx;
			}

			.money {
				padding-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					font-size: 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #DF0023;

					text {
						font-size: 33rpx;
					}
				}

				.pay_moey {
					font-size: 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #777777;
				}
			}
		}
	}
</style>
