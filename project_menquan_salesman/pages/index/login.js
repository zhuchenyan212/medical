// pages/index/login.js
var app = getApp();
var $ = require("../../utils/https.js");

Page({

  data: {
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取用户信息登录
  saveUserInfo: function (e) {
    var that = this,
      userInfo = e.detail.value;
    if (userInfo.username == '') {
      app.showMsg(that, '请输入用户名')
    } else if (userInfo.password == '') {
      app.showMsg(that, '请输入登录密码')
    } else {
      $.post('/login', {
        'username': userInfo.username,
        'password': userInfo.password
      }, (err, res) => {
        if (res.data.msg == '登陆成功') {
          app.showMsg(that, '登录成功');
          wx.setStorageSync('third_session', res.data.salesman);
          //登陆成功缓存业务员信息
          wx.setStorageSync('username', userInfo.username);
          wx.setStorageSync('password', userInfo.password);
          wx.reLaunch({
            url: "/pages/index/index"
          })
        } else {
          app.showMsg(that, res.data.msg);
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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