// pages/wenzhendan/wenzhendan.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '' //医生填写问诊单页面
  },

  illness: function(e) {
    let illness = e.detail.value
    this.setData({
      illness: illness
    })
  },

  zhenduan: function(e) {
    let cure = e.detail.value
    this.setData({
      cure: cure
    })
  },

  sendMed: function() {
    let self = this
    let dataItem = {
      diseaseCondition: self.data.illness,
      diagnose: self.data.cure,
      prescriptionId: self.data.item.prescriptionId,
      doctorId: wx.getStorageSync('id'),
      fee: self.data.price,
    }
    wx.navigateTo({
      url: '/pages/message/message?item=' + JSON.stringify(dataItem),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time = util.formatTime(new Date());
    console.log(JSON.parse(options.item))
    this.setData({
      item: JSON.parse(options.item),
      price: options.price,
      time: time
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
  onShow: function() {},

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