//app.js
var baseRequest = require("./utils/baseRequest.js")
App({
  onLaunch: function() {
    // 展示本地存储能力
    wx.setStorageSync('socketURL', 'wss://mengquan.live/webSocketServer')
    wx.setStorageSync('requstURL', 'https://mengquan.live/')
    this.appLogin()
  },

  appLogin: function() {
    return new Promise(function(resolve, reject) {
      wx.login({
        success: res => {
          if (res.code) {
            if (wx.getStorageSync('id')) {
              wx.reLaunch({
                url: '/pages/personnal/personnal',
              })
            } else {
              let self = this
              let url = wx.getStorageSync('requstURL') + 'doctor/getOpenid'
              let data = {
                js_code: res.code
              }
              baseRequest.requestLoading(url, data, "GET").then(res => {
                if (res.errMsg == "request:ok") {
                  wx.setStorageSync('session_key', res.data.session_key)
                  if (getApp().getSessionkeyCallBack) {
                    getApp().getSessionkeyCallBack(res.data.session_key)
                  }
                  wx.reLaunch({
                    url: '/pages/authority/authority',
                  })
                }
              })
            }
          }
        }
      })
    })
  },
})