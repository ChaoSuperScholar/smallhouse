<template>
	<view class="conent">
		<view class="goods">
			<view class="left">
				<image :src="List.cover" mode=""></image>
			</view>
			<view class="right">
				<view class="bianhao">
					<text>{{List.name}}</text>
					<text class="money">￥{{List.price}}</text>
				</view>
				<view class="miaoshu">
					<text>{{List.brief}}</text>
					<!-- <text class="money">￥223</text> -->
				</view>
				<!-- <view class="nums">
					×{{List.number}}
				</view> -->
			</view>
		</view>
		<view class="box">
			<view class="name input">
				预约人：<input type="text" maxlength="20" v-model="name" placeholder="请输入预约人" />
			</view>
			<view class="name input">
				联系电话：<input type="number" maxlength="20" v-model="mobile" placeholder="请输入预约电话" />
			</view>
			<view class="input">
				<view class="name">
					留言备注：
				</view>
				<textarea type="text" v-model="note" placeholder="这里可以留言哦" placeholder-class="plos" />
				</view>
		</view>
		<view class="total_money">
			<!-- 共{{List.length}}件商品 -->
			小计：<text>￥{{List.price_fee}} </text>
		</view>
		<view class="items" style="padding-top: 50rpx;">
			<text>购买天数</text>
			<text>{{List.time_num}}{{List.time_type}}</text>
		</view>
		<view class="items">
			<text>商品总额</text>
			<text>￥{{List.price_fee}}</text>
		</view>
		<view class="items_tatal">
			<text>应付合计：</text>
			<text style="color: #E62129;">￥{{List.price_fee}}</text>
		</view>
		<view class="bottoms">
			<view class="tatols">
				应付金额：<text>￥{{List.price_fee}}</text>
			</view>
			<view class="btn" @click="submit">
				确认订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					List:{},
					type:'',
					tid:'',
					name:'',
					mobile: '',
					note:''
				}
			},
			components:{
			},
			onLoad(e) {
				var _this = this
				if(e.type){
					this.type = e.type
				}
				if(e.id){
					this.tid = e.id
				}
				uni.getStorage({
					key:'orderDe',
					success(res){
						console.log(res.data)
						_this.List = res.data;
					}
				})
			},
			methods: {
				submit(){
					var re = /^1\d{10}$/
					if(this.name==''||this.mobile==''||!re.test(this.mobile)){
						uni.showToast({
							title:'请填写姓名和手机号！',
							icon:'none'
						})
						return 
					}
					this.$request(`applet.php?map=applet_confirm_service_trade&tid=${this.tid}&m_name=${this.name}&m_mobile=${this.mobile}&note=${this.note}`,{},res=>{			
						this.$pub.pay(this.tid)
					})
				}
			}
		}
</script>

<style scoped lang="scss">
	.goods{
		width: 700rpx;
		margin: 0 auto;
		padding: 50rpx 0 25rpx;
		display: flex;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		image{
			width: 200rpx;
			height: 140rpx;
			margin-right: 16rpx;
		}
		.right{
			flex: 1;
			.bianhao{
				padding-right: 10rpx;
				display: flex;
				justify-content: space-between;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					color: #333333;
				}
				.money{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 200;
					color: #333333;
				}
			}
			.miaoshu{
				padding-right: 10rpx;
				padding-top: 10rpx;
				display: flex;
				justify-content: space-between;
				text{
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					color: #333333;
				}
				.money{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 200;
					text-decoration: line-through;
					color: #333333;
				}
			}
			.nums{
				text-align: right;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 200;
				color: #333333;
				opacity: 0.6;
			}
		}
		
	}
	.box{
		padding: 0 25rpx;
		.name{
			padding-top: 10rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
		}
		.input{
			display: flex;
			textarea{
				width: 500rpx;
				height: 120rpx;
				padding-top: 15rpx;
			}
			input{
				font-size: 26rpx;
			}
		}
	}
		
	.plos{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;		
	}
	.total_money{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		width: 750rpx;
		height: 84rpx;
		line-height: 84rpx;
		text-align: right;
		background: #F5F5F5;
		padding-right: 30rpx;
		text{
			color: #FF0000;
		}
	}
	.items{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 25rpx;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
	}
	.items_tatal{
		margin-top: 60rpx;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 25rpx;
		text{
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
	}
	.bottoms{
		position: fixed;
		width: 100%;
		height: 96rpx;
		background:#F7F7F7;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.tatols{
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
			text{
				color: #FF0000;
			}
			padding-right: 30rpx;
		}
		.btn{
			width: 240rpx;
			height: 96rpx;
			background: #DF0023;
			text-align: center;
			line-height: 96rpx;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
</style>
