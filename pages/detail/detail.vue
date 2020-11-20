<template>
	<view class="detail content">
		<swiper class="detailSwiper" :indicator-dots="true" indicator-active-color="#E6222A" indicator-color="#FFFFFF"
		 :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in detail.slide" :key='index'>
				<view class="swiper-item">
					<image :src="item.image" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="detailTitle">
			{{detail.name}}
		</view>
		<view class="detailDesc">
			{{detail.brief}}
		</view>
		<view class="detailPrice flex">
			<text class="h">¥</text>{{detail.price}}<text class="hui">/{{typ == 1 ? '天' : '年'}}</text>
		</view>
		<view class="detailCheck flex" @click="time_type">
			<text>规格</text>
			<text>{{typ==1?value.length?value.join('——'):'选择时间':'选择规格'}}</text>
			<image src="../../static/image/right.png" mode=""></image>
		</view>
		<view class="detailD content">
			<view class="detailTitle">
				{{`${detail.name}详情`}}
			</view>
			<rich-text :nodes="detail.content"></rich-text>
		</view>
		<view class="detailFiex flex">
			<view class="left flexCenter" @click="goIndex">
				<image src="../../static/image/home_0.png" mode=""></image>
				<text>回首页</text>
			</view>
			<view class="left flexCenter" @click="applet" v-if="typ != 3">
				<image :src="`../../static/image/star${detail.is_collet?'':'_k'}.png`" mode=""></image>
				<text>收藏</text>
			</view>
			<view class="flexCenter btn" @click="gopay">
				立即购买
			</view>
		</view>
		<view style="height: 150rpx;"></view>
		<alretcheck v-if='idx==1' @idxChange='idxChange' @gopay='gopay' :detail='detail.name' @formatChange='formatChange'
		 :format_id='format_id' :List='detail.format'></alretcheck>
		<block v-if="currentdate&&endDate">
			<pyh-rdtpicker :show="isShow" @showchange="showchange" :value="value" @change="bindChange" :end='endDate' :start='currentdate'
			 themeColor="#4C83D6" ></pyh-rdtpicker>
		</block>
		<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' toolBarTitle="请选择开始时间"  :datestring='dateString' @change='dateTimeChange' endYear='2100'></date-time-picker>
	</view>
</template>

<script>
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue'
	export default {
		data() {
			return {
				idx: 0,
				isShow: false,
				format_id: '',
				typ: 0,
				value: [],
				currentdate: false,
				endDate: false,
				id: '',
				detail: {}
			};
		},
		onLoad(e) {
			if (e.typ) {
				this.typ = e.typ
				this.getNowFormatDate()
			}
			if (e.id) {
				this.id = e.id
			}
			this.getData(e.id)
		},
		components:{
			DateTimePicker
		},
		methods: {
			formatChange(e) {
				this.format_id = e
			},
			applet() {
				let z = this.detail.is_collet ? 1 : 0;
				var type = this.typ == 2 ? 1 : 2;
				this.$request(
					`/applet.php?map=applet_zf_collet&type=${type}&id=${this.id}&status=${z}`, {}, res => {
						this.getData(this.id)
					})
			},
			goIndex() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			getData(id) {
				
				const regex = new RegExp('<img', 'gi')
				if (this.typ == 3) {
					this.$request(`applet.php?map=applet_zf_vip_detail`, {}, res => {
						uni.setNavigationBarTitle({
							title: res.data.name
						})
						this.detail = res.data
						if(this.detail.content)
						this.detail.content = this.detail.content.replace(regex, `<img style="max-width: 100%;"`)
					})
					return
				}
				if (this.typ == 2) {
					this.$request(`/applet.php?map=applet_zf_service_detail&suid=gaus0xcyuh&id=${id}`, {}, res => {
						uni.setNavigationBarTitle({
							title: res.data.name
						})
						this.detail = res.data
						if(this.detail.content)
						this.detail.content = this.detail.content.replace(regex, `<img style="max-width: 100%;"`)
					})
				}
				if (this.typ == 1) {
					this.$request(`/applet.php?map=applet_house_details&id=${this.id}`, {}, res => {
						uni.setNavigationBarTitle({
							title: res.data.name
						})
						this.detail = res.data
						if(this.detail.content)
						this.detail.content = this.detail.content.replace(regex, `<img style="max-width: 100%;"`)
					})
				}
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if (this.typ == 1) {
					this.endDate = (parseFloat(year) + 20) + seperator1 + month + seperator1 + strDate.toString();
					this.currentdate = year + seperator1 + month + seperator1 + strDate.toString();
				} else {
					this.endDate = (parseFloat(year) + 20).toString();
					this.currentdate = year.toString()
				}
				console.log(this.typ, this.currentdate, this.endDate)
			},
			bindChange(e) {
				this.value = e
				if (this.typ != 1) {
					this.idx = 1
				}
			},
			time_type(){
				if(this.typ == 1){
					this.isShow = !this.isShow;
				}else{
					this.$refs['date-time'].show();
				}
			},
			dateTimeChange(value) {
				this.value = []
				this.value.push(value)
			 if (this.typ != 1) {
					if(this.detail.format.length==0){
						this.gopay()
					}else{
						this.idx = 1
					}
				}
			},
			showchange() {
				this.isShow = !this.isShow;
			},
			idxChange(e) {
				this.idx = e
			},
			gopay() {
				if (uni.getStorageSync('slient') == 1) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				let url = `/applet.php?map=applet_create_service_trade&type=${this.typ}&gid=${this.detail.id}`
				if (!this.value.length) {
					if(this.typ == 1){
						this.isShow = !this.isShow;
					}else{
						this.$refs['date-time'].show();
					}
					return
				}
				url += `&start_time=${this.value[0]}&end_time=${this.value[1]}`
				if (this.typ != 1 && this.format_id) {
					url += `&format_id=${this.format_id}`
				}
				var _this = this
				this.$request(url, {}, res => {
					uni.setStorage({
						key: 'orderDe',
						data: res.data,
						success() {
							uni.navigateTo({
								url: `/pages/other/order_details?id=${res.data.tid}&type=${_this.typ}`
							})
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.detailD {
			width: 100%;

			.detailTitle {
				font-size: 34rpx;
				color: #E7262E;
				width: 100%;
				text-align: center;
				margin-top: 28rpx;
			}

			.xian {
				width: 100%;
				height: 2rpx;
				background: #E7E7E7;
				position: relative;
			}

			.xian::after {
				width: 118rpx;
				height: 3rpx;
				background: #E6222A;
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				margin: auto;
			}
		}

		.detailCheck {
			width: 100%;
			height: 140rpx;
			border-top: 20rpx solid #F5F5F5;
			border-bottom: 20rpx solid #F5F5F5;
			justify-content: space-between;

			text:nth-child(1) {
				font-size: 26rpx;
				color: #7E7E7E;
				margin-left: 32rpx;
			}

			text:nth-child(2) {
				margin-left: 78rpx;
				font-size: 26rpx;
				color: #333333;
			}

			image {
				width: 9rpx;
				height: 16rpx;
				margin-left: auto;
				margin-right: 37rpx;
			}
		}

		.detailPrice {
			width: 700rpx;
			font-size: 63rpx;
			color: #E6222A;
			margin-bottom: 30rpx;

			.hui {
				font-size: 38rpx;
				color: #8D8D8D;
			}

			.h {
				font-size: 29rpx;
				color: #E6222A;
				margin-right: 20rpx;
			}
		}

		.detailSwiper {
			width: 748rpx;
			height: 400rpx;
		}

		.detailTitle {
			font-size: 38rpx;
			color: #242424;
			margin: 20rpx 0;
			width: 700rpx;
		}

		.detailDesc {
			width: 700rpx;
			font-size: 28rpx;
			color: #242424;
			margin-bottom: 30rpx;
		}

		.detailFiex {
			width: 750rpx;
			height: 130rpx;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;

			.btn {
				width: 276rpx;
				height: 83rpx;
				background: linear-gradient(0deg, #E6222A, #FF7D83);
				margin-left: auto;
				margin-right: 50rpx;
				font-size: 42rpx;
				color: #FFFFFF;
				border-radius: 40rpx;
			}

			.left {
				flex-direction: column;
				font-size: 21rpx;
				color: #7C7C7C;
				margin-left: 40rpx;

				image {
					width: 53rpx;
					height: 49rpx;
					margin-bottom: 17rpx;
				}
			}

			.left:nth-child(2) {
				image {
					width: 50rpx;
				}
			}
		}
	}
</style>
