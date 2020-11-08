<template>
	<view class="address">
		<view class="inputbox">
			<view class="name">
				<text>*</text>姓名
			</view>
			<input type="text" name="" id="" v-model="name" placeholder="请输入姓名">
		</view>
		<view class="inputbox">
			<view class="name">
				<text>*</text>联系方式
			</view>
			<input type="number" maxlength="11" v-model="phone" name="" id="" placeholder="请输入手机号">
		</view>
		<view class="inputbox">
			<view class="name">
				<text></text>所在区域
			</view>
			<view class="right" @click="handleTap('picker1')">
				<view class="">
					{{ares}}
				</view>
				<image src="../../static/image/right.png" mode=""></image>
			</view>
		</view>
		<view class="inputbox">
			<view class="name">
				<text></text>我的公司
			</view>
			<input type="text" v-model="c_name" name="" id="" placeholder="请输入公司">
		</view>
		<lb-picker ref="picker1" v-model="value" mode="multiSelector" :list="list" :level="3" @change="handleChange" @confirm="handleConfirm"
		 @cancel="handleCancel">
		</lb-picker>
		<view class="btn" @click="btns">
			提交
		</view>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	export default {
		data() {
			return {
				value: [],
				ares: '请选择地址',
				name: '',
				phone: '',
				c_name: '',
				pro: '',
				city: "",
				area: '',
				pro_name: '',
				area_name: '',
				city_name: '',
				list: []
			}
		},
		components: {
			LbPicker
		},
		onLoad() {

		},
		created() {
			var _this = this
			uni.getStorage({
				key: 'applet_get_area',
				success(res) {
					_this.list = res.data
				},
				fail() {
					_this.$request('applet.php?map=applet_get_area', {}, res => {
						_this.list = res.pro;
						uni.setStorage({
							key: 'applet_get_area',
							data: res.pro
						})
					})
				}
			})
		},
		methods: {
			btns() {
				let data = {
					name: this.name,
					phone: this.phone,
					c_name: this.c_name,
					pro: this.pro,
					city: this.city,
					area: this.area,
					pro_name: this.pro_name,
					city_name: this.city_name,
					area_name: this.area_name,

				}
				this.$emit('conmit', data)
			},
			handleTap(picker) {
				this.$refs[picker].show()
			},
			handleChange(e) {
				console.log('change::', e)
			},
			handleConfirm(e) {
				console.log('confirm::', e)
				if (e) {
					this.ares = e.item.map(item => item.name).join('-');
					if (e.item[0]) {
						this.pro_name = e.item[0].name;
						this.pro = e.item[0].id;
					}
					if (e.item[1]) {
						this.city_name = e.item[1].name;
						this.city = e.item[1].id;

					} else {
						this.city = '';
					}
					if (e.item[2]) {
						this.area_name = e.item[2].name;
						this.area = e.item[2].id;
					} else {
						this.area = '';
					}
				}
			},
			handleCancel(e) {
				console.log('cancel::', e)
			}
		}
	}
</script>

<style scoped lang="scss">
	.address {
		overflow: hidden;
		margin: 38rpx auto;
		width: 690rpx;
		min-height: 500rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 9rpx 0px rgba(11, 9, 11, 0.32);
		border-radius: 15rpx;

		.inputbox {
			height: 126rpx;
			display: flex;
			align-items: center;
			width: 100%;
			border-bottom: 1px solid #DCDCDC;

			.name {
				display: flex;
				width: 270rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #1A1A1A;
				align-items: center;
				padding-left: 20rpx;

				text {
					width: 17rpx;
					color: #DF0023;
				}
			}

			.right {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				view {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #333333;
				}

				image {
					width: 12rpx;
					height: 21rpx;
				}
			}
		}
	}

	.btn {
		width: 377rpx;
		height: 90rpx;
		background: #DF0023;
		border-radius: 45rpx;
		font-size: 35rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 90rpx;
		margin: 60rpx auto;
	}
</style>
