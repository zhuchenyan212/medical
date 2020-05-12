var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {},
  sendMsg: function(e) {
    let id = JSON.stringify(e.currentTarget.dataset.item.patientId)
    wx.navigateTo({
      url: '/pages/chatSocket/chatSocket?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = JSON.parse(options.item)
    console.log(item)
    //标记消息为已读
    let url = wx.getStorageSync('requstURL') + 'doctor/updateInquirySheet'
    let data = {
      id: item.id,
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {}
    })

    let _this = this
    wx.getSystemInfo({
      success: function(res) {
        let rate = 750 / res.windowWidth
        _this.setData({
          scrollH: res.windowHeight * rate - 100,
          infoItem: item
        })
      },
    })
  },

  //点击预览图片功能
  clickImg: function(e) {
    var imgUrl = e.currentTarget.dataset.url;
    console.log(imgUrl)
    wx.previewImage({　　　　
      current: imgUrl, //当前显示图片的http链接，我这边是把图片转成了base64
      urls: [imgUrl] //需要预览的图片http链接列表
    })
  },

  //点击预览患者照片
  clickImg1: function(e) {
    var imgUrl = e.currentTarget.dataset.url;
    console.log(imgUrl)
    wx.previewImage({
      current: imgUrl, //当前显示图片的http链接，我这边是把图片转成了base64
      urls: [imgUrl] //需要预览的图片http链接列表
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