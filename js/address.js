var vm = new Vue({
	el: ".container",
	data: {
		limitNum:3,
		addressIndex: 0,
		addressList: [],
		isNextFlag: false,
		loadMoreFlag: false,
		shippingMethod:1
	},
	mounted: function () {
		// dom完全加载后执行
		this.$nextTick(function () {
			this.loadingState = true;
			this.queryAddress();
		});
	},
	computed: {
		// 默认只渲染3个；返回的是新数组
		filteAddress:function (){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	methods: {
		// 加载所有数据
		queryAddress: function () {
			var _this = this;
			let a= 3;
			this.$http.get("data/address.json").then(function (response) {
				var res = response.data;
				if(res.status=="0"){
					_this.addressList = res.result;
				}
			})
		},
		// 加载所有
		loadMoreData: function() {
			this.loadMoreFlag = !this.loadMoreFlag;
			if (this.loadMoreFlag) {
				this.limitNum = this.addressList.length;
			} else {
				this.limitNum = 3;
			}
		},
		// 设置默认地址
		setDefaultAddress: function(addrId) {
			var _this = this;
			_this.addressList.forEach(function (item) {

				if(item.addressId==addrId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
				//console.log(item.addressId+"::"+item.isDefault);
			});
		}
	}
});