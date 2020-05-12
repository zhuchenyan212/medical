//app.js
App({
  data: {
    toolips: {
      title: '',
      hideToolips: true, //提示框先设置隐藏
    }
  },

  onLaunch: function() {
    var that = this;
    //缓存请求根目录
    wx.setStorageSync('domain', 'https://mengquan.live/patient');

    //获取缓存用户信息跳转首页
    console.log(wx.getStorageSync('id'))
    if (wx.getStorageSync('id') != '') {
      wx.reLaunch({
        url: "/pages/person/index"
      })
    }else{
      wx.reLaunch({
        url: "/pages/index/login"
      })
    }
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
    }, 3000)
  }
})