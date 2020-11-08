<template>
	<view>
		<view class="parkheader flex" @click="idx=!idx">
			<view class="flexCenter">
				地区
				<image src="../../static/image/right.png" mode=""></image>
			</view>
			<view class="flexCenter">
				{{!yqList||yqId===null?'园区名':yqList[yqId].name}}
			</view>
		</view>
		<view class="parkheaderpicker flex">
			<view class="flexCenter" @click="change(1)">
				<image src="../../static/image/Station.png" mode=""></image>
				<text>工位</text>
			</view>
			<view class="flexCenter" @click="change(2)">
				<image src="../../static/image/office.png" mode=""></image>
				<text>办公室</text>
			</view>
			<view class="flexCenter" @click="goDetail(false)">
				<image src="../../static/image/vip.png" mode=""></image>
				<text>会员</text>
			</view>
		</view>
		<view class="parkheaderpicker2 flex">
			<view class="flexCenter" :class="{hov:type==1}" @click="change(1)">
				工位
			</view>
			<view class="flexCenter" :class="{hov:type==2}" @click="change(2)">
				办公室
			</view>
			<view class="flexCenter" @click="goDetail(false)">
				会员
			</view>
		</view>
		<view class="">
			<view class="park flex" v-for="(item,index) in List" :key='index' @click="goDetail(item.id)">
				<image :src="item.cover" mode=""></image>
				<view class="flex">
					<view>
						{{item.name}}
					</view>
					<view>
						会员权益：{{item.brief}}
					</view>
					<view>
						￥{{item.price}}元/天
					</view>
				</view>
			</view>
		</view>
		<view class="fixed" @click="idx=!idx" v-show="idx">
			<view class="whitebac">
				<view class="parkheader flex">
					<view class="flexCenter">
						地区
						<image src="../../static/image/right.png" mode=""></image>
					</view>
					<view class="flexCenter">
						园区名
					</view>
				</view>
				<view class="checks flex" @click.stop='eee'>
					<view class="check1">
						<view class="flexCenter" :class="{hov:city===index}" v-for="(item,index) in area" :key='index' @click.stop="city=index,area2=null,area_id=null,yqId= null">
							{{item.name}}
						</view>
					</view>
					<view class="check1">
						<block v-if="city!==null">
							<view class="flexCenter" :class="{hov:area2===index}" v-for="(item,index) in area[city].children" :key='index'
							 @click.stop="area2=index,area_id=null,yqId= null">
								{{item.name}}
							</view>
						</block>
					</view>
					<view class="check2">
						<block v-if="area2!==null">
							<view class="flexCenter" :class="{hov:area_id === index}" v-for="(item,index) in area[city].children[area2].children"
							 :key='index' @click.stop="getAA(index)">
								{{item.name}}
							</view>
						</block>
					</view>
					<view class="check2">
						<block v-if="yqList!==null">
							<view class="flexCenter" :class="{hov:yqId === index}" v-for="(item,index) in yqList" :key='index' @click.stop="yqClick(index)">
								{{item.name}}
							</view>
						</block>
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
				idx: false,
				area: [],
				city: null,
				area2: null,
				area_id: null,
				yqList: null,
				List: [],
				yqId: null,
				type: 1,
				page: 0
			};
		},
		onLoad() {
			var _this = this
			uni.getStorage({
				key: 'applet_get_area',
				success(res) {
					_this.area = res.data
				},
				fail() {
					_this.$request('applet.php?map=applet_get_area', {}, res => {
						_this.area = res.pro;
						uni.setStorage({
							key: 'applet_get_area',
							data: res.pro
						})
					})
				}
			})
			this.getList()
		},
		onReachBottom() {
			this.page++
		},
		methods: {
			goDetail(i) {
				if (i) {
					uni.navigateTo({
						url: `../detail/detail?typ=1&id=${i}`
					})
					return
				}
				uni.navigateTo({
					url: `../detail/detail?typ=3`
				})
			},
			change(i) {
				this.page = 0
				this.type = i;
				this.getList()
			},
			getList() {
				this.$request(
					`applet.php?map=applet_house_list&page=${this.page}&type=${this.type}&pro=${this.city===null?'':this.area[this.city].id}&city=${this.area2===null?'':this.area[this.city].children[this.area2].id}&area=${this.area_id===null?'':this.area[this.city].children[this.area2].children[this.area_id].id}&park=${this.yqId===null?'':this.yqList[this.yqId].id}`, {},
					res => {
						this.page === 0 ? this.List = res.data.list : this.List.push(...res.data.list)
					})
			},
			yqClick(i) {
				this.page = 0
				this.yqId = i;
				this.idx = false;
				this.getList()
			},
			getAA(i) {
				this.area_id = i;
				this.$request(`applet.php?map=applet_get_park&area_id=${this.area[this.city].children[this.area2].children[i].id}`, {},
					res => {
						this.yqList = res.data.list;
						this.yqId = null
					})
			},
			eee() {}
		}
	}
</script>

<style lang="less">
	.fixed {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .45);
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		padding-top: 70rpx;

		/* #endif */
		.whitebac {
			width: 100%;
			background: #FFFFFF;
			padding-top: 15rpx;

			.checks {
				height: 400rpx;
				border-top: 1px solid #EEEEEE;

				.flexCenter {
					border-bottom: 1px solid #EEEEEE;
					font-size: 30rpx;
					color: #4A4A4A;
					height: 80rpx;
				}

				.hov {
					color: #DF0024;
					background: #F8F8F8;
				}

				.check1 {
					width: 148rpx;
					height: 400rpx;
					overflow-x: scroll;
					border-right: 1px solid #EEEEEE;
				}

				.check2 {
					flex: 1;
					height: 400rpx;
					overflow-x: scroll;
					border-right: 1px solid #EEEEEE;
				}

				.check2:last-child {
					border: none;
				}
			}

			.parkheader {
				.flexCenter {
					color: #E6222A;
				}
			}
		}
	}

	.park {
		width: 690rpx;
		padding: 50rpx 0;
		height: 267rpx;
		margin: 0 auto;
		border-bottom: 1px solid #E7E7E7;

		image {
			width: 231rpx;
			height: 100%;
			border-radius: 6rpx;
			margin-right: 24rpx;
		}

		.flex {
			flex: 1;
			height: 100%;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;

			view:nth-child(1) {
				font-size: 36rpx;
				color: #161616;
			}

			view:nth-child(2) {
				font-size: 30rpx;
				color: #787878;
			}

			view:nth-child(3) {
				font-size: 23rpx;
				color: #E76048;
			}
		}
	}

	.parkheaderpicker2 {
		width: 690rpx;
		height: 65rpx;
		border: 1px solid #EEEEEE;
		margin: 30rpx auto 0;

		.flexCenter {
			width: 230rpx;
			font-size: 30rpx;
			color: #6A6A6A;
			height: 100%;
		}

		.flexCenter:nth-child(2) {
			width: 228rpx;
			border: 1px solid #EEEEEE;
			border-top: none;
			border-bottom: none;
		}

		.hov {
			color: white;
			background: #E6222A;
		}
	}

	.parkheaderpicker {
		width: 750rpx;
		height: 204rpx;
		background: #FFFFFF;
		justify-content: space-around;

		.flexCenter {
			flex-direction: column;
			width: 30%;
			font-size: 30rpx;
			color: #242424;

			image {
				width: 90rpx;
				height: 90rpx;
				margin: 15rpx;
			}
		}
	}

	.parkheader {
		width: 690rpx;
		height: 100rpx;
		border: 1px solid #E7E7E7;
		margin: 14rpx auto 30rpx;

		.flexCenter {
			width: 293rpx;

			font-size: 32rpx;
			color: #C8C8C8;

			image {
				width: 20rpx;
				height: 11rpx;
				margin-left: 41rpx;
			}
		}

		.flexCenter:nth-child(2) {
			flex: 1;
			font-size: 34rpx;
			color: #242424;
		}
	}
</style>
