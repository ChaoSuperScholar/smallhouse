<template>
	<view class="content">
		<view class="top_title">
			<view class="type">
				<image src="../../static/image/orderDetail.png" mode=""></image>
				<view class="">
					{{info.status_desc}}
				</view>
			</view>
			<view class="state" v-if="info.status_desc != '已过期'">
				<view class="left">
					订单正在进行中
				</view>
				<view class="time" style="padding-right: 30rpx;">
					{{info.end_time}}到期
				</view>
				
			</view>
			<view class="state" v-if="info.status_desc == '已过期'">
				<view class="left">
					订单已经完成
				</view>
				
			</view>
		</view>
		<view class="name">
			{{info.m_name   }} <text>{{info.m_mobile }}</text>
		</view>
		<!-- 间隙 -->
		<view class="" style="width: 100%; height: 18rpx;background: #F5F5F5;">

		</view>
		<!-- 商品 -->
		<view class="goods flex">
			<image :src="info.cover" mode=""></image>
			<view class="produt">
				<view class="name_goods yichu2">
					{{info.name}}
				</view>
				<view class="money">
					￥{{info.price}}
				</view>
			</view>
		</view>
		<!-- 间隙 -->
		<view class="" style="width: 100%; height: 18rpx;background: #F5F5F5;">
		
		</view>
		<view class="total" style="text-align: right;padding-right: 30rpx;line-height: 90rpx;font-size: 28rpx;color: #19110B;">
			合计金额：￥{{info.price_fee}}元
		</view>
		<view class="items">
			订单编号：{{info.tid}} 
		</view>
		<view class="items" v-if="info.format_name">
			规格：{{info.format_name}} 
		</view>
		<view class="items">
			下单时间：{{info.create_time}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tid:'',
				info:{}
			}
		},
		onLoad(e) {
			if(e.tid){
				this.tid = e.tid;
			}
			this.getMsg()
		},
		methods: {
			getMsg(){
				this.$request(`applet.php?map=applet_service_trade_detail&tid=${this.tid}`,{},res=>{
					this.info = res.data[0]
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

	.top_title {
		width: 750rpx;
		height: 140rpx;
		background: #EAEAEA;

		.type {
			display: flex;
			align-items: center;
			padding-top: 40rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin: 0 30rpx;
			}

			view {
				font-size: 29rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #696969;
			}
		}

		.state {
			padding-left: 90rpx;
			padding-top: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 25rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #696969;
		}
	}

	.name {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		font-size: 30rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #19110B;

		text {
			padding-left: 10rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
		}
	}

	.goods {
		width: 100%;
		height: 234rpx;
		padding: 35rpx 30rpx;
		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
			overflow: hidden;
		}
		.produt {
			width: 450rpx;
			display: flex;
			flex-flow: column;
			justify-content: space-between;
			padding-left: 20rpx;
			.name_goods {
				width: 100%;
				color: #19110B;
				font-size: 32rpx;
				height: 80rpx;
				line-height: 40rpx;
			}
			.money {
				padding-top: 10rpx;
				font-size: 27rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #DF0023;
			}
		}
	}
	.items{
		font-size: 25rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #696969;
		line-height: 58rpx;
		padding-left: 30rpx;
	}
</style>
