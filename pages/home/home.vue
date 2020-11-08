<template>
	<view class="content">
		<!-- 头部 -->
		<view class="myTop">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view class="title">
				我的
			</view>
			<image class="top_bg" src="../../static/image/home_bg.png" mode=""></image>
			<view class="header" @click="tologin">
				<image :src="info.avatar?info.avatar:'../../static/image/index0.png'" mode=""></image>
				<view class="right">
					<view class="name">
						{{info.nickname}}
					</view>
					<view class="id">
						会员ID:{{info.id}}
					</view>
				</view>
			</view>
		</view>

		<!-- vip -->
		<image @click="goVip" class="vip" src="../../static/image/2.png" mode="widthFix"></image>
		<!-- 我的 租借 -->
		<view class="lease" @click="goappointment(0)">
			<view>
				我的租赁
			</view>
			<text>全部租赁></text>
		</view>
		<!-- 导航 -->
		<view class="tab">
			<view class="item_tab" @click="gopay">
				<image src="../../static/image/dfk.png" mode=""></image>
				<view>待支付</view>
			</view>
			<view class="item_tab" @click="goappointment(2)">
				<image src="../../static/image/dwc.png" mode=""></image>
				<view>租赁中</view>
			</view>
			<!-- <view class="item_tab" @click="goappointment(4)">
				<image src="../../static/image/money.png" mode=""></image>
				<view>续租</view>
			</view> -->
			<view class="item_tab" @click="goappointment(3)">
				<image src="../../static/image/ywc.png" mode=""></image>
				<view>已完成</view>
			</view>
		</view>
		<!-- jianxi -->
		<view class="" style="width: 100%;height: 18rpx;background-color: #F5F5F5;">

		</view>
		<!-- 服务 -->
		<view class="servise">
			<view class="ser_title">
				我的服务
			</view>
			<view class="choose_type">
				<view class="item">
					<image src="../../static/image/home1.png" mode=""></image>
					<view class="name">
						代账续约
					</view>
				</view>
				<view class="item">
					<image src="../../static/image/home2.png" mode=""></image>
					<view class="name">
						租赁续约
					</view>
				</view>
				<view class="item">
					<image src="../../static/image/home3.png" mode=""></image>
					<view class="name">
						园区续租
					</view>
				</view>
				<view class="item">
					<image src="../../static/image/home4.png" mode=""></image>
					<view class="name">
						租赁续约
					</view>
				</view>
				<view class="item">
					<image src="../../static/image/home5.png" mode=""></image>
					<view class="name">
						学习园地
					</view>
				</view>
				<view class="item" style="position: relative;">
					<image src="../../static/image/home6.png" mode=""></image>
					<view class="name">
						联系客服
					</view>
					<button open-type="contact"></button>
				</view>
			</view>
			
			
			<!-- <view class="list_item" @click="gocollection">
				<view class="left">
					<image src="../../static/image/star.png" mode=""></image>
					<view>
						我的收藏
					</view>
				</view>
				<view class="right">
					<image src="../../static/image/right.png" mode=""></image>
				</view>
			</view>
			<view class="list_item" @click="goinformation">
				<view class="left">
					<image src="../../static/image/xxws.png" mode=""></image>
					<view>
						信息完善
					</view>
				</view>
				<view class="right">
					<image src="../../static/image/right.png" mode=""></image>
				</view>
			</view>
			<view class="list_item">
				<view class="left">
					<image src="../../static/image/zhgl.png" mode=""></image>
					<view class="">
						
					</view>
					
				</view>
				<view class="right">
					<image src="../../static/image/right.png" mode=""></image>
				</view>
				<button  >
				</button>
			</view> -->
		</view>
		<view class="" style="width: 750rpx;height: 70rpx;background: #F5F5F5;text-align: center;line-height: 70rpx;font-size: 26rpx;color: #A9A9A9;">
			微客巴巴18580858050提供技术支持
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad() {
		},
		onShow() {
			this.getMsg();
			
		},
		methods: {
			getMsg(){
				this.$request('applet.php?map=applet_my_center',{},res=>{
					if(res.ec == 200){
						this.info = res.data
					}
				})
			},
			goVip(){
				uni.navigateTo({
					url:'../detail/detail?typ=3'
				})
			},
			gopay(){
				if(uni.getStorageSync('slient') == 1){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url:'/pages/other/Unpaid'
				})
			},
			gocollection(){
				if(uni.getStorageSync('slient') == 1){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url:'/pages/other/Collection'
				})
			},
			goinformation(){
				if(uni.getStorageSync('slient') == 1){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url:'/pages/other/information'
				})
			},
			goappointment(index){
				uni.setStorageSync('status', index);
				uni.navigateTo({
					url:'/pages/appointment/appointment?status='+index
				})
			},
			gologin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.myTop {
		width: 750rpx;
		height: 452rpx;
		position: relative;
		background: #FFFFFF;

		.title {
			font-size: 36rpx;
			font-weight: 500;
			text-align: center;
			z-index: 10;
			line-height: 88rpx;
			position: relative;
			z-index: 10;
			color: #fff;
		}

		.top_bg {
			width: 750rpx;
			height: 452rpx;
			position: absolute;
			left: 0;
			top: 0;
		}

		.header {
			position: relative;
			z-index: 10;
			display: flex;
			margin-top: 20rpx;
			margin-left: 30rpx;
			align-items: center;

			image {
				width: 146rpx;
				height: 146rpx;
				border-radius: 50%;
				overflow: hidden;
				background-color: #FFFFFF;
			}

			.right {
				padding-left: 15rpx;

				.name {
					font-size: 33rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}

				.id {
					padding-top: 10rpx;
					font-size: 25rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

		}
	}

	.vip {
		width: 750rpx;
		margin-top: -105rpx;
		z-index: 99;
		position: relative;
	}

	.lease {
		width: 100%;
		background-color: #FFFFFF;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		border-bottom: 1px solid #E1E1E1;

		view {
			font-size: 29rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #232323;
		}

		text {
			font-size: 21rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #6C6C6C;
		}
	}

	.tab {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		width: 100%;
		height: 184rpx;

		.item_tab {
			flex: 1;
			display: flex;
			flex-flow: column;
			align-items: center;
			image {
				width: 60rpx;
				height: 60rpx;
			}

			view {
				padding-top: 10rpx;
				font-size: 21rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #232323;
			}
			
		}
	}

	.servise {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;

		.ser_title {
			height: 115rpx;
			padding-top: 25rpx;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #232323;
			line-height: 90rpx;
			padding-left: 30rpx;
			border-bottom: 1px solid #E1E1E1;
		}
		.choose_type{
			display: flex;
			width: 690rpx;
			display: flex;
			flex-wrap: wrap;
			margin: 0 30rpx;
			padding-bottom: 30rpx;
			.item{
				width: 25%;
				display: flex;
				align-items: center;
				flex-flow: column;
				justify-content: center;
				image{
					width: 80rpx;
					height: 80rpx;
					margin: 30rpx 0 20rpx;
				}
				.name{
					font-size: 22rpx;
					font-family: SourceHanSansCN;
					font-weight: 400;
					color: #232323;
				}
				button{
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
				}
			}
		}
		
	}
</style>
