// pages/standardInfo/standardInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {} //厨房内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      info: JSON.parse(options.itemInfo)
    })
  },

  //发送给患者
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