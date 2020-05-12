// pages/orderInfo/orderInfo.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
  },

  moreInfo: function() {
    let self = this
    if (this.data.orderInfo.prescriptionList.length > 1) {
      wx.navigateTo({
        url: '/pages/yaopinInfo/yaopinInfo?medincineInfo=' + JSON.stringify(self.data.orderInfo),
      })
    } else {
      wx.showModal({
        content: '没有更多的处方信息喔',
        showCancel: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId
    })
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
    let url = wx.getStorageSync('requstURL') + 'doctor/prescriptionOrderDetail'
    let data = {
      orderId: self.data.orderId
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          orderInfo: res.data
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