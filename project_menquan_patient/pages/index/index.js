var app = getApp();
var $ = require("../../utils/https.js");
Page({
  data: {
    departmentList: [],
    toolips: app.data.toolips
  },

  onLoad:function(){
    if(!wx.getStorageSync('sex')){
      wx.showModal({
        title: '提示',
        content: '是否立即完善资料？',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../person/Edit',
            })
          }
        }
      })
    }
  },

  onShow: function() {
    //请求科室信息
    $.post('/departmentList', {}, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          departmentList: res.data.departmentList, //用户默认头像
        })
      } else {
        app.showMsg(this, '请求异常请稍后');
      }
    })
  },

  //跳转科室
  navigatorTochoose: function(e) {
    // 如果患者没有完善资料需要立即完善
    if(!wx.getStorageSync('sex')){
      wx.showModal({
        title: '提示',
        content: '是否立即完善资料？',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../person/Edit',
            })
          }
        }
      })
    }else{
      // if (wx.getStorageSync('or') == '1') {
        // console.log('关闭功能')
      // } else {
        var info = e.currentTarget.dataset
        wx.navigateTo({
          url: '../index/keshi?id=' + info.id + '&name=' + info.name,
        })
      // }
    }
  },

  //跳转搜索
  navigatorToSearch: function() {
    wx.navigateTo({
      url: '../index/search',
    })
  }

})