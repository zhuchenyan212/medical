var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    id: '', //就诊人列表id
    patientInfo: '',
    picList: [],
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    var obj = JSON.parse(options.patientInfo)
    $.post('/patientPatientDetail', {
      'id': options.id
    }, (err, res) => {
      if (res.data.status == 0) {
        //就诊人信息
        this.setData({
          id: options.id,
          picList: res.data.picList,
          patientInfo: obj
        })
      } else {
        app.showMsg(this, '请求异常请稍后');
      }
    })
  },

  //编辑就诊人
  Editpatient: function() {
    var that = this;
    wx.navigateTo({
      url: '../patient/Edit?id=' + that.data.id + '&patientInfo=' + JSON.stringify(that.data.patientInfo),
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