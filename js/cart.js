var vm = new Vue({
  el: '#app',
  // Model
  data:{
    productList: [],
    totalMoney: 0,
    checkAllFlag:false
  },
  // 局部过滤器
  filters:{
    formatMoney: function(value){
      return "¥" + value.toFixed(2)
    }
  },
  // 入口
  mounted:function() {
    this.cartView()
  },
  methods:{
    cartView: function() {
      console.log(this)
      this.$http.get("data/cartData.json").then((res) => {
        this.productList = res.data.result.list
        this.totalMoney = res.data.result.totalMoney
      });
    },
    changeMoney: function(product, way) {
      if(way > 0){
        product.productQuantity++
      }else{
        if(product.productQuantity < 2){
          product.productQuantity = 1
        }else{
          product.productQuantity--
        }
      }
    },
    selectedProduct: function(item) {
      if(typeof item.checked == 'undefined'){
        // 全局设置
        this.$set(item, 'checked', 'true')
        // 局部设置
        // this.$set('item', 'checked', true)
      }else{
        item.checked = !item.checked
      }
    },
    checkAll: function(){
      this.checkAllFlag = !this.checkAllFlag
      var that = this
      if(this.checkAllFlag){
        this.productList.forEach(function(item){
          if(typeof item.checked == 'undefined'){
            // 全局设置
            that.$set(item, 'checked', that.checkAllFlag)
          }else{
            item.checked = that.checkAllFlag
          }
        })
      }
    }
  }
})

// 全局过滤器
Vue.filter("amount", function(value, type) {
  return "¥" + value.toFixed(2) + type
})