<template>
	<view class="content">
		<view class="tab">
			<view class="item_tab" v-for="(item,index) in tab" :key='index' >
				<view :class="tab_index == item.value ? 'active' : ''" @click=" top_tab(item.value)">
					{{item.name}}
				</view>
				<view v-show="tab_index == item.value" class="border"></view>
			</view>
		</view>
		<view class="" style="height: 100rpx; width: 100%;">
			
		</view>
		<view class="good—list" v-if="list.length>0">
			<view class="good_item"  v-for="(item,index) in list" :key= 'index'>
				<view class="content_item">
					<view class="title_item">
						<view class="name">
							<view class="left ">
								{{item.name}}
							</view>
							<view class="type">
								{{item.status_desc}}
							</view>
						</view>
						<view class="name">
							<!-- 预约时间：{{item.start_time}}至{{item.end_time}} -->
							预约时间：{{item.start_time}}
						</view>
					</view>
					<view class="goods">
						<image :src="item.cover" mode=""></image>
						<view class="right">
							<view class="produt ">
								{{item.brief}}
							</view>
							<view class="time">
								{{item.end_time}}到期
							</view>
							<view class="money">
								合计：￥{{item.price_fee}}元
							</view>
						</view>
					</view>
					<view class="btns_goods">
						<view class="btn" v-if="item.status_desc != '待支付'" @click="godetail(item.tid)">
							查看订单
						</view>
						<view class="btn" v-if="item.status_desc == '租聘中'" @click="xuzu(item.status,item.tid,item.end_time)">
							续租
						</view>
						<view class="btn" v-if="item.status_desc == '待支付'" @click="$pub.pay(item.tid)">
							去支付
						</view>
					</view>
				</view>
			</view>
		</view>
		<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='types' :datestring='dateString' @change='dateTimeChange' endYear='2100' :startYear='endtime' ></date-time-picker>
	</view>
</template>

<script>
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue'
	export default {
		
		data() {
			return {
				tab:[{
					name:'全部',
					value:0
				},{
					name:'租赁中',
					value:2
				},{
					name:'已完成',
					value:3
				},{
					name:'续租',
					value:4
				}],
				tab_index:0,
				page:0,
				type:0,
				list:[],
				types: 'date',
				tid:'',
				endtime:'',
				dateString:''
			}
		},
		onLoad(e) {	
			this.plum_session_applet = uni.getStorageSync('plum_session_applet');
			if(e.status != 0){
				this.tab_index = e.status;
			}else{
				this.tab_index = 0
			}
			if(e.type == 0){
				this.type = 0;
			}else if(e.type){
				this.type = e.type
			}
		},
		components:{
			DateTimePicker	
		},
		 computed: {
		 	indicatorStyle() {
		 		return {
		 			background: 'rgba(255,0,0,.2)',
		 			height: '40px',
		 		};
		 	}
		 },
		onShow(e) {
			if(uni.getStorageSync('slient') == 1){
				uni.reLaunch({
					url:'/pages/login/login?type=2'
				})
				return
			}
			this.page=0,
			this.list=[],
			this.getMsg();
		},
		onReachBottom() {
			this.getMsg();
		},
		methods: {
			top_tab(e){
				uni.setStorageSync('status',e)
				this.tab_index = e;
				this.page = 0;
				this.list = [];
				this.getMsg();
			},
			xuzu(e,tid,time){
				if(time.length >  4){
					this.types = 'date'
				}else{
					this.types = 'year'
				}
				this.$refs['date-time'].show();
				this.tid = tid;
				this.endtime = time;
				this.dateString = time;
				
			},
			dateTimeChange(value) {
				console.log(value)
				this.$request(
					`/applet.php?map=applet_service_trade_relet&end_time=${value}&tid=${this.tid}`, {}, res => {
						if(res.ec == 200){
							uni.requestPayment({
								provider: "wxpay",
								appId: res.data.appId,
								package: res.data.package,
								nonceStr: res.data.nonceStr,
								paySign: res.data.paySign,
								signType: res.data.signType,
								timeStamp: res.data.timeStamp,
								success: function(res) {
									uni.switchTab({
										url:'/pages/appointment/appointment'
									})
								},
								fail: (err) => {
									uni.showToast({
										icon: 'none',
										title: '微信支付 失败'
									})
								}
							})
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.message
							})
						}
					})
			},
			// 获取数据
			getMsg(){
				this.$request('applet.php?map=applet_service_trade_list&plum_session_applet='+this.plum_session_applet+'&page='+this.page+'&status='+this.tab_index+'&type='+this.type,{
				}, res => {
					if (res.ec == 200) {
						let data = res.data.list;
						if (data.length > 0) {
							this.page++
							this.list = this.list.concat(data);
						} else if (data.length == 0 && this.page != 1) {
							uni.showToast({
								icon: 'none',
								title: '暂无更多数据'
							})
						}
					}
				})
			},
			godetail(id){
				uni.navigateTo({
					url:'/pages/other/order_detail?tid='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		width: 100%;
		min-height: 100vh;
		height: auto;
		background-color: #F5F5F5;
	}
	.tab{
		position: fixed;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		.item_tab{
			display: flex;
			justify-content: center;
			font-size: 29rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			position: relative;
			.border{
				position: absolute;
				width: 60rpx;
				height: 5rpx;
				background: #DF0023;
				border-radius: 2rpx;
				bottom: -10rpx;
			}
		}
		.active{
			color: #DF0023;
		}
	}
	
	.good_item{
		width: 100%;
		height: 504rpx;
		background-color: #FFFFFF;
		margin-bottom: 18rpx;
		overflow: hidden;
		.content_item{
			margin: 30rpx 16rpx;
			width: 716rpx;
			height: 444rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 5rpx 0px rgba(59, 59, 59, 0.38);
			border-radius: 10rpx;
			.title_item{
				height: 100rpx;
				width: 100%;
				border-bottom: 1px solid #F5F5F5;
				display: flex;
				flex-flow: column;
				justify-content: center;
				.name{
					padding-left: 40rpx;
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #232323;
					.type{
						padding-right: 15rpx;
						font-size: 29rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #DF0023;
					}
				}
			}
			.goods{
				padding: 40rpx 15rpx 0 40rpx;
				display: flex;
				image{
					width: 225rpx;
					height: 220rpx;
				}
				.right{
					flex: 1;
					padding-left: 17rpx;
					.produt{
						height: 120rpx;
						font-size: 25rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #2C2C2C;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow-wrap: break-word;
						overflow: hidden;
						line-height: 40rpx;
					}
					.time{
						font-size: 27rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #232323;
					}
					.money{
						text-align: right;
						font-size: 29rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #232323;
					}
				}
			}
			.btns_goods{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				height: 78rpx;
				padding-right:15rpx;
				.btn{
					width: 147rpx;
					height: 61rpx;
					background: #DF0023;
					border-radius: 12rpx;
					text-align: center;
					line-height: 61rpx;
					font-size: 31rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
