var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    patientList: '', //就诊人列表
    toolips: app.data.toolips
  },

  onShow: function() {
    //请求患者中心
    $.post('/patientPatientList', {
      'id': wx.getStorageSync('id')
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          patientList: res.data.patientList //用户的就诊人列表
        })
      } else {
        app.showMsg(this, '请求异常请稍后');
      }
    })
  },

  //删除就诊人
  deleteitem: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var patientList = that.data.patientList
    if (patientList.length < 2) {
      app.showMsg(that, '至少保留一条就诊人信息');
    } else {
      wx.showModal({
        title: '提示',
        content: '删除当前就诊人？',
        success: function(res) {
          if (res.confirm) {
            $.post('/deletePatientPatient', {
              'id': id
            }, (err, res) => {
              if (res.data.status == 0) {
                // 提示成功状态
                wx.showToast({
                  title: '数据加载成功',
                  icon: 'success'
                })
                //删除一项以后 刷新当前页面
                that.onShow()
              } else {
                app.showMsg(that, '请求异常请稍后');
              }
            })
          }
        }
      })
    }
  },

  //添加就诊人
  addpatient: function() {
    wx.navigateTo({
      url: '../patient/add',
    })
  },

  //就诊人详情 
  navigatorTodetail: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < that.data.patientList.length; i++) {
      if (that.data.patientList[i].id == id) {
        var patientInfo = JSON.stringify(that.data.patientList[i])
        wx.navigateTo({
          url: '../patient/detail?id=' + id + '&patientInfo=' + patientInfo,
        })
      }
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