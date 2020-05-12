// pages/standardList/standardList.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
    sum: 0 //总金额
  },

  checkInfo: function(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/standardInfo/standardInfo?itemInfo=' + item,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let departmentId = parseInt(options.departmentId)
    this.setData({
      currentDepartmentId: departmentId
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
    let url = wx.getStorageSync('requstURL') + 'doctor/doctorPrescriptionList'
    let data = {
      id: wx.getStorageSync('id'),
      type: 1,
      departmentId: self.data.currentDepartmentId
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          infoLists: res.data.prescriptionList,
        })
      }
    })
  },

  //发送处方给患者
  sendMedcine: function(e) {
    let money = 0;
    for (let i in e.currentTarget.dataset.infos.prescriptionContent) {
      money = money + e.currentTarget.dataset.infos.prescriptionContent[i].totalFee
    }
    wx.navigateTo({
      url: '/pages/wenzhendan/wenzhendan?item=' + JSON.stringify(e.currentTarget.dataset.infos) + '&price=' + money,
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