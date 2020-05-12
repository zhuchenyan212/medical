// pages/patientInfo/patientInfo.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
    patientID: '', //患者id
    inquiryList: {} //历史问诊记录
  },
  /**
   *  发送消息
   */
  sendMsg: function(e) {
    wx.navigateTo({
      url: '/pages/chatSocket/chatSocket?id=' + this.data.patientID + '&doctorId=' + this.data.doctorId + '&identify=' + this.data.doctorId + '&patientName=' + this.data.patientInfo.name,
    })
  },
  /**
   *  查看病人详情
   */
  checkPatientInfo: function(e) {
    let patientItem = e.currentTarget.dataset.item
    let selectedOrderId = e.currentTarget.dataset.item.orderId
    wx.navigateTo({
      url: '/pages/illness/illness?item=' + JSON.stringify(patientItem) + "&patientId=" + this.data.patientID,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      patientID: options.patientID
    })
    // wx.getSystemInfo({
    //   success: function(res) {
    //     let rate = 750 / res.windowWidth
    //     this.setData({
    //       scrollH: res.windowHeight * rate - 233 * rate
    //     })
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  //患者历史问诊
  detail: function() {
    let url = wx.getStorageSync('requstURL') + 'doctor/doctorInquiryHistory'
    let data = {
      id: wx.getStorageSync('id'),
      isRead: 2
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        if (res.data.inquiryList.length == 0) {
          wx.showToast({
            title: '当前暂无问诊记录喔～',
            duration: 2000,
            icon: 'none'
          })
        } else {
          //解析问诊单
          let historyLists = []
          for (var index = 0; index < res.data.inquiryList.length; index++) {
            res.data.inquiryList[index].basic = JSON.parse(res.data.inquiryList[index].basic)
            res.data.inquiryList[index].patientMsg = JSON.parse(res.data.inquiryList[index].patientMsg)
            res.data.inquiryList[index].special = JSON.parse(res.data.inquiryList[index].special)
            res.data.inquiryList[index].twoWill = JSON.parse(res.data.inquiryList[index].twoWill)
          }
          for (let i in res.data.inquiryList) {
            if (res.data.inquiryList[i].patientId == this.data.patientID) {
              let item = JSON.stringify(res.data.inquiryList[i])
              wx.navigateTo({
                url: '../askIllnessInfo/askIllnessInfo?item=' + item,
              })
            }
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '加载中...',
    })
    let url = wx.getStorageSync('requstURL') + 'doctor/patientDetail'
    let data = {
      id: this.data.patientID
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        //拼接处方内容明细medicineContent
        for (var index = 0; index < res.data.diseaseHistory.length; index++) {
          res.data.diseaseHistory[index].medicineContent = ''
          for (var contentIndex = 0; contentIndex < res.data.diseaseHistory[index].prescriptionList.length; contentIndex++) {
            for (var contentIndex2 = 0; contentIndex2 < res.data.diseaseHistory[index].prescriptionList[contentIndex].prescriptionContent.length; contentIndex2++) {
              if (contentIndex2 == 0) {
                res.data.diseaseHistory[index].medicineContent = res.data.diseaseHistory[index].prescriptionList[contentIndex].prescriptionContent[contentIndex2].drugName
              } else {
                res.data.diseaseHistory[index].medicineContent = res.data.diseaseHistory[index].medicineContent + '、' + res.data.diseaseHistory[index].prescriptionList[contentIndex].prescriptionContent[contentIndex2].drugName
              }
            }
          }
        }
        wx.hideLoading()
        this.setData({
          patientInfo: res.data
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