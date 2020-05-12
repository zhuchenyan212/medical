// pages/index/moreill.js
var app = getApp();
var $ = require("../../utils/https.js");

Page({

  data: {
    illnessInfo: '',
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var that = this;
    //请求患者信息
    $.post('/doctorPatientList', {
      'id': id
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          illnessInfo: res.data.patientList
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
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