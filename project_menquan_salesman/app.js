//app.js
App({
  data: {
    toolips: {
      title: '',
      hideToolips: true, //提示框先设置隐藏
    },
    loading: {
      loadingHidden: false, //loading
      content: '加载中...'
    }
  },

  onLaunch: function() {
    var that = this;
    //缓存请求根目录
    wx.setStorageSync('domain', 'https://mengquan.live/salesman');
    //获取缓存用户信息跳转首页
    if (wx.getStorageSync('third_session') != '') {
      wx.reLaunch({
        url: "/pages/person/index"
      })
    }
    //调用登陆
    that.autoLogin();
  },

  // 登录
  autoLogin: function() {
    console.log("调用登录接口")
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        console.log(code)
      }
    })
  },

  //提示框弹窗
  showMsg: function(that, title, time) {
    var _time = time || 2000
    that.setData({
      toolips: {
        hideToolips: false,
        title: title
      }
    });
    setTimeout(() => {
      that.setData({
        toolips: {
          hideToolips: true,
          title: ""
        }
      })
    }, _time);
  },

  // 提示弹窗
  showToast: function(that, content, time) {
    var _time = time || 2000
    that.setData({
      loading: {
        loadingHidden: false,
        content: content
      }
    });
    setTimeout(() => {
      that.setData({
        loading: {
          loadingHidden: true,
          content: ""
        }
      })
    }, _time);
  },

  //防止多次点击
  buttonClicked: function(that) {
    that.setData({
      buttonClicked: true
    })
    setTimeout(() => {
      that.setData({
        buttonClicked: false
      })
    }, 1000)
  }
})