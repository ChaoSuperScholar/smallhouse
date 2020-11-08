<template>
	<view class="content" v-if="indexData">
		<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in indexData.slide" :key='index'>
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<view class="flex indexMenus">
			<view class="flexCenter" v-for="(item,index) in indexData.nav" :key='index' @click="goLi(item.link_type)">
				<image :src="item.logo" mode=""></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<block v-for="(item,index) in indexData.notice" :key='index'>
			<view class="flex message" v-show="index==noticeIdx">
				<view class="flexCenter">
					<image src="/static/image/msg.png" mode=""></image>
					平台通知
				</view>
				<view class="yichu1">
					{{item.content}}
				</view>
			</view>
		</block>
		<view class="whiteBac video">
			<video controls :poster="indexData.video_image" :src="indexData.video"></video>
		</view>
		<view class="storeList whiteBac">
			<view class="flex storeTop">
				<text>
					文章发布
				</text>
				<view @click="go('../other/release')">
					更多>>
				</view>
			</view>
			<view class="indexScroll" scroll-x>
				<view class="flexCenter" @click="goArticle(item.id)" v-for="(item,index) in indexData.information" :key='index'>
					<image :src="item.cover" mode=""></image>
					<view class="yichu1">{{item.title}} </view>
					<view class="yichu4">{{item.brief}}</view>
					<view class="flex">
						<text>{{item.create_time}}</text>
						<text>{{item.show_num}}人阅读</text>
					</view>
				</view>
			</view>
		</view>
		<view class="indexElse flex">
			<image class="indexElseBanner" :src="indexData.service.top_image" mode=""></image>
			<view class="flex indexElseCheck">
				<view class="flexCenter" :class="{hov:servic == 'goods'}" @click="servic = 'goods'">
					企业服务商品
				</view>
				<view class="flexCenter" :class="{hov:servic == 'information'}" @click="servic = 'information'">
					企业服务文章
				</view>
			</view>
			<view class="flex indexElsemenu">
				<view class="flexCenter" v-for="(item,index) in indexData.service[servic]" :key='index' @click="doDetail(item.name,item.id)">
					<image :src='item.logo' mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="callme flex">
			<view class="flex storeTop">
				<text>
					联系我们
				</text>
			</view>
			<text class="callmeName">—{{indexData.company.c_name}}—</text>
			<view class="flex callmeInfo">
				<image :src="indexData.company.image" mode=""></image>
				<text class="yichu5">{{indexData.company.brief}}</text>
			</view>
			<view class="flex callmePhone">
				<image src="../../static/image/indexCall.png" mode=""></image>
				联系电话：{{indexData.company.mobile}}
			</view>
			<view class="flex callmePhone">
				<image src="../../static/image/indexAddress.png" mode=""></image>
				公司地址：{{indexData.company.address}}
			</view>
		</view>
		<view style="height: 100rpx;">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				indexMenus: ['企业服务', '园区服务', '学习园地', '关于我们'],
				indexElse: ['高企认证', '税筹', '企业改制', 'OTC挂牌'],
				list: ['', '../service/service', '../park/park', '../other/study', '../aboutUs/aboutUs'],
				indexData: null,
				noticeIdx: 0,
				timer: null,
				servic: 'goods'
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null
		},
		onPullDownRefresh() {
			clearInterval(this.timer);
			this.$request('applet.php?map=applet_zf_index&suid=gaus0xcyuh', {}, res => {
				this.indexData = res.data;
				this.timer = setInterval(() => {
					if (this.noticeIdx == this.indexData.notice.length - 1) {
						this.noticeIdx = 0
						return
					}
					this.noticeIdx++
				}, 2000)
			})
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			clearInterval(this.timer);
			this.$request('applet.php?map=applet_zf_index&suid=gaus0xcyuh', {}, res => {
				this.indexData = res.data;
				this.timer = setInterval(() => {
					if (this.noticeIdx == this.indexData.notice.length - 1) {
						this.noticeIdx = 0
						return
					}
					this.noticeIdx++
				}, 2000)
			})
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					uni.setStorageSync('code', loginRes.code)
					// 获取用户信息
					that.login(loginRes.code);
				}
			});
			// uni.reLaunch({
			// 	url: '/pages/login/login'
			// });
		},
		methods: {
			doDetail(n, d) {
				if (this.servic === 'information') {
					this.goTaxa(d)
					return
				}
				this.goDetail(2, d)
			},
			goTaxa(d) {
				uni.navigateTo({
					url: '../Taxation/Taxation?id=' + d
				})
			},
			goDetail(i, d) {
				uni.navigateTo({
					url: `../detail/detail?typ=${i}&id=${d}`
				})
			},
			login(code) {
				this.$request('applet.php?map=applet_member_info&suid=gaus0xcyuh&code=' + code, {}, res => {
					uni.setStorageSync('plum_session_applet', res.data.plum_session_applet)
					uni.setStorageSync('slient', res.data.slient)
				})
			},
			goLi(i) {
				let url = this.list[i];
				if (i == 3) {
					uni.navigateToMiniProgram({
						appId: 'wx725f1e1923e4cb33',
						path: 'pages/index/index',
						success: res => {
							// 打开成功
							console.log("打开成功", res);
						},
						fail: err => {
							console.log(err);
						},
					});
				}else{
					if (url === '../park/park') {
						uni.switchTab({
							url
						})
						return
					}
					uni.navigateTo({
						url
					})
				}
				
			},
			go(url) {
				uni.navigateTo({
					url
				})
			},
			goArticle(id) {
				uni.navigateTo({
					url: '/pages/other/ArticleDetails?id=' + id
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
		justify-content: center;
		background: #EEEEEE;

		.callmePhone {
			width: 100%;
			font-size: 27rpx;
			color: #232323;
			margin-top: 25rpx;

			image {
				width: 41rpx;
				height: 41rpx;
				margin-right: 15rpx;
			}
		}

		.callme {
			padding: 30rpx;
			background: white;
			flex-direction: column;
			width: 750rpx;

			.callmeInfo {
				width: 100%;
				justify-content: space-between;

				image {
					width: 337rpx;
					height: 238rpx;
				}

				text {
					width: 316rpx;
					font-size: 25rpx;
					color: #666666;
					line-height: 29rpx;

					text {
						font-size: 28rpx;
					}
				}
			}

			.callmeName {
				font-size: 29rpx;
				color: #232323;
				display: block;
				margin-bottom: 37rpx;
			}
		}

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

		.storeList {
			padding: 30rpx;
			width: 100%;
			margin-bottom: 30rpx;

			.indexScroll {
				display: flex;
				overflow-x: scroll;

				.flexCenter {
					width: 275rpx;
					background: #FFFFFF;
					box-shadow: 0px 0px 20rpx 0px rgba(11, 9, 11, 0.13);
					border-radius: 13rpx;
					margin-right: 27rpx;
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

					.flex {
						width: 240rpx;
						flex-direction: column;
						align-items: flex-start;
						margin-bottom: 10rpx;

						text {
							font-size: 18rpx;
							color: #666666;
						}
					}
				}
			}

		}

		.storeTop {
			width: 100%;
			justify-content: space-between;
			margin-bottom: 23rpx;

			text {
				font-size: 33rpx;
				color: #232323;
				display: flex;
				align-items: center;
			}

			text::before {
				content: '';
				width: 8rpx;
				height: 51rpx;
				background: #E62129;
				margin-right: 8rpx;
				display: inline-block;
			}

			view {
				font-size: 21rpx;
				color: #666666;
			}
		}


		.video {
			padding: 20rpx 30rpx;
			background: white;
			width: 100%;
			height: 375rpx;
			margin-bottom: 27rpx;

			video {
				width: 100%;
				height: 100%;
			}
		}

		.message {
			padding: 24rpx 30rpx;
			width: 100vw;
			background: white;
			margin: 35rpx 0;

			.flexCenter {
				width: 219rpx;
				height: 90rpx;
				background: #FFFFFF;
				font-size: 33rpx;
				color: #232323;

				image {
					width: 49rpx;
					height: 43rpx;
					margin-right: 13rpx;
				}
			}

			.yichu1 {
				flex: 1;
				font-size: 25rpx;
				color: #6A6A6A;
			}
		}

		.indexMenus {
			display: flex;
			justify-content: space-around;
			padding: 26rpx 0;
			width: 100vw;
			background: white;

			.flexCenter {
				flex-direction: column;
				font-size: 25rpx;
				color: #232323;

				image {
					width: 94rpx;
					height: 94rpx;
					margin-bottom: 28rpx;
				}
			}
		}

		.swiper {
			width: 750rpx;
			height: 400rpx;
		}
	}
</style>
