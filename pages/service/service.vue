<template>
	<view class="content" v-if="serData">
		<view class="indexElse flex">
			<image class="indexElseBanner" :src="serData.top_image" mode=""></image>
			<view class="flex indexElseCheck">
				<view class="flexCenter" :class="{hov:servic == 'goods'}" @click="servic = 'goods'">
					企业服务商品
				</view>
				<view class="flexCenter" :class="{hov:servic == 'information'}" @click="servic = 'information'">
					企业服务文章
				</view>
			</view>
			<view class="flex indexElsemenu">
				<view class="flexCenter" v-for="(item,index) in serData[servic]" :key='index' @click="doDetail(item.name,item.id)">
					<image :src='item.logo' mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['企业服务商品', '企业服务文章'],
				serData: null,
				servic: 'goods'
			}
		},
		onLoad() {
			this.$request('applet.php?map=applet_zf_service_list&suid=gaus0xcyuh', {}, res => {
				this.serData = res.data;
			})
		},
		methods: {
			doDetail(n,d) {
				if (this.servic === 'information') {
					this.goTaxa(d)
					return
				}
				this.goDetail(2,d)
			},
			goTaxa(d) {
				uni.navigateTo({
					url: `../Taxation/Taxation?id=${d}`
				})
			},
			goDetail(i,d) {
				uni.navigateTo({
					url: `../detail/detail?typ=2&id=${d}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.indexElse {
		padding: 30rpx;
		background: white;
		flex-direction: column;
		margin-bottom: 28rpx;

		.indexElseCheck {
			width: 690rpx;
			height: 65rpx;
			border: 1px solid #EEEEEE;

			view {
				flex: 1;
				font-size: 29rpx;
				color: #6A6A6A;
				height: 100%;
			}

			.hov {
				background: #E62129;
				color: white;
			}
		}

		.indexElseBanner {
			width: 690rpx;
			height: 158rpx;
			margin-bottom: 25rpx;
		}

		.indexElsemenu {
			width: 610rpx;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 35rpx;

			.flexCenter {
				width: 253rpx;
				height: 128rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 13rpx 0px rgba(138, 138, 138, 0.3);
				border-radius: 15rpx;
				font-size: 29rpx;
				color: #232323;
				margin-bottom: 60rpx;

				image {
					width: 54rpx;
					height: 54rpx;
					margin-right: 22rpx;
				}
			}
		}
	}
</style>
