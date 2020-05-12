// pages/order/order.js
var baseRequest = require("./../../utils/baseRequest.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: ['全部处方', '待付款', '待收货', '已完成', '取消/退款'],
    selectedIndex: 0,
  },
  /**
   * 顶部菜单切换
   */
  menuSelet: function(e) {
    let selectIndex = e.currentTarget.dataset.index
    let _this = this



    _this.setData({
      selectedIndex: selectIndex
    })
    this.onShow()


  },
  /**
   * 订单详情
   */
  orderInfo: function(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo?orderId=' + item.orderId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/prescriptionOrderList'
    let data = {
      id: wx.getStorageSync('id')
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          orderList: res.data.prescriptionList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})