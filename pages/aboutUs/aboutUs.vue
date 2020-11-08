<template>
	<view>
		<view class="aboutTopBac">
			<image src="../../static/image/about.jpeg" mode=""></image>
		</view>
		<view class="gs_product">
			<view class="title">
				—重庆美圆多企业管理（集团）有限公司—
			</view>
			<view class="products">
				<image src="../../static/image/about.jpeg" mode=""></image>
				<view class="txtes">
					重庆美圆多企业管理（集团）重庆美圆多企业管理（集团）重庆美圆多企业管理（集团）有限公司成立于2014年，注册资本2000万人民币。公司是重庆市唯一一家同时拥有重庆股份转让中心、上
				</view>
			</view>
		</view>
		<view class="" style="width: 750rpx;height: 8rpx;background: #EDEDED;">
			
		</view>
		<view class="case">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					公司资质荣誉
				</view>
			</view>
			<view class="indexScroll" scroll-x>
				<view class="flexCenter"  v-for="(item,index) in 5" :key='index'>
					<image src="../../static/image/home4.png" mode=""></image>
					<view class="name yichu1">
						美圆多挂牌案例
					</view>
					<view class="yichu4">EnterpriseAccelerator，是一种以快速成长企业为主要服务对象，通过服务模式创新充分...... </view>
				</view>
			</view>
		</view>
		<view class="" style="width: 750rpx;height: 8rpx;background: #EDEDED;">
			
		</view>
		<view class="items">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					泸州孵化园
				</view>
			</view>
			<view class="products">
				<image src="../../static/image/about.jpeg" mode=""></image>
				<view class="texter yichu4">
				  以资本市场的内在发展规律为基准，充分发挥市场竞争机制，以市场化为运作手段推动发展；充分发挥资源优势，为客户提供专业化的市场人才、专业化的业务支持、专业化的服务。
				</view>
			</view>
		</view>
		<view class="" style="width: 750rpx;height: 8rpx;background: #EDEDED;">
			
		</view>
		<view class="callme" style="		margin-bottom: 40rpx;">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					联系我们
				</view>
			</view>
			<view class="box">
				<view class="callme_item">
					<view class="left">
						<image src="../../static/image/indexCall.png"></image>
						<view>联系电话：</view>
					</view>
					<view class="right">
						400-023-5180/15823807176
					</view>
				</view>
				<view class="callme_item">
					<view class="left">
						<image src="../../static/image/indexAddress.png"></image>
						<view>公司地址：</view>
					</view>
					<view class="right">
						重庆市九龙坡区石桥铺石杨路17号创新服务中心附17-1号
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
				datas: {}
			};
		},
		onLoad() {
			// this.getMsg()
		},
		methods: {
			getMsg() {
				this.$request('applet.php?map=applet_zf_aboutus&suid=gaus0xcyuh', {}, res => {
					if (res.ec == 200) {
						this.datas = res.data
					}
				})
			},

		}
	}
</script>

<style lang="less">
	.first_title {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding-left: 30rpx;

		.lines {
			width: 8rpx;
			height: 50rpx;
			background: #E62129;
			border-radius: 4rpx;
		}

		.name {
			padding-left: 10rpx;
			line-height: 50rpx;
			font-size: 34rpx;
			font-family: SourceHanSansCN;
			font-weight: 400;
			color: #232323;
		}
	}

	.aboutTopBac image {
		width: 750rpx;
		height: 225rpx;
		z-index: -2;
	}

	.gs_product {
		margin: -80rpx auto 30rpx;
		width: 590rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.5);
		border-radius: 10rpx;
		padding: 10rpx;
		overflow: hidden;
		position: relative;
		z-index: 99;
		.title {
			line-height: 80rpx;
			font-size: 30rpx;
			font-family: SourceHanSansCN;
			font-weight: 400;
			color: #232323;
			text-align: center;
		}

		.products {
			width: 570rpx;
			overflow: hidden;

			image {
				width: 271rpx;
				height: 189rpx;
				margin-right: 20rpx;
				margin-left: 10rpx;
				float: left;
			}

			.txtes {
				font-size: 25rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: #666666;
				line-height: 30rpx;
				margin-right: 10rpx;
			}
		}
	}
	
	.indexScroll {
		display: flex;
		overflow-x: scroll;
	
		.flexCenter {
			width: 275rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 20rpx 0px rgba(11, 9, 11, 0.13);
			border-radius: 13rpx;
			margin-left: 27rpx;
			margin-bottom: 20rpx;
			flex-direction: column;
	
			image {
				width: 275rpx;
				height: 229rpx;
			}
	
			.yichu1 {
				width: 248rpx;
				height: 35rpx;
				font-size: 25rpx;
				color: #232323;
				line-height: 35rpx;
				margin-top: 15rpx;
				margin-bottom: 5rpx;
			}
	
			.yichu4 {
				width: 240rpx;
				height: 120rpx;
				font-size: 20rpx;
				color: #666666;
				line-height: 30rpx;
				margin-bottom: 10rpx;
			}
		}
	}	
	
	.items{
		.products{
			image{
				width: 690rpx;
				height: 300rpx;
				border-radius: 15rpx;
				margin: 0 30rpx;
			}
			.texter{
				margin: 0 auto;
				width: 630rpx;
				height: 170rpx;
				padding-top: 10rpx;
				font-size: 25rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: #3D3D3D;
				line-height: 40rpx;
				text-indent:2em;
			}
			
		}
	}
	
	.box{
		width: 610rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.5);
		border-radius: 10rpx;
		padding:20rpx 10rpx;
		margin: 0 auto;
		.callme_item{
			display: flex;
			.left{
				flex: 1;
				display: flex;
				align-items: center;
				image{
					width: 41rpx;
					height: 41rpx;
				}
				view{
					font-size: 27rpx;
					font-family: SourceHanSansCN;
					font-weight: 400;
					color: #232323;
				}
			}
			.right{
				width: 400rpx;
				font-size: 27rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: #232323;
			}
		}
	}
</style>
