// pages/authority/authority.js
var baseRequest = require("./../../utils/baseRequest.js")
const app = getApp();
Page({

  data: {

  },

  /**
   * 个人资料认证
   */
  // fixPersonnalInfo: function(e) {
  //   let self = this
  //   if (e.detail.errMsg == "getPhoneNumber:ok") {
  //     if (wx.getStorageSync('session_key')) {
  //       let url = wx.getStorageSync('requstURL') + 'doctor/getPhone'
  //       let data = {
  //         sessionKey: wx.getStorageSync('session_key'),
  //         iv: e.detail.iv,
  //         data: e.detail.encryptedData
  //       }
  //       baseRequest.requestLoading(url, data, "GET").then(res => {
  //         if (res.data.status == 0) {
  //           wx.setStorageSync('phone', res.data.phone)
  //           wx.navigateTo({
  //             url: '/pages/userIdentify/userIdentify?phone=' + res.data.phone,
  //           })
  //         }
  //       })
  //     } else {
  //       app.getSessionkeyCallBack = result => {
  //         let url = wx.getStorageSync('requstURL') + 'doctor/getPhone'
  //         let data = {
  //           sessionKey: result,
  //           iv: e.detail.iv,
  //           data: e.detail.encryptedData
  //         }
  //         baseRequest.requestLoading(url, data, "GET").then(res => {
  //           if (res.data.status == 0) {
  //             wx.navigateTo({
  //               url: '/pages/userIdentify/userIdentify?phone=' + res.data.phone,
  //             })
  //           }
  //         })
  //       }
  //     }
  //   } else {
  //     //获取不到手机号
  //     wx.navigateTo({
  //       url: '/pages/userIdentify/userIdentify',
  //     })
  //   }
  // },

  //去认证
  goto: function() {
    wx.navigateTo({
      url: '/pages/userIdentify/userIdentify',
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