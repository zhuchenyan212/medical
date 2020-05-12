var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    id: '', //地址id
    orderId: '',
    recipeInfo: '',
    address: '', //地址信息
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    var that = this;
    if (options.id && options.address) {
      console.log(JSON.parse(options.address))
      that.setData({
        id: options.id,
        address: JSON.parse(options.address) //地址信息
      })
    }
    // 地址列表
    $.post('/prescriptionDetail', {
      'orderId': options.orderid
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          orderId: options.orderid,
          recipeInfo: res.data,
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //选择地址列表
  navigator: function() {
    var that = this;
    var orderId = that.data.orderId;
    wx.redirectTo({
      url: '../address/index?orderId=' + orderId,
    })
  },

  // 确认支付
  wexinPay: function() {
    var that = this;
    var orderId = that.data.orderId;
    var money = that.data.recipeInfo.fee;
    var doctorId = that.data.recipeInfo.doctorId;
    var id = that.data.id; //选择地址id

    if (id != '') {
      // 如果地址id不为空，则调用
      $.post('/changeReceiveAddress', {
        'orderId': orderId,
        'addressId': id
      }, (err, res) => {
        if (res.data.status == 0) {
          // 支付接口
          wx.request({
            url: 'https://mengquan.live/weixin/pay',
            data: {
              openid: wx.getStorageSync('openid'),
              orderId: orderId,
              money: money
            },
            method: 'GET',
            success: function(res) {
              var payResult = res.data;
              if (res.statusCode == 200) {
                wx.requestPayment({
                  'appid': payResult.appid,
                  'timeStamp': payResult.timeStamp,
                  'nonceStr': payResult.nonceStr,
                  'package': payResult.package,
                  'paySign': payResult.paySign,
                  'signType': payResult.signType,
                  'success': function(res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000
                    })
                    $.post('/addScore ', { //支付回调
                      'orderId': orderId,
                      'doctorId': doctorId,
                      'money': money
                    }, (err, res) => {
                      // 支付成功跳转
                      setTimeout(() => {
                        wx.reLaunch({
                          url: '../recipe/index',
                        })
                      }, 1000);
                    })
                  },
                  'fail': function(res) {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              } else {
                app.showMsg(that, '请求异常请稍后');
              }
            },
            fail: function() {
              app.showMsg(that, '请求服务器失败！')
            }
          })
        } else {
          app.showMsg(that, '请求异常请稍后');
        }
      })
    } else {
      app.showMsg(that, '请选择地址')
    }

  },

  //取消订单
  cancel: function() {
    var that = this;
    var orderId = that.data.orderId

    //取消订单
    wx.showModal({
      title: '提示',
      content: '是否取消订单？',
      success: function(res) {
        if (res.confirm) {
          $.post('/cancleOrder', {
            'orderId': orderId
          }, (err, res) => {
            if (res.data.status == 0) {
              wx.showToast({
                title: '订单已取消',
                icon: 'success',
                duration: 2000
              })
              // 确认收货成功跳转
              setTimeout(() => {
                wx.navigateTo({
                  url: '../recipe/index',
                })
              }, 2000);
            } else {
              app.showMsg(this, '请求异常请稍后');
            }
          })
        } else {}
      }
    })
  },

  //确认收货
  sureGet: function() {
    var that = this;
    var orderId = that.data.orderId
    $.post('/sureReceive ', {
      'orderId': orderId
    }, (err, res) => {
      if (res.data.status == 0) {
        wx.showToast({
          title: '确认收货成功',
          icon: 'success',
          duration: 2000
        })
        // 确认收货成功跳转
        setTimeout(() => {
          wx.navigateTo({
            url: '../recipe/index',
          })
        }, 2000);
      } else {
        app.showMsg(this, '请求异常请稍后');
      }
    })
  },

  //查询物流
  navigatorTo: function() {
    var that = this;
    var wuliuCompany = that.data.recipeInfo.wuliuCompany
    var wuliuNumber = that.data.recipeInfo.wuliuNumber
    wx.navigateTo({
      url: "../recipe/translate?wuliuCompany=" + wuliuCompany + '&wuliuNumber=' + wuliuNumber
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
    var that = this;
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