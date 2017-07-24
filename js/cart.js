/**
 * Created by jacksoft on 16/10/22.
 */

window.vm = new Vue({
	el:'#app',
	data:{
		showModal:false,
		productList:[],
		totalMoney:0,
		checkAll:false,
		currentProduct:''
	},
	mounted: function () {
		var _this = this;
		this.cartView();
	},
	// 过滤器
	filters: {
		formatMoney: function (value,quentity) {
			if(!quentity)quentity=1;
			return "¥ "+(value*quentity).toFixed(2) +"元";
		}
	},
	methods:{
		cartView: function () {
			this.$http.get("data/cartData.json").then(response=>{
				var res = response.data;
				if(res && res.status=="1"){
					this.productList = res.result.list;
					this.calcTotalMoney();
				}
			});
		},
		// 全选、取消全选
		selectAll: function (isCheck) {
			this.checkAll=isCheck;
			this.productList.forEach(function (item) {
				if(typeof item.checked == "undefined"){
					Vue.set(item,"checked",isCheck);
				}else{
					item.checked = isCheck;
				}
			})
			this.calcTotalMoney();
		},
		selectedProduct: function (product) {
			if(typeof product.checked == "undefined"){
				//Vue.set(product,"checked",true);
				this.$set(product,"checked",true);
			}else{
				product.checked = !product.checked;
			}
			this.calcTotalMoney();
			this.isCheckAll();
		},
		isCheckAll: function () {
			let flag = true;
			this.productList.forEach(function (item) {
				if(!item.checked){
					flag = false;
				}
			})
			if(flag){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}

		},
		// 总价
		calcTotalMoney: function () {
			let totalMoney = 0;
			this.productList.forEach(function (item) {
				if(item.checked){
					totalMoney+=item.productPrice*item.productQuentity;
				}
			});
			this.totalMoney = totalMoney;
		},
		// 数量改变重算价钱
		changeMoney: function (product,way) {
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity=1;
				}
			}
			this.calcTotalMoney();
		},
		// 弹出删除框
		delConfirm: function (product) {
			this.showModal = true;
			this.currentProduct = product;
		},
		// 确认删除
		delCurrentProduct: function () {
			this.showModal = false;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index,1);
		}
	}
});