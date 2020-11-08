<template>
	<view class="conent">
		<view class="title">
			美圆多集团服务学习园地
		</view>
		<view class="small_title">
			美圆多集团服务学习园地
		</view>
		<view class="borders">
			
		</view>
		<view class="product_title">
			服务详解
		</view>
		<view class="texts" style="padding-top: 30rpx;">
			视觉引导有很多种方式，色彩引导、动效引导、操作引导、视觉心理等等，下面分享一个我工作中的案例，通过案例讲解设计过程中的一种思路
		</view>
		<view class="texts" style="padding-top: 50rpx;">
			案例分析
		</view>
		<view class="texts" style="padding-bottom: 30rpx;">
			案例页面，用人机对话形式，做问答测评的H5页面！ 上图为优化前的问答测评，套用了对话式 UI（Conversation UI，简称 CUI）的形式，区别了传统的问答测评模式，先分析一下这种创新的优点
		</view>
		<view class="" style="width: 100%;height: 19rpx;background-color: #F5F8FA;">
			
		</view>
		<address-router @conmit= 'conmit'></address-router>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					datas:{}
				}
			},
			onLoad() {
	
			},
			methods: {
				conmit(data){
					this.$request('applet.php?map=applet_create_form_trade&type=2&name='+data.name+'&mobile='+data.phone+'&c_name='+data.c_name+'&pro='+data.pro+'&city='+data.city+'&pro_name='+data.pro_name+'&area='+data.area+'&city_name='+data.city_name+'&area_name='+data.area_name,{},res=>{
						uni.showToast({
							icon:'none',
							title:res.em
						})
						setTimeout(function(){
							uni.switchTab({
								url:'/pages/index/index'
							})
						},800)
						
						
					})
					
				}
			}
		}
</script>

<style scoped lang="scss">
	.title{
		font-size: 38rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #353535;
		text-align: center;
		padding-top: 40rpx;
	}
	.small_title{
		font-size: 29rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #353535;
		text-align: center;
	}
	.borders{
		margin: 0 auto;
		width: 135rpx;
		height: 5rpx;
		background: #DCDCDC;
	}
	.product_title{
		margin-top: 50rpx;
		line-height: 47rpx;
		font-size: 33rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #232323;
		margin-left: 30rpx;
		padding-left: 10rpx;
		border-left: 6rpx solid #DF0023;
		border-radius: 4rpx;
	}
	.texts{
		padding:  0 40rpx;
		font-size: 25rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #353535;
	}
</style>
