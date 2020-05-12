var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    id: '', //业务员id
    page: 1, //页码
    doctorList: [],
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this,
      page = that.data.page;
    //请求业务人员的医生信息
    $.post('/getSalesmanDoctorList', {
      'type': 0,
      'id': options.id,
      'page': page
    }, (err, res) => {
      if (res.data.status == 0) {
        console.log(res.data)
        this.setData({
          doctorList: res.data.SalesmanDoctorList,
          id: options.id //业务员id
        })
      } else {
        wx.showToast({
          title: '请求异常请稍后！',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  getdata: function(page) {
    var that = this,
      id = this.data.id;

    //请求业务人员的医生信息
    $.post('/getSalesmanDoctorList', {
      'type': 0,
      'id': id,
      'page': page
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          doctorList: that.data.doctorList.concat(res.data.SalesmanDoctorList)
        })
      } else {
        wx.showToast({
          title: '请求异常请稍后！',
          icon: 'fail',
          duration: 1000
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
    var page = this.data.page;
    page++;
    this.setData({
      page: page
    })
    console.log(page)
    this.getdata(page)
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