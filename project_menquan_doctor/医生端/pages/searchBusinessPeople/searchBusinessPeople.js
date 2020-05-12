// pages/searchBusinessPeople/searchBusinessPeople.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    searchList: [] //业务员列表
  },

  showMask: function(e) {
    let name = e.detail.value
    this.getSalesMan(name)
  },

  getSalesMan: function(name) {
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/salesmanList'
    let data = {
      keyword: name
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          showSearchList: true,
          disabled: false,
          searchList: res.data.mySalesmanList
        })
      }
    })
  },

  cancelMask: function() {
    this.setData({
      showSearchList: false,
      disabled: true
    })
  },

  catchtouchmove: function() {
    return null
  },

  /**
   * 选中业务员
   */
  selectMedicine: function(e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      selectedItem: item
    })
    this.cancelMask()
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    wx.getSystemInfo({
      success: function(res) {
        let rate = 750 / res.windowWidth
        _this.setData({
          scrollH: res.windowHeight * rate - 51 * rate
        })
      },
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
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/salesmanList'
    let data = {
      keyword: ""
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        self.setData({
          showSearchList: true,
          disabled: false,
          searchList: res.data.mySalesmanList
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
    var that = this
    if (that.data.selectedItem !== undefined) {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      let salesMan = "userInfo.salesMan"
      prevPage.setData({
        [salesMan]: that.data.selectedItem
      })
    }

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