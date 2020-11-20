<template>
	<view>
		<view class="aboutTopBac">
			<image src="../../static/image/about.jpeg" mode=""></image>
		</view>
		<view class="infoList">
			<view class="flex info">
				<view class="infoLeft">
					<view class="flex">
						公司 <view class="xian"></view> Company
					</view>
					{{datas.c_name}}
				</view>
				<image src="../../static/image/enterprise.png" mode=""></image>
			</view>
			<view class="flex info">
				<view class="infoLeft">
					<view class="flex">
						地址 <view class="xian"></view> Address
					</view>
					{{datas.address}}
				</view>
				<image src="../../static/image/address.png" mode=""></image>
			</view>
			<view class="flex info">
				<view class="infoLeft">
					<view class="flex">
						工作时间 <view class="xian"></view> Working Hours
					</view>
					{{datas.work_time}}
				</view>
				<image src="../../static/image/time.png" mode=""></image>
			</view>
			<view class="flex info">
				<view class="infoLeft">
					<view class="flex">
						电话 <view class="xian"></view> Telephone
					</view>
					{{datas.mobile}}
				</view>
				<image src="../../static/image/phone.png" mode=""></image>
			</view>
		</view>
		<view class="huiXian"></view>
		<view class="aboutTitle">
			—企业简介—
		</view>
		<!-- <view class="juXing">
			<text>
				公司核心合伙人管理团队皆来自国内知名的风险投融资机构，目前公司团队30余人，由一批高学历、高中级技术职称的专业人士组成，其中 具有高级职称15人注册会计师6人，律师从业资格2人，政策咨询师8人，客服经理10人。</text>
		</view> -->
		<image class="aboutImg" :src="datas.image1" mode="widthFix"></image>
		<view style="height: 40rpx;">
			
		</view>
		<view class="huiXian"></view>
		<view class="aboutTitle">
			—企业服务—
		</view>
		<image class="infoima" :src="datas.service_image" mode=""></image>
		<view class="infoList infoList2">
			<view class="flex info">
				<view class="infoLeft">
					<view class="flex">
						地址 <view class="xian"></view> Address
					</view>
					{{datas.address}}
				</view>
				<image src="../../static/image/address.png" mode=""></image>
			</view>
			<view class="flex info">
				<view class="infoLeft">
					<view class="flex">
						电话 <view class="xian"></view> Telephone
					</view>
					{{datas.work_time}}
				</view>
				<image src="../../static/image/phone.png" mode=""></image>
			</view>
		</view>
		<view class="btns flex">
			<view class="flexCenter" @click="callphone">
				预约
			</view>
			<button class="flexCenter" open-type="contact">
				在线客服
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas:{}
			};
		},
		onLoad() {
			this.getMsg()
		},
		methods:{
			getMsg(){
				this.$request('applet.php?map=applet_zf_aboutus&suid=gaus0xcyuh',{},res=>{
					if(res.ec ==200){
						this.datas = res.data
					}
				})
			},
			callphone(){
				uni.makePhoneCall({
				    phoneNumber: this.datas.mobile //仅为示例
				});
			}
		}
	}
</script>

<style lang="less">
	.juXing {
		width: 400rpx;
		height: 0rpx;
		border-top: 300rpx solid red;
		border-right: 0;
		border-left: 90rpx solid transparent;
		position: relative;
		text {
			position: absolute;
			left: -150rpx;
			top: -300rpx;
			font-size: 23rpx;
			color: #242424;
			border-left: 90rpx solid transparent;
		}
	}
	.aboutTitle {
		font-size: 34rpx;
		color: #DF0024;
		margin-top: 35rpx;
		text-align: center;
	}
	.huiXian {
		width: 750rpx;
		height: 20rpx;
		background: #F5F5F5;
	}
	.infoList {
		width: 590rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.5);
		border-radius: 15rpx;
		padding: 0 20rpx;
		margin: -70rpx auto 40rpx;
		.info {
			justify-content: space-between;
			width: 550rpx;
			border-bottom: 1px solid #D2D2D2;
			padding: 20rpx;
			.infoLeft {
				width: 446rpx;
				color: #242424;
				font-size: 25rpx;
				.flex {
					font-size: 21rpx;
					color: #8D8D8D;
					.xian {
						width: 2rpx;
						height: 20rpx;
						background: #8E8C8C;
						margin: 0 20rpx;
					}
				}
			}
			image {
				width: 46rpx;
				height: 39rpx;
			}
		}
	}
	.infoList2 {
		border: none;
		box-shadow: none;
		margin-top: 40rpx;
	}
	.aboutTopBac {
		width: 750rpx;
		height: 254rpx;
		position: relative;
		z-index: -1;
		image{
			width: 750rpx;
			height: 254rpx;
		}
	}
	.infoima {
		width: 690rpx;
		height: 290rpx;
		margin: 40rpx auto;
		display: block;
	}
	.btns {
		width: 550rpx;
		margin: 55rpx auto;
		display: flex;
		justify-content: space-between;
		.flexCenter {
			width: 219rpx;
			height: 74rpx;
			background: #DF0024;
			border-radius: 15rpx;
			font-size: 38rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			border: none;
			margin: 0;
		}
	}
	.aboutImg{
		width: 710rpx;
		height: 300rpx;
		margin: 0 auto;
		display: block;
		margin-top: 20rpx;
	}
</style>