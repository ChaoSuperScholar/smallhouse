<template>
	<view class="content" v-if="indexData">
		<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in indexData.slide" :key="index"><image :src="item.img"></image></swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="flex indexMenus">
			<view class="flexCenter" v-for="(item, index) in indexMenus" :key="index" @click="goLi(index)" >
				<image :src="`/static/image/index${index+1}.png`" mode=""></image>
				<text>{{item}}</text>
			</view>
		</view>
		<view class="lines"></view>
		<view class="two_block" id="id1">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					企业开办
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.qykb" :key='index' :src="item.logo" mode="" @click="qykb(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="three_block" id="id2">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					高企申报
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.gqsb" :key='index' :src="item.logo" mode="" @click="goArticle(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="scroll_block" id="id3">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					园区招商
				</view>
			</view>
			<scroll-view class="indexScroll" scroll-x>
				<view class="flexCenter"  v-for="(item,index) in indexData.park" :key='index' @click='gopark(item.id)'>
					<image :src="item.logo" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="lines"></view>
		<view class="four_block" id="id4">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					挂牌上市
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.gpss" :key='index' :src="item.logo" mode="" @click="goArticle(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="one_block" id="id5">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					税筹
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.sc" :key='index' :src="item.logo" mode="" @click="goArticle(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="three_block" id="id6">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					政策申报
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.zcsb" :key='index' :src="item.logo" mode="" @click="goArticle(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="two_block" id="id7">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					知识产权
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.zscq" :key='index' :src="item.logo" mode="" @click="qykb(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="three_block" id="id8">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					人力资源
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.rlzy" :key='index' :src="item.logo" mode="" @click="goArticle(item.id)"></image>
			</view>
		</view>
		<view class="lines"></view>
		<view class="three_block" id="id9" v-if="indexData.is_show">
			<view class="first_title">
				<view class="lines">
				</view>
				<view class="name">
					融资服务
				</view>
			</view>
			<view class="list" >
				<image v-for="(item,index) in indexData.rzfw" :key='index' :src="item.logo" mode="" @click="goArticle(item.id)"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			indexMenus: ['企业开办','高企申报','园区招商','挂牌上市','税务筹划','政策申报','知识产权','人力资源'],
			indexData: null
		};
	},
	onPullDownRefresh() {
		this.$request('applet.php?map=applet_zf_index&suid=gaus0xcyuh', {}, res => {
			this.indexData = res.data;
		});
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onLoad() {
		this.$request('applet.php?map=applet_zf_index&suid=gaus0xcyuh&baseCode=102', {}, res => {
			this.indexData = res.data;
			if(this.indexData.is_show){
				this.indexMenus.push('融资服务') ;
			}
		});
		let that = this;
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				uni.setStorageSync('code', loginRes.code);
				// 获取用户信息
				that.login(loginRes.code);
			}
		});
	},
	methods: {
		doDetail(n, d) {
			if (this.servic === 'information') {
				this.goTaxa(d);
				return;
			}
			this.goDetail(2, d);
		},
		goTaxa(d) {
			uni.navigateTo({
				url: '../Taxation/Taxation?id=' + d
			});
		},
		goDetail(i, d) {
			uni.navigateTo({
				url: `../detail/detail?typ=${i}&id=${d}`
			});
		},
		login(code) {
			this.$request('applet.php?map=applet_member_info&suid=gaus0xcyuh&code=' + code, {}, res => {
				uni.setStorageSync('plum_session_applet', res.data.plum_session_applet);
				uni.setStorageSync('slient', res.data.slient);
			});
		},
		//园区
		gopark(id){
			uni.navigateTo({
				url: `../park/park?id=${id}`
			});
		},
		// 企业开办
		qykb(id){
			uni.navigateTo({
				url: `../detail/detail?typ=2&id=${id}`
			});
		},
		goLi(i) {
			uni.createSelectorQuery().select(`#id${i+1}`).boundingClientRect(function(res){
								console.log("标签获取====>",typeof(res.top))
								uni.pageScrollTo({
								    scrollTop:res.top,
								    duration: 300
								});
							}).exec()
			
			// let url = this.list[i];
			// if (i == 3) {
			// 	uni.navigateToMiniProgram({
			// 		appId: 'wx725f1e1923e4cb33',
			// 		path: 'pages/index/index',
			// 		success: res => {
			// 			// 打开成功
			// 			console.log('打开成功', res);
			// 		},
			// 		fail: err => {
			// 			console.log(err);
			// 		}
			// 	});
			// } else {
			// 	if (url === '../park/park') {
			// 		uni.switchTab({
			// 			url
			// 		});
			// 		return;
			// 	}
			// 	uni.navigateTo({
			// 		url
			// 	});
			// }
		},
		go(url) {
			uni.navigateTo({
				url
			});
		},
		goArticle(id) {
			uni.navigateTo({
				url: '../Taxation/Taxation?id=' + id
			});
		}
	}
};
</script>

<style lang="less">
.lines {
	width: 750rpx;
	height: 8rpx;
	background: #ededed;
}
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
	.indexScroll {
		width: 100%;
		display: flex;
		white-space: nowrap;
		.flexCenter {
			display: inline-block;
			width: 218rpx;
			border-radius: 5rpx;
			margin-left: 20rpx;
			margin-bottom: 20rpx;
			position: relative;
			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 218rpx;
				height: 159rpx;
				border-radius: 5rpx;
			}
			.name{
				background-color: rgba(0,0,0,0.5);
				text-align: center;
				line-height: 159rpx;
				font-size: 35rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				z-index: 10;
				position: relative;
			}
		}
	}	
	.four_block{
		width: 100%;
		.list{
			display: flex;
			flex-flow: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding:  0 30rpx;
			image{
				padding-bottom: 25rpx;
				height: 74rpx;
				width: 160rpx;
			}
		}
	}
	.three_block{
		width: 100%;
		.list{
			display: flex;
			flex-flow: row;
			flex-wrap: wrap;
			justify-content: space-between;
			justify-content: ;
			padding:  0 30rpx;
			padding-top: 20rpx;
			image{
				padding-bottom: 25rpx;
				height: 113rpx;
				width: 210rpx;
			}
		}
	}
	.two_block{
		width: 100%;
		.list{
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			flex-wrap: wrap;
			padding:  0 55rpx;
			image{
				padding-bottom: 25rpx;
				height: 112rpx;
				width: 306rpx;
			}
		}
	}
	.one_block{
		width: 100%;
		.list{
			display: flex;
			flex-flow: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 30rpx 30rpx 0;
			image{
				height: 113rpx;
				width: 282rpx;
				padding-bottom: 25rpx;
			}
		}
	}
.content {
	background: #FFFFFF;
	.indexMenus {
		display: flex;
		justify-content: space-around;
		width: 100vw;
		padding-bottom: 20rpx;
		background: white;
		flex-wrap: wrap;
		.flexCenter {
			width: 33%;
			margin: 20rpx 0 0;
			align-items: center;
			flex-direction: column;
			font-size: 25rpx;
			color: #232323;
			image {
				width: 110rpx;
				height: 110rpx;
				padding-bottom: 25rpx;
			}
		}
	}

	.swiper {
		width: 750rpx;
		height: 400rpx;
	}
}
</style>
