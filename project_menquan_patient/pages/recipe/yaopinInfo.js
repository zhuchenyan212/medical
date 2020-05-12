var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    recipeInfo: '',
    toast: '',
    showMask: false,
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    var that = this;
    $.post('/prescriptionDetail', {
      'orderId': options.orderid
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          recipeInfo: res.data,
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  showMask: function(e) {
    var that = this;
    //  设置弹窗显示 
    for (var i = 0; i < that.data.recipeInfo.prescriptionList.length; i++) {
      if (that.data.recipeInfo.prescriptionList[i].drugMenuId == e.currentTarget.dataset.id) {
        that.setData({
          toast: that.data.recipeInfo.prescriptionList[i]
        })
      }
    }
    // 展开弹窗
    this.setData({
      showMask: true
    })
  },

  cancelMask: function() {
    this.setData({
      showMask: false
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