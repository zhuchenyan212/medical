var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    wuliuMsg: '', //物流信息
    toolips: app.data.toolips
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://mengquan.live/salesman/seeWuLiu',
      data: {
        wuliuCompany: options.wuliuCompany,
        wuliuNumber: options.wuliuNumber
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          wuliuMsg: res.data.wuliuMsg,
        })
      },
      fail: function () {
        app.showMsg(that, '请求服务器失败！')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})