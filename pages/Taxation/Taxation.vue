<template>
	<view class="Taxa">
		<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in conent.slide" :key='index'>
				<image class="img" :src="item.image"></image>
			</swiper-item>
		</swiper>
		<text class="TaxaTitle">{{conent.name}}</text>
		<text class="TaxaTitle2">{{conent.brief}}</text>
		<view class="Hzhu"></view>
		<address-router @conmit= 'conmit'></address-router>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				conent:{}
			};
		},
		onLoad(e) {
			this.id = e.id;
			this.getMsg();
		},
		methods:{
			getMsg() {
				this.$request('applet.php?map=applet_zf_service_detail&suid=gaus0xcyuh&id='+this.id, {
				}, res => {
					if(res.ec == 200){
						this.conent = res.data
					}
				})
			},
			conmit(data){
				this.$request('applet.php?map=applet_create_form_trade&type=1&name='+data.name+'&mobile='+data.phone+'&c_name='+data.c_name+'&pro='+data.pro+'&city='+data.city+'&pro_name='+data.pro_name+'&area='+data.area+'&city_name='+data.city_name+'&area_name='+data.area_name+'&gid='+this.id,{},res=>{
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

<style lang="less">
	.swiper {
		width: 690rpx;
		height: 300rpx;
		margin: 0 auto;
		margin-top: 24rpx;
		background: #FFF8C8;
		.img{
			width: 690rpx;
			height: 300rpx;
			border-radius: 15rpx;
		}
	}
	.Taxa {
		display: flex;
		flex-direction: column;
		align-items: center;

		.btn {
			width: 377rpx;
			height: 90rpx;
			background: #DF0024;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;

		}

		.Hzhu {
			width: 750rpx;
			height: 19rpx;
			background: #F5F8FA;
		}

		.TaxaTitle {
			width: 690rpx;
			font-size: 38rpx;
			color: #242424;
			margin-top: 40rpx;
		}

		.TaxaTitle2 {
			width: 690rpx;
			font-size: 30rpx;
			line-height: 42rpx;
			margin: 50rpx 0;
			color: #242424;
		}


	}
</style>
