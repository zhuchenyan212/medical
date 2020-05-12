var app = getApp();
var $ = require("../../utils/https.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //我的专属业务员id
    salesmanInfo: '',
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id

    //请求业务人员信息
    $.post('/salesmanMainPage', {
      'id': id
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          salesmanInfo: res.data,
          id: id
        })
      } else {
        app.showMsg(this, '请求异常请稍后！')
      }
    })
  },

  navigatorTohisDoctor: function() {
    var id = this.data.id;
    wx.navigateTo({
      url: "../yewu/hisDoctor?id=" + id
    })
  },

  navigatorTohisyaoqin: function() {
    var id = this.data.id;
    wx.navigateTo({
      url: "../yewu/hisYaoqin?id=" + id
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