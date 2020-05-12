var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    userInfo: '', //患者信息
    imageList: [],
    toolips: app.data.toolips
  },

  onLoad: function () {
    if (!wx.getStorageSync('sex')) {
      wx.showModal({
        title: '提示',
        content: '是否立即完善资料？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../person/Edit',
            })
          }
        }
      })
    }
  },

  onShow: function () {
    var that = this;
    //请求患者中心
    $.post('/patientIndex', {
      'id': wx.getStorageSync('id')
    }, (err, res) => {
      //缓存患者的openid
      wx.setStorageSync('openid', res.data.openid)
      //是否打开审核页面
      wx.setStorageSync('or', res.data.content)
      if (res.data.status == 0) {
        that.setData({
          imageList: [res.data.wxLoc], //用户默认头像
          userInfo: res.data
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //添加图片
  chooseImage: function () {
    var that = this;
    var id = wx.getStorageSync('id')
    wx.chooseImage({
      count: 1,
      sizeType: ['orignal', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://mengquan.live/salesman/updatePic',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            type: 2,
            id: id,
          },
          success: function (res) {
            var obj = JSON.parse(res.data)
            console.log(res.data)
            that.setData({
              imageList: [obj.picLoc] //用户头像
            })
          },
          fail: function () {
            console.log("fail");
          }
        });
      },
      fail: function () {
        console.log("fail");
      },
      complete: function () {
        console.log("complete");
      }
    })
  },

  //编辑个人资料
  navigatorToEditPerson: function () {
    wx.navigateTo({
      url: '../person/Edit',
    })
  },

  //就诊人管理
  navigatorTojiuzheng: function () {
    wx.navigateTo({
      url: '../patient/index',
    })
  },

  //地址管理
  navigatorToaddress: function () {
    wx.navigateTo({
      url: '../address/index',
    })
  },

  //我的医生
  navigatorTodoctor: function () {
    wx.navigateTo({
      url: '../doctor/index',
    })
  },

  //我的处方
  navigatorTorecipe: function () {
    wx.navigateTo({
      url: '../recipe/index',
    })
  },

  // 关于我们
  addTo: function () {
    wx.navigateTo({
      url: '../about/index',
    })
  },

  //拍方抓药
  navigatorToPhoto: function () {
    wx.navigateTo({
      url: '../photo/index',
    })
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