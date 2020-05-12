// pages/bangding/bangding.js
var app = getApp();
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    code: '' //激活码
  },

  //医生绑定
  bangding: function(e) {
    if (e.detail.value.code) {
      var that = this;
      let url = wx.getStorageSync('requstURL') + 'doctor/getDoctorMainPage'
      let data = {
        uuid: e.detail.value.code
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('id', res.data.Doctor.id)
          wx.setStorageSync('phone', res.data.Doctor.phone)
          wx.switchTab({
            url: '/pages/personnal/personnal',
          })
        }
      })
    }
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