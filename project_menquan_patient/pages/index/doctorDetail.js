var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    detail: '',
    workTime: '',
    doctorMsg: '',
    hasChat: '', //是否有历史聊天记录
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var doctorMsg = JSON.parse(options.doctorInfo)
    console.log(doctorMsg)
    //缓存当前医生信息
    wx.setStorageSync('doctorId', options.id);
    //请求医生信息
    $.post('/doctorDetail', {
      'id': options.id,
      'patientId': wx.getStorageSync('id')
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          doctorMsg: doctorMsg,
          detail: res.data.detail,
          workTime: res.data.workTime,
          hasChat: res.data.hasChat
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  askill: function() {
    var that = this;
    var docName = that.data.doctorMsg.name //医生姓名
    var money = that.data.doctorMsg.fee //需要支付的金额
    var hasChat = that.data.hasChat; // 是否有历史聊天记录
    wx.navigateTo({
      url: '../index/askill?docName=' + docName + '&money=' + money + '&hasChat=' + hasChat,
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