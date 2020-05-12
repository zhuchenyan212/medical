var app = getApp();
var $ = require("../../utils/https.js");

Page({

  data: {
    salesmanList: [],
    content: '',
    searchValue: '',
    toolips: app.data.toolips
  },

  // 默认展示业务员列表
  onShow: function() {
    var that = this;
    var user = wx.getStorageSync('third_session')

    //请求业务人员信息
    $.post('/mySalesmanList', {
      'id': user.id
    }, (err, res) => {
      if (res.data.status == 0) {
        if (res.data.mySalesmanList.length == 0) {
          app.showMsg(that, '暂无业务员信息')
        } else {
          this.setData({
            salesmanList: res.data.mySalesmanList
          })
        }
      } else {
        app.showMsg(that, '请求异常请稍后！')
      }
    })
  },

  //跳转业务人员
  ToyewuYuan: function(e) {
    var that = this,
      id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../yewu/detail?id=" + id
    })
  },

  //点击全部业务员信息
  // searchAll: function() {
  //   $.post('/mySalesmanList', {
  //     'id': wx.getStorageSync('third_session').id,
  //     'type': '0'
  //   }, (err, res) => {
  //     if (res.data.status == 0) {
  //       this.setData({
  //         salesmanList: res.data.mySalesmanList
  //       })
  //       if (res.data.mySalesmanList.length == 0) {
  //         app.showMsg(that, '暂无业务员信息')
  //       }
  //     } else {
  //       app.showMsg(that, '请求异常请稍后！')
  //     }
  //   })
  // },

  //点击搜索查询
  searchFor: function(e) {
    var info = e.detail.value;
    var that = this;

    if (info.searchValue != '') {
      $.post('/salesmanSearch', {
        "id": wx.getStorageSync('third_session').id,
        "keyword": info.searchValue
      }, (err, res) => {
        if (res.data.status == 0) {
          this.setData({
            salesmanList: res.data.mySalesmanList
          })
          if (res.data.mySalesmanList.length == 0) {
            app.showMsg(that, '暂无业务员信息')
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

  // 将搜索框里面的数据清空
  onClickClear: function(e) {
    this.setData({
      searchValue: '',
      content: ''
    });
    //请求全部业务员信息
    $.post('/mySalesmanList', {
      'id': wx.getStorageSync('third_session').id,
      'type': '0'
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          salesmanList: res.data.mySalesmanList
        })
        if (res.data.mySalesmanList.length == 0) {
          app.showMsg(this, '暂无业务员信息')
        }
      } else {
        app.showMsg(this, '请求异常请稍后！')
      }
    })
  },

})