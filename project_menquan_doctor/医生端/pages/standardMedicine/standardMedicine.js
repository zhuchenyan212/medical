// pages/standardMedicine/standardMedicine.js

var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
  },

  chose: function (e) {
    let departmentId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/standardList/standardList?departmentId=' + departmentId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //私有处方
  mydetail: function () {
    //新增私有处方
    wx.removeStorageSync('type') //移除快速开方
    wx.navigateTo({
      url: '/pages/personnal-myMedicine/personnal-myMedicine',
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
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/departmentList'
    let data = {}
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          departmentList: res.data.departmentList
        })
      }
    })
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