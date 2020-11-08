<template>
	<view class="huiBac" @click="close">
		<view class="whiteBac flex">
			<text class="alertTitle">您正在预约{{detail}}</text>
			<view class="Hzhu">
				<view>

				</view>
			</view>
			<text class="alertTitle2">预约项目：</text>
			<view class="alertMenus flex" @click.stop=''>
				<view class="flexCenter" v-for="(item,index) in List" :key='index' :class="{hov: format_id===item.id}" @click.stop="formatChange(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="flexCenter alertBtn" @click="goPay">
				确认预约
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['List','format_id','detail'],
		data() {
			return {

			};
		},
		methods:{
			formatChange(e){
				this.$emit('formatChange',e)
			},
			goPay(){
				this.$emit('gopay')
			},
			close(){
				this.$emit('idxChange',0)
			}
		}
	}
</script>

<style lang="less">
	.huiBac {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		display: flex;
		flex-direction: column;
		align-items: center;

		.whiteBac {
			width: 750rpx;
			background: #FFFFFF;
			padding-top: 30rpx;
			border-radius: 14rpx;
			margin-top: auto;
			flex-direction: column;

			.alertBtn {
				width: 100%;
				height: 111rpx;
				background: #DF0024;
				font-size: 36rpx;
				color: #FFFFFF;
				margin-top: 20rpx;
			}

			.alertMenus {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				font-size: 25rpx;
				color: #242424;

				.flexCenter {
					margin: 20rpx;
					width: 180rpx;
					height: 48rpx;
					background: rgba(223, 223, 223, .5);
				}
				.hov{
					background: rgba(223, 0, 36, .13);
					color: rgba(223, 0, 36, 1);
				}
			}

			.alertTitle2 {
				height: 28rpx;
				font-size: 30rpx;
				color: #1B1B1B;
				width: 693rpx;
				border-bottom: 1px solid rgba(0, 0, 0, .05);
				padding: 20rpx;
			}

			.Hzhu {
				width: 249rpx;
				height: 8rpx;
				background: rgba(255, 114, 37, .5);
				position: relative;
				margin-top: 33rpx;
			}

			.Hzhu view {
				width: 105rpx;
				height: 8rpx;
				background: #FF7225;
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				top: 0;
				z-index: 99;
			}

			.alertTitle {
				font-size: 30rpx;
				color: #030303;
				text-align: center;
			}
		}
	}
</style>
