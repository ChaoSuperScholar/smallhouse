<template>
	<view class="conent">
		<view class="list">
			<view class="items" v-for="(item,index) in list" :key='index' @click="godetails(item.id)">
				<view class="left">
					<image :src="item.cover"></image>
				</view>
				<view class="right">
					<view class="title">
						{{item.title}}
					</view>
					<view class="product">
						{{item.brief}}
					</view>
					<view class="time">
						<text>{{item.time}}</text>
						<text>{{item.showNum}}人阅读</text>
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
				page: 1,
				list:[]
			}
		},
		components: {},
		onLoad() {
			this.getMsg();
		},
		onReachBottom() {
			this.getMsg();
		},
		methods: {
			getMsg() {
				this.$request('applet.php?map=applet_information_list&suid=gaus0xcyuh&page=0', {
					page: this.page
				}, res => {
					if(res.ec == 200){
						let data = res.data.list;
						if(data.length > 0){
							this.page++
							this.list = this.list.concat(data);
						}else if(data.length == 0 && this.page != 1){
							uni.showToast({
								icon:'none',
								title:'暂无更多数据'
							})
						}
					}
				})
			},
			godetails(id) {
				uni.navigateTo({
					url: './ArticleDetails?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		width: 100%;
		overflow: hidden;
	}

	.items {
		width: 690rpx;
		height: 187rpx;
		border-bottom: 1px solid #E6E6E6;
		margin: 60rpx auto;
		padding: 0 0 20rpx 0;
		display: flex;
		align-items: center;

		.left {
			image {
				width: 231rpx;
				height: 167rpx;
				border-radius: 13rpx;
			}
		}

		.right {
			display: flex;
			flex-flow: column;
			justify-content: space-between;
			padding-left: 20rpx;
			.title {
				font-size: 35rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #232323;
			}

			.product {
				margin-top: 10rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #666666;
				display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
				-webkit-line-clamp: 3; // 限制在一个块元素显示的文本的行数
				-webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式， 超出之后显示...
				overflow: hidden; // 超出隐藏
				line-height: 30rpx;
				height: 88rpx;
			}

			.time {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #666666;
			}
		}

	}
</style>
