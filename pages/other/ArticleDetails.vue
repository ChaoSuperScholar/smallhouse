<template>
	<view class="conent">
		<view class="title">
			{{conent.title}}
		</view>
		<rich-text :nodes="conent.content"></rich-text>
		<address-router @conmit= 'conmit'></address-router>
		
	</view>
</template>

<script>
	export default {
			data() {
				return {
					id:'',
					conent:{}
				}
			},
			onLoad(e) {
				this.id = e.id;
				this.getMsg()
			},
			methods: {
				getMsg() {
					this.$request('applet.php?map=applet_information_details&suid=gaus0xcyuh&id='+this.id, {
					}, res => {
						if(res.ec == 200){
							this.conent = res.data
						}
					})
				},
				conmit(data){
					this.datas = data;
					this.datas.type=4;
					this.datas.gid=this.id;
					this.$request('applet.php?map=applet_create_form_trade&type=4&name='+data.name+'&mobile='+data.phone+'&c_name='+data.c_name+'&pro='+data.pro+'&city='+data.city+'&pro_name='+data.pro_name+'&area='+data.area+'&city_name='+data.city_name+'&area_name='+data.area_name+'&gid='+this.id,{},res=>{
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
	.conent{
		min-height: 100vh;
		height: auto;
		overflow: auto;
	}
	.title{
		font-size: 36rpx;
		text-align: center;
		padding: 10rpx;
	}
</style>
