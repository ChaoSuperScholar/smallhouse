<template>
	<view class="conent">
		<view class="item">
			<view class="name">
				<text>*</text>
				姓名
			</view>
			<input type="text" value="" v-model="name" placeholder="请输入姓名" placeholder-style="font-size: 28rpx; color:#8F8F8F" />
		</view>
		<view class="item">
			<view class="name">
				<text>*</text>
				联系方式
			</view>
			<input type="number" maxlength="11" v-model="phone" value="" placeholder="请输入电话号码" placeholder-style="font-size: 28rpx; color:#8F8F8F" />
		</view>
		<view class="item">
			<view class="name">所在区域</view>
			<input
				type="text"
				value=""
				v-model="ares"
				placeholder="请输入详细地址"
				disabled="disabled"
				placeholder-style="font-size: 28rpx; color:#8F8F8F"
				@click="handleTap('picker1')"
			/>
		</view>
		<view class="item">
			<view class="name">我的公司</view>
			<input type="text" value="" v-model="c_name" placeholder="请输入公司信息" placeholder-style="font-size: 28rpx; color:#8F8F8F" />
		</view>
		<lb-picker ref="picker1" v-model="value" mode="multiSelector" :list="list" :level="3" @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel"></lb-picker>
		<view class="btn" @click="btns">提交</view>
	</view>
</template>

<script>
import LbPicker from '@/components/lb-picker';
export default {
	data() {
		return {
			value: [],
			ares: '请选择地址',
			name: '',
			phone: '',
			c_name: '',
			pro: '',
			city: '',
			area: '',
			pro_name: '',
			area_name: '',
			city_name: '',
			list: []
		};
	},
	components: {
		LbPicker
	},
	onLoad() {},
	created() {
		var _this = this;
		uni.getStorage({
			key: 'applet_get_area',
			success(res) {
				_this.list = res.data;
			},
			fail() {
				_this.$request('applet.php?map=applet_get_area', {}, res => {
					_this.list = res.pro;
					uni.setStorage({
						key: 'applet_get_area',
						data: res.pro
					});
				});
			}
		});
	},
	methods: {
		btns(data) {
			this.$request(
				'applet.php?map=applet_create_form_trade&type=5&name=' +
					this.name +
					'&mobile=' +
					this.phone +
					'&c_name=' +
					this.c_name +
					'&pro=' +
					this.pro +
					'&city=' +
					this.city +
					'&pro_name=' +
					this.pro_name +
					'&area=' +
					this.area +
					'&city_name=' +
					this.city_name +
					'&area_name=' +
					this.area_name ,
				{},
				res => {
					uni.showToast({
						icon: 'none',
						title: res.em
					});
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 800);
				}
			);
		},
		handleTap(picker) {
			this.$refs[picker].show();
		},
		handleChange(e) {
			console.log('change::', e);
		},
		handleConfirm(e) {
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
		}
	}
};
</script>

<style scoped lang="scss">
.item {
	display: flex;
	width: 720rpx;
	height: 90rpx;
	border-bottom: 2px solid #efefef;
	align-items: center;
	margin: 20rpx 15rpx 0;
	.name {
		width: 200rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2c2c2c;
		padding-left: 10rpx;
		text {
			color: red;
			padding-left: 10rpx;
		}
	}
	input {
		padding-left: 20rpx;
		font-size: 28rpx;
	}
}
.btn {
	width: 377rpx;
	height: 90rpx;
	background: #df0023;
	border-radius: 45rpx;
	font-size: 35rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #ffffff;
	text-align: center;
	line-height: 90rpx;
	margin: 60rpx auto;
}
</style>
