// pages/illness/illness.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false,
  },

  showMask: function(e) {
    this.setData({
      showMask: true,
      seletedContentItem: e.currentTarget.dataset.item
    })
  },

  cancelMask: function() {
    this.setData({
      showMask: false
    })
  },

  sendMsg: function() {
    wx.navigateTo({
      url: '/pages/chatSocket/chatSocket?id=' + this.data.patientID,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      patientID: parseInt(options.patientId)
    })
    let item = JSON.parse(options.item)
    //拼接每个处方单的药品内容详情medicineContent
    for (var index = 0; index < item.prescriptionList.length; index++) {
      item.prescriptionList[index].medicineContent = ''
      for (var contentIndex = 0; contentIndex < item.prescriptionList[index].prescriptionContent.length; contentIndex++) {
        if (contentIndex == 0) {
          item.prescriptionList[index].medicineContent = item.prescriptionList[index].prescriptionContent[contentIndex].drugName
        } else {
          item.prescriptionList[index].medicineContent = item.prescriptionList[index].medicineContent + '、' + item.prescriptionList[index].prescriptionContent[contentIndex].drugName
        }
      }
    }
    wx.hideLoading()
    this.setData({
      seletedItem: item
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