var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    doctorList: [],
    content: '',
    searchValue: '',
    toolips: app.data.toolips
  },

  //点击搜索查询
  searchFor: function(e) {
    var that = this;
    var info = e.detail.value;

    if (info.searchValue != '') {
      //请求医生信息
      $.post('/searchDoctorList', {
        "keyword": info.searchValue
      }, (err, res) => {
        if (res.data.status == 0) {
          this.setData({
            doctorList: res.data.doctorList
          })
          if (res.data.doctorList.length == 0) {
            app.showMsg(that, '暂无医生信息')
          }
        } else {
          app.showMsg(that, '请求异常请稍后！')
        }
      })
    } else {
      app.showMsg(that, '请输入搜索信息！')
    }
  },

  bindSearchInput: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  //将搜索框里面的数据清空
  onClickClear: function(e) {
    //医生列表展示为空
    this.setData({
      searchValue: '',
      content: '',
      doctorList: ''
    });
  },

  //跳转到医生详情
  navigateToDoctor: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < that.data.doctorList.length; i++) {
      if (that.data.doctorList[i].id == id) {
        var doctorInfo = JSON.stringify(that.data.doctorList[i])
        wx.navigateTo({
          url: '../index/doctorDetail?id=' + id + '&doctorInfo=' + doctorInfo,
        })
      }
    }
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