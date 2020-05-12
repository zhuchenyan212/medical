// pages/walletToCash/walletToCash.js

var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    currentScore: 0
  },

  scoreToCash: function() {
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/cashApplication'
    let data = {
      doctorId: wx.getStorageSync('id'),
      score: self.data.currentScore,
      money: self.data.currentScore
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.showToast({
          title: '提现已申请',
          icon: 'success',
        })
        setTimeout(function() {
          wx.navigateBack({})
        }, 1500)
      }
    })
  },
  /**
   *  当前兑换积分
   */
  currentScore: function(e) {
    let currentScore = parseInt(e.detail.value)
    if (currentScore < 0) {
      this.setData({
        currentScore: 0
      })
    } else {
      if (currentScore < this.data.maxCount || currentScore == this.data.maxCount) {
        this.setData({
          currentScore: currentScore
        })
      } else {
        this.setData({
          currentScore: this.data.maxCount
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let maxCount = parseInt(options.maxCount)
    this.setData({
      maxCount: maxCount
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