var app = getApp();
var $ = require("../../utils/https.js");
Page({
  data: {
    orderWaitPay: '',
    orderWaitSend: '',
    orderWaitGet: '',
    orderDone: '',
    orderCancel: '',
    currentTab: 0,
    prescriptionList: [],
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    
  },

  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  //跳转到处方详情
  recipeDetail: function(e) {
    var orderid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../recipe/detail?orderid=' + orderid,
    })
  },

  onShow: function() {
    var that = this;
    $.post('/prescriptionList', {
      'id': wx.getStorageSync('id')
    }, (err, res) => {
      if (res.data.status == 0) {
        //判断订单状态的长度
        for (var i = 0; i < res.data.prescriptionList.length; i++) {
          if (res.data.prescriptionList[i].orderStatus == 1) {
            that.setData({
              orderWaitPay: i
            })
          } else if (res.data.prescriptionList[i].orderStatus == 2) {
            that.setData({
              orderWaitSend: i
            })
          } else if (res.data.prescriptionList[i].orderStatus == 3) {
            that.setData({
              orderWaitGet: i
            })
          } else if (res.data.prescriptionList[i].orderStatus == 4) {
            that.setData({
              orderDone: i
            })
          } else if (res.data.prescriptionList[i].orderStatus == 5) {
            that.setData({
              orderCancel: i
            })
          }
        }
        that.setData({
          prescriptionList: res.data.prescriptionList,
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
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