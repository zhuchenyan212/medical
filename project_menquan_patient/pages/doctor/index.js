var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    doctorList: [],
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    var that = this;
    var id = wx.getStorageSync('id')
    $.post('/patientDoctorList', {
      'id': id
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          doctorList: res.data.patientDoctorList,
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //医生详情
  navigatorToDetail: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < that.data.doctorList.length; i++) {
      if (that.data.doctorList[i].id == id) {
        var doctorInfo = JSON.stringify(that.data.doctorList[i])
        wx.navigateTo({
          url: '../index/doctorDetail?id=' + id + '&doctorInfo=' + doctorInfo,
        })
      }
    }
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