//index.js
var app = getApp();
var $ = require("../../utils/https.js");

Page({
  data: {
    doctorList: [],
    content: '',
    searchValue: '',
    toolips: app.data.toolips
  },

  onShow: function() {
    var that = this;
    var user = wx.getStorageSync('third_session')

    //请求默认医生信息
    $.post('/myDoctor', {
      'id': user.id,
      'type': '0'
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
  },

  onLoad: function() {

  },

  //跳转到医生详情
  navigateToDoctor: function(e) {
    var that = this,
      id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../index/doctor?id=" + id
    })
  },

  //搜索全部
  searchAll: function() {
    //请求医生信息
    $.post('/myDoctor', {
      'id': wx.getStorageSync('third_session').id,
      'type': '0'
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
  },

  //点击搜索查询
  searchFor: function(e) {
    var info = e.detail.value;
    var that = this;

    if (info.searchValue != '') {
      //请求医生信息
      $.post('/doctorSearch', {
        "id": wx.getStorageSync('third_session').id,
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

  // 将搜索框里面的数据清空
  onClickClear: function(e) {
    this.setData({
      searchValue: '',
      content: ''
    });
    //请求全部医生信息
    $.post('/myDoctor', {
      'id': wx.getStorageSync('third_session').id,
      'type': '0'
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          doctorList: res.data.doctorList
        })
        if (res.data.doctorList.length == 0) {
          app.showMsg(this, '暂无医生信息')
        }
      } else {
        app.showMsg(this, '请求异常请稍后！')
      }
    })
  },


  //复制邀请码
  copy: function(e) {
    console.log(e.currentTarget.dataset.uuid)
    wx.setClipboardData({
      //准备复制的数据
      data: e.currentTarget.dataset.uuid,
      success: function(res) {
        wx.showToast({
          title: '复制成功'
        });
      }
    })
  },

  onHide: function() {

  }

})

