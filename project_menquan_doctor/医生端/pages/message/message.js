// pages/message/message.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {

  },
  chat: function(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    if (this.data.item) {
      //发送问诊单
    } else {
      //发送消息
      wx.navigateTo({
        url: '/pages/chatSocket/chatSocket?id=' + id + '&name=' + name,
      })
    }
  },

  send: function(e) {
    wx.showLoading({
      title: '发送中...',
    })
    let name = e.currentTarget.dataset.name
    let id = e.currentTarget.dataset.id
    console.log(this.data.item)
    this.data.item.patientId = id
    this.data.item.patientName = name
    this.data.item.fee = parseFloat(this.data.item.fee)
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/prescriptionOrder'
    let data = self.data.item
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        wx.switchTab({
          url: '/pages/order/order',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t = options.item == ""
    if (options.item) {
      let sendItem = JSON.parse(options.item)
      this.setData({
        item: sendItem,
        sendMed: true
      })
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
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/msgList'
    let data = {
      id: wx.getStorageSync('id')
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          imgs: res.data.msgList
        })
      }
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