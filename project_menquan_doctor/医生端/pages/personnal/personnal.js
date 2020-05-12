// pages/personnal/personnal.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    list: [{
      url: '/imgSrc/cfBtn.png',
      text: '快速开方'
    },
    {
      url: '/imgSrc/talkcf.png',
      text: '协定处方'
    },
    {
      url: '/imgSrc/score.png',
      text: '业绩积分'
    },
    {
      url: '/imgSrc/identify.png',
      text: '申请认证'
    },
    {
      url: '/imgSrc/identify.png',
      text: '修改资料'
    },
    {
      url: '/imgSrc/aboutus.png',
      text: '关于我们'
    }
    ]
  },

  /**
   * 个人中心按钮
   */
  menuInfo: function (e) {
    if (this.data.personnalInfo.examineStatus == 0) {
      if (e.currentTarget.dataset.index == 0) {
        wx.setStorageSync('type', '0') //当前为快速开方
        wx.navigateTo({
          url: '/pages/addMedicineOptions/addMedicineOptions',
        })
      } else if (e.currentTarget.dataset.index == 1) {//协定处方
        wx.navigateTo({
          url: '/pages/standardMedicine/standardMedicine',
        })
      } else if (e.currentTarget.dataset.index == 2) {//业绩积分
        wx.navigateTo({
          url: '/pages/wallet/wallet',
        })
      } else if (e.currentTarget.dataset.index == 3 && this.data.personnalInfo.examineStatus == 0) {
        wx.showToast({
          title: '您已通过认证',
          icon: 'none'
        })
      } else if (e.currentTarget.dataset.index == 4) { //修改资料
        wx.navigateTo({
          url: '/pages/userchange/userchange?&doctorInfo=' + JSON.stringify(this.data.personnalInfo.doctorMsg),
        })
      } else { //关于我们

      }
    } else if (this.data.personnalInfo.examineStatus == 3) {
      if (e.currentTarget.dataset.index == 3) {
        wx.navigateTo({
          url: '/pages/userIdentify/userIdentify', //申请认证
        })
      }
    } else {
      wx.showToast({
        title: '暂无使用此功能的权限',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/doctorMainPage'
    let data = {
      phone: wx.getStorageSync('phone')
    }
    wx.hideLoading()
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        self.setData({
          personnalInfo: res.data
        })
      }
    })
    wx.removeStorageSync('obj') //移除擅长疾病
    wx.removeStorageSync('number') //移除药品副数
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
    wx.removeStorageSync('obj') //移除擅长疾病
    wx.removeStorageSync('number') //移除药品副数
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})