var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    patientAddressList: '',
    orderId: '', //订单id
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.orderId != undefined) {
      that.setData({
        orderId: options.orderId
      })
    }
  },

  onShow: function() {
    var that = this;
    var id = wx.getStorageSync('id')
    $.post('/patientAddressList', {
      'id': id
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          patientAddressList: res.data.patientAddressList,
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //添加收货地址
  addAddress: function() {
    wx.navigateTo({
      url: '../address/add',
    })
  },

  //编辑收货地址
  navigatorToEdit: function(e) {
    var id = e.currentTarget.dataset.id
    for (var i = 0; i < this.data.patientAddressList.length; i++) {
      if (this.data.patientAddressList[i].id == id) {
        var addInfo = JSON.stringify(this.data.patientAddressList[i])
        wx.navigateTo({
          url: '../address/Edit?id=' + id + '&addInfo=' + addInfo,
        })
      }
    }
  },

  //删除收货地址
  deleteAddress: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var patientAddressList = that.data.patientAddressList
    if (patientAddressList.length < 2) {
      app.showMsg(that, '至少保留一条地址信息');
    } else {
      wx.showModal({
        title: '提示',
        content: '删除当前地址？',
        success: function(res) {
          if (res.confirm) {
            $.post('/deleteAddress', {
              'id': id
            }, (err, res) => {
              if (res.data.status == 0) {
                //删除一项地址以后 刷新当前页面
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

  //选择收货地址
  backnavigator: function(e) {
    var that = this;
    var orderid = that.data.orderId; //订单id
    var id = e.currentTarget.dataset.id
    if (orderid != undefined) {
      // 返回待支付
      wx.navigateTo({
        url: '../recipe/detail?id=' + id + '&orderid=' + orderid + '&address=' + JSON.stringify(e.currentTarget.dataset.address),
      })
    } else {
      console.log('没有订单id,点击无效')
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