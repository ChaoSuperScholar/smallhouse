<template>
	<view class="content">
		<view class="tops">
			<image class="bgs" src="../../static/image/infoBac.png" mode=""></image>	
			<view class="status_bar">
				
			</view>
			<view class="header">
				<image @click="back" src="../../static/image/goback.png" mode=""></image>
				<view class="">
					信息完善
				</view>
			</view>
			<image  @click="chooseImg" class="heads"  :src="img? img :'../../static/image/Station.png'" mode=""></image>
		</view>
		<view class="" style="margin-top: 20rpx;width: 100%;height: 18rpx;background-color: #F5F8FA;">
			
		</view>
		<view class="list">
			<view class="item">
				<view class="left">
					<image src="../../static/image/name.png" mode=""></image>
					<text>*</text>
					<view class="name">
						姓名
					</view>
				</view>
				<view class="right">
					<input type="text" value="" v-model="name" placeholder="请输入您的姓名" placeholder-class="plocss"/>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image src="../../static/image/phone_1.png" mode=""></image>
					<text>*</text>
					<view class="name">
						联系方式
					</view>
				</view>
				<view class="right">
					<input type="number" value="" v-model="phone" placeholder="请输入手机号码" placeholder-class="plocss"/>
				</view>
			</view>
			<view class="item" @click="handleTap('picker1')">
				<view class="left">
					<image src="../../static/image/address_1.png" mode=""></image>
					<text>*</text>
					<view class="name">
						选择城市
					</view>
				</view>
				<view class="right">
					<view>
						{{ares}}
					</view>
					<image src="../../static/image/right.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image src="../../static/image/xxdz.png" mode=""></image>
					<text>*</text>
					<view class="name" >
						详细地址
					</view>
					
				</view>
				<view class="right">
					<input type="text" v-model="deatils" value="" placeholder=" 请填写详细地址" placeholder-class="plocss"/>
				</view>
			</view>
			<view class="item" style="border: none;">
				<view class="left" style="width: 400rpx;">
					<image src="../../static/image/name.png" mode=""></image>
					<text>*</text>
					<view class="name">
						介绍<text>（公司/个人）</text>
					</view>
				</view>
			</view>
			<textarea class="texter" v-model="produt" placeholder="个人介绍" placeholder-class="plocss"></textarea>
			<view class="btn" @click="btns">
				完成
			</view>
			<lb-picker ref="picker1"
			  v-model="value"
			  mode="multiSelector"
			  :list="list"
			  :level="3"
			  @change="handleChange"
			  @confirm="handleConfirm"
			  @cancel="handleCancel">
			</lb-picker>
		</view>
	</view>
</template>

<script>
	 import LbPicker from '@/components/lb-picker'
	export default {
			data() {
				return {
					name:'',
					plum_session_applet:'',
					img:'',
					list:[],
					phone:'',
					ares:'请选择地址',
					deatils:'',
					produt:"",
					value:[],
					pro:'',
					city:"",
					area:'',
					
					
				}
			},
			components:{
				LbPicker
			},
			onLoad() {
				this.plum_session_applet = uni.getStorageSync('plum_session_applet');
				var _this = this
				uni.getStorage({
					key: 'applet_get_area',
					success(res) {
						_this.list = res.data
					},
					fail() {
						_this.$request('applet.php?map=applet_get_area', {}, res => {
							_this.list = res.pro;
							uni.setStorage({
								key: 'applet_get_area',
								data: res.pro
							})
						})
					}
				})
				this.getMsg();
			},
			methods: {
				getMsg(){
					this.$request('applet.php?map=applet_my_data', {}, res => {
						if(res.ec == 200){
							this.name = res.data.realname
							this.deatils = res.data.address
							this.area = res.data.area
							this.img = res.data.avatar
							this.produt = res.data.brief
							this.phone = res.data.mobile
							this.pro = res.data.pro
							this.city = res.data.city
							if(this.area){
								this.ares = this.pro + this.city + this.area
							}
						}
					})
				},
				chooseImg(){
					let that = this;
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: 'http://myd.jixuantiant.com/applet.php?map=applet_img_upload&plum_session_applet='+this.plum_session_applet, //仅为示例，非真实的接口地址
					            filePath: tempFilePaths[0],
					            name: 'image',
					            formData: {
					            
					            },
					            success: (uploadFileRes) => {
									that.img  = JSON.parse(uploadFileRes.data).data.path;
					            }
					        });
					    }
					});
				},
				btns(){
					if(!this.pro){
						uni.showToast({
							icon:'none',
							title:'请选择地址'
						})
					}
					// let data ={
					// 	avatar:this.img,
					// 	realname:this.name,
					// 	mobile:this.phone,
					// 	pro:this.pro,
					// 	city:this.city,
					// 	area:this.area,
					// 	address:this.deatils,
					// 	brief:this.produt,
					// 	appid:'wxe57483a62f88b851'
					// }
					this.$request('applet.php?map=applet_save_my_data&avatar='+this.img+'&realname='
					+this.name+'&mobile='+this.phone+'&pro='+this.pro+'&city='+this.city
					+'&area='+this.area+'&address='+this.deatils+'&brief='+this.produt, {}, res => {
						if(res.ec == 200){
							uni.switchTab({
								url:'/pages/home/home'
							})
						}else{
							uni.showToast({
								icon:'none',
								title:res.message
							})
						}
					})
				},
				back(){
					uni.navigateBack()
				},
				handleTap (picker) {
				  this.$refs[picker].show()
				},
				handleChange (e) {
				  console.log('change::', e)
				},
				handleConfirm (e) {
				  console.log('confirm::', e)
				  if (e) {
				    this.ares = e.item.map(item => item.name).join('-');
					if(e.item[0]){
						this.pro = e.item[0].name;
					}
					if(e.item[1]){
						this.city = e.item[1].name;
						
					}else{
						this.city = '';
					}
					if(e.item[2]){
						this.area = e.item[2].name;
					}else{
						this.area = '';
					}
				  }
				},
				handleCancel (e) {
				  console.log('cancel::', e)
				}
			}
		}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.tops{
		width: 750rpx;
		height: 437rpx;
		position: relative;
		.bgs{
			width: 750rpx;
			height: 437rpx;
			position: absolute;
			left: 0;
			top: 0;
		}
		.heads{
			display: block;
			width: 200rpx;
			height: 200rpx;
			margin: 90rpx auto;
			position: relative;
			z-index: 99;
			border-radius: 50%;
			overflow: hidden;
		}
		.header{
			height: 88rpx;
			width: 100%;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 20rpx;
				height: 35rpx;
				position: absolute;
				left: 30rpx;
			}
			view{
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
	.item{
		width: 720rpx;
		border-bottom: 1rpx solid #DCDCDC;
		margin-left: 30rpx;
		display: flex;
		height: 125rpx;
		align-items: center;
		.left{
			width: 270rpx;
			display: flex;
			align-items: center;
			image{
				width: 62rpx;
				height: 62rpx;
			}
			text{
				color: #DF0024;
				padding: 0 8rpx;
			}
			.name{
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #727272;
				}
			}
			view{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
			}
		}
		.right{
			flex: 1;
			padding-right: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				width: 12rpx;
				height: 21rpx;
			}
			view{
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	.plocss{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #9A9A9A;
	}
	.texter{
		width: 690rpx;
		height: 250rpx;
		border: 2rpx solid #C9C9C9;
		margin: 30rpx;
	}
	.btn{
		width: 377rpx;
		height: 90rpx;
		background: #DF0024;
		border-radius: 45rpx;
		text-align: center;
		line-height: 90rpx;
		margin: 55rpx auto;
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
