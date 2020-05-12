// pages/wallet/wallet.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    selectedMenu: 0
  },

  walletToCash: function() {
    let self = this;
    if (self.data.yejiInfo.score <= 0) {
      wx.showToast({
        title: '您暂无可提现余额',
        icon: 'none'
      })
    } else {
      let self = this
      wx.navigateTo({
        url: '/pages/walletToCash/walletToCash?maxCount=' + self.data.yejiInfo.score,
      })
    }
  },

  menu: function(e) {
    let index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      selectedMenu: index
    })
    this.onShow()
  },

  changeStr: function(e) {
    this.setData({
      startDate: e.detail.value
    })
    this.onShow()
  },

  changeEnd: function(e) {
    this.setData({
      endDate: e.detail.value
    })
    this.onShow()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //默认时间
    let defaultDate = new Date()
    let currentM
    let currentD
    let currentY = defaultDate.getFullYear()
    //月份补齐0
    if (defaultDate.getMonth() < 9) {
      currentM = '0' + (defaultDate.getMonth() + 1)
    } else {
      currentM = defaultDate.getMonth() + 1
    }
    //日期补齐0
    if (defaultDate.getDate() < 10) {
      currentD = '0' + defaultDate.getDate()
    } else {
      currentD = defaultDate.getDate()
    }
    this.setData({
      startDate: currentY + '-' + currentM + '-' + currentD,
      endDate: currentY + '-' + currentM + '-' + currentD
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
    wx.showLoading({
      title: '加载中...',
    })

    let self = this
    if (self.data.selectedMenu == 0) {
      //业绩记录
      let url = wx.getStorageSync('requstURL') + 'doctor/achievementList'
      let data = {
        doctorId: wx.getStorageSync('id'),
        stime: self.data.startDate,
        etime: self.data.endDate
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          wx.hideLoading()
          self.setData({
            achievementLis: res.data.achievementLis,
            yejiInfo: res.data
          })
        }
      })
    } else {
      //积分提现记录
      let url = wx.getStorageSync('requstURL') + 'doctor/scoreList'
      let data = {
        doctorId: wx.getStorageSync('id'),
        stime: self.data.startDate,
        etime: self.data.endDate
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          wx.hideLoading()
          self.setData({
            scoreList: res.data.scoreList,
            scoreInfo: res.data
          })
        }
      })
    }
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