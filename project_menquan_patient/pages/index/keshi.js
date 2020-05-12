var app = getApp();
var $ = require("../../utils/https.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    keshi: '',
    departmentDoctorList: [],
    toolips: app.data.toolips
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      keshi: options.name
    })
    //根据已选科室选择请求疾病数组
    wx.request({
      url: 'https://mengquan.live/doctor/departmentToDoctor',
      data: {
        id: options.id
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status == 0) {
          that.setData({
            departmentDoctorList: res.data.departmentDoctorList
          })
        }
      },
      fail: function () {
        app.showMsg(that, '请求服务器失败！')
      }
    })
  },

  navigateToDoctor: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < that.data.departmentDoctorList.length; i++) {
      if (that.data.departmentDoctorList[i].doctorId == id) {
        var doctorInfo = JSON.stringify(that.data.departmentDoctorList[i])
        wx.navigateTo({
          url: '../index/doctorDetail?id=' + id + '&doctorInfo=' + doctorInfo,
        })
      }
    }
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