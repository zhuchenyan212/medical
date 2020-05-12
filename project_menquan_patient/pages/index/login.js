Page({

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取缓存用户信息跳转首页
    if (wx.getStorageSync('id') != '') {
      wx.reLaunch({
        url: "/pages/person/index"
      })
    }
  },

  // 获取用户信息 登录
  getInfo: function() {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //请求服务器
          wx.request({
            url: 'https://mengquan.live/patient/getOpenid',
            data: {
              js_code: res.code
            },
            method: 'GET',
            success: function(res) {
              console.log('=====获取到用户的openid========');
              if (res.data.openid) {
                //请求服务器
                wx.request({
                  url: 'https://mengquan.live/patient/insertPatient',
                  data: {
                    openid: res.data.openid
                  },
                  method: 'GET',
                  success: function(res) {
                    console.log('=======根据openid获取患者id======');
                    // 缓存后台返回的用户信息
                    wx.setStorageSync('id', res.data.id);
                    wx.reLaunch({
                      url: "/pages/person/index"
                    })
                  },
                  fail: function() {
                    console.log("请求服务器失败！")
                  }
                })
              } else {
                console.log('未获取到用户的openid')
              }
            },
            fail: function() {
              console.log("请求服务器失败！")
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
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