var app = getApp();
var $ = require("../../utils/https.js");
Page({
  data: {
    userInfo: '' //用户信息
  },

  onLoad: function(options) {},

  onShow: function() {
    var that = this;
    this.setData({
      userInfo: wx.getStorageSync('third_session')
    })

    //调用登录接口判断后台是否修改了业务员名字
    $.post('/login', {
      'username': wx.getStorageSync('username'),
      'password': wx.getStorageSync('password')
    }, (err, res) => {
      if (res.data.msg == '登陆成功') {
        wx.setStorageSync('third_session', res.data.salesman);
      } else {
        wx.showToast({
          title: '业务员账号需要重新登录',
          icon: 'none',
          duration: 2000
        })
        wx.reLaunch({
          url: "/pages/index/login"
        })
        wx.removeStorageSync("username");
        wx.removeStorageSync("password");
        wx.removeStorageSync("third_session");
      }
    })

    //判断后台是否修改了业务员密码
    $.post('/updatePassword', {
      'id': wx.getStorageSync('third_session').id,
      'pass': wx.getStorageSync('password')
    }, (err, res) => {
      if (res.data.status == 1) {
        wx.showToast({
          title: '业务员账号需要重新登录',
          icon: 'none',
          duration: 2000
        })
        wx.reLaunch({
          url: "/pages/index/login"
        })
        wx.removeStorageSync("username");
        wx.removeStorageSync("password");
        wx.removeStorageSync("third_session");
      }
    })
  },

  //编辑资料
  navigateToEdit: function() {
    wx.navigateTo({
      url: "../person/Edit"
    })
  },

  //跳转业绩
  navigateToyeji: function() {
    wx.navigateTo({
      url: "../yeji/index"
    })
  },

  //跳转业务人员
  navigateToyewu: function() {
    wx.navigateTo({
      url: "../yewu/index"
    })
  },

  //跳转我的医生
  navigateTomyDoc: function() {
    wx.navigateTo({
      url: "../doctor/index"
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