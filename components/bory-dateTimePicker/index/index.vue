<template>
	<view class="content">
		<view class="cell" v-for='(item,index) in list' :key='index'>
			<view class="cell-title">
				{{item.title}}
			</view>
			<view class="cell-detail" @click="selectDatePicker(item.type,index)">
				{{item.detail}}
			</view>
		</view>
		<date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type' :datestring='dateString' @change='dateTimeChange'></date-time-picker>
	</view>
</template>

<script>
	import DateTimePicker from '../components/bory-dateTimePicker/bory-dateTimePicker.vue'
	export default {
		components: {
			DateTimePicker
		},
		data() {
			return {
				/**
				 * date 年月日
				 * year-month 年月
				 * year 年
				 * datetime 年月日 时分
				 * datetime-all 年月日 时分秒
				 * time 时分秒
				 * hour-minute 时分
				 */
				dateString: '',
				type: 'year-month',
				list: [{
						type: 'year',
						title: '展示年',
						detail: '请选择年'
					},
					{
						type: 'year-month',
						title: '展示年月',
						detail: '请选择年月'
					},
					{
						type: 'date',
						title: '展示年月日',
						detail: '请选择年月日'
					},
					{
						type: 'datetime',
						title: '展示年月日时分',
						detail: '请选择年月日时分'
					},
					{
						type: 'datetime-all',
						title: '展示年月日时分秒',
						detail: '请选择年月日时分秒'
					},
					{
						type: 'time',
						title: '展示时分秒',
						detail: '请选择时分秒'
					},
					{
						type: 'hour-minute',
						title: '展示时分',
						detail: '请选择时分'
					},
				]

			}
		},
		computed: {
			indicatorStyle() {
				return {
					background: 'rgba(255,0,0,.2)',
					height: '40px',
				};
			}
		},
		methods: {
			selectDatePicker(type, index) {
				this.type = type;
				this.index = index;
				this.$refs['date-time'].show();
			},
			dateTimeChange(value) {
				let item = this.list[this.index];
				item['detail'] = value;
				this.list.splice(this.index, 1, item);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.cell {
		width: 90%;
		margin: 0 auto;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		border-bottom: 2rpx solid #F1F1F1;
	}
</style>
