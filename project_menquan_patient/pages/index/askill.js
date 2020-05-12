var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    showor: false, //是否显示老病情
    docName: ' ', //医生姓名
    money: ' ', //支付金额
    registId: '', //支付参数
    hasChat: '', //历史聊天记录
    toolips: app.data.toolips
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      docName: options.docName, //医生姓名
      money: options.money, //支付金额
      hasChat: options.hasChat //是否历史聊天记录
    })
    //缓存医生的资料==进入不同的医生主页切换不同的资料
    wx.setStorageSync('money', options.money)
    wx.setStorageSync('docName', options.docName)

    //查询历史聊天记录
    wx.request({
      url: 'https://mengquan.live/patient/msgRecord',
      data: {
        doctorId: wx.getStorageSync('doctorId'),
        patientId: wx.getStorageSync('id'),
        identify: 1,
        page: 1
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status == 0) {
          if (res.data.msgList.length > 0) {
            that.setData({
              showor: true
            })
          }
        }
      },
      fail: function () {
        app.showMsg(this, '请求服务器失败！')
      }
    })
  },

  //点击立即咨询
  navigatorTonewill: function () {
    var that = this;
    if (that.data.money > 0) {
      // 支付成功跳转
      setTimeout(() => {
        // 跳转填写问诊单
        wx.navigateTo({
          url: '../Editsick/index',
        })
      }, 500);
    } else {
      $.post('/addScore ', { //支付回调
        'orderId': that.data.registId,
        'doctorId': wx.getStorageSync('doctorId'),
        'money': that.data.money
      }, (err, res) => {
        // 支付成功跳转
        setTimeout(() => {
          // 跳转填写问诊单
          wx.navigateTo({
            url: '../Editsick/index',
          })
        }, 500);
      })
    }
  },

  //老病情聊天
  chatWe: function () {
    var that = this;
    var hasChat = that.data.hasChat;
    // 有历史病情
    wx.navigateTo({
      url: '../chatSocket/chatSocket',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 客户按返回箭头清除问诊单缓存
    $.post('/clearTempInterrogationForm', {
      'id': wx.getStorageSync('id'),
    }, (err, res) => {
      if (res.data.status == 0) {
        console.log('第一步清除页面缓存成功')
      } else {
        app.showMsg(this, '清除缓存异常');
      }
    })
  }
})