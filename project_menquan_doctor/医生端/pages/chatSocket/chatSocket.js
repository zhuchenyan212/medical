var utils = require("./../../utils/util.js")
var baseRequest = require("./../../utils/baseRequest.js")

Page({

  data: {
    newsList: [],
    input: null,
    openid: null,
    increase: false, //图片添加区域隐藏
    aniStyle: true, //动画效果
    pageCount: 1,
    patientImg: '', //患者头像
    doctorImg: '', //医生头像
  },

  /**
   * 图片预览
   */
  previewImg: function(e) {
    let imgSrc = e.currentTarget.dataset.imgsrc
    let self = this
    let res = self.getImgInfo(imgSrc)
    wx.previewImage({
      current: imgSrc,
      urls: self.data.imgArray
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let patientId = parseInt(options.id)
    this.setData({
      patientId: patientId
    })
    var _this = this;
    //建立连接
    wx.connectSocket({
      url: "wss://mengquan.live/webSocketServer?doctorId=doctor" + wx.getStorageSync('id') + "&patientId=patient" + patientId + '&direct=' + 0,
    })
    //连接成功
    wx.onSocketOpen(function() {
      console.log('连接成功');
    })
    wx.onSocketMessage(function(res) {
      var list = [];
      list = _this.data.newsList;
      var _data = JSON.parse(res.data);
      list.push(_data);
      _this.setData({
        newsList: list
      })
    })

    let url = wx.getStorageSync('requstURL') + 'patient/msgRecord'
    let data = {
      doctorId: wx.getStorageSync('id'),
      patientId: _this.data.patientId,
      identify: 0,
      page: _this.data.pageCount
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        let imgArray = []
        for (var index = 0; index < res.data.msgList.length; index++) {
          if (res.data.msgList[index].type == 1) {
            imgArray.push(res.data.msgList[index].msg)
          }
        }
        let currentList = res.data.msgList.concat(_this.data.newsList)
        _this.setData({
          newsList: currentList,
          imgArray: imgArray
        })
        _this.bottom()
      }
    })
  },

  increase() {
    this.setData({
      increase: true,
      aniStyle: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //患者详情页面
  changedetail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/patientInfo/patientInfo?patientID=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var self = this;
    //获取患者头像
    wx.request({
      url: 'https://mengquan.live/doctor/getWxLoc',
      data: {
        id: this.data.patientId,
        type: 1
      },
      method: 'GET',
      success: function(res) {
        if (res.data.status == 0) {
          console.log('获取患者头像成功')
          self.setData({
            patientImg: res.data.wxPic
          })
        }
      },
      fail: function() {
        console.log('请求服务器失败！')
      }
    })

    //获取医生头像
    wx.request({
      url: 'https://mengquan.live/doctor/getWxLoc',
      data: {
        id: wx.getStorageSync('id'),
        type: 0
      },
      method: 'GET',
      success: function(res) {
        if (res.data.status == 0) {
          console.log('获取医生头像成功')
          self.setData({
            doctorImg: res.data.wxPic
          })
        }
      },
      fail: function() {
        console.log('请求服务器失败！')
      }
    })
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
    this.back()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let self = this
    let count = self.data.pageCount + 1
    self.setData({
      pageCount: count
    })
    self.onLoad()
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

  },

  /**
   * 发送文本消息
   */
  send: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        increase: false
      })
    }, 500)
    let msg = {
      "doctorId": wx.getStorageSync('id'),
      "patientId": _this.data.patientId,
      "msg": _this.data.input,
      "identify": 0,
      type: 0
    }
    if (_this.data.input) {
      wx.sendSocketMessage({
        data: JSON.stringify(msg),
      })
      _this.setData({
        input: ''
      })
      this.getupdata()
    }
  },

  getupdata: function() {
    let _this = this
    //刷新页面聊天数据
    let url = wx.getStorageSync('requstURL') + 'patient/msgRecord'
    let data = {
      doctorId: wx.getStorageSync('id'),
      patientId: _this.data.patientId,
      identify: 0,
      page: _this.data.pageCount
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        let imgArray = []
        for (var index = 0; index < res.data.msgList.length; index++) {
          if (res.data.msgList[index].type == 1) {
            imgArray.push(res.data.msgList[index].msg)
          }
        }
        _this.setData({
          newsList: res.data.msgList,
          imgArray: imgArray
        })
        setTimeout(function() {
          _this.bottom()
        }, 1000)
      }
    })
  },

  bindChange: function(res) {
    this.setData({
      input: res.detail.value
    })
  },
  back: function() {
    wx.closeSocket();
    console.log('连接断开');
  },
  /**
   * 发送图片
   */
  chooseImage() {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: wx.getStorageSync('requstURL') + 'patient/saveMsg2',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function(res) {
            let uploadData = JSON.parse(res.data)
            if (res.data) {
              _this.setData({
                increase: false
              })
              // websocket.send('{"images":"' + res.data + '","date":"' + utils.formatTime(new Date()) + '","type":"image","nickName":"' + that.data.userInfo.nickName + '","avatarUrl":"' + that.data.userInfo.avatarUrl + '"}')
              let msg = {
                "doctorId": wx.getStorageSync('id'),
                "patientId": _this.data.patientId,
                "msg": uploadData.picLoc,
                "identify": 0,
                type: 1
              }
              wx.sendSocketMessage({
                data: JSON.stringify(msg),
              })
              var list = [];
              list = _this.data.newsList;
              list.push(msg);
              var imgArray = _this.data.imgArray
              imgArray.push(msg.msg)
              _this.setData({
                newsList: list,
                imgArray: imgArray,
                input: null
              })
            }
          }
        })
      }
    })
  },

  bottom: function() {
    let that = this
    var query = wx.createSelectorQuery()
    query.select('#hei').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom // #the-id节点的下边界坐标  
      })
      res[1].scrollTop // 显示区域的竖直滚动位置  
    })
  },

  getImgInfo: function(imgURL) {
    let _this = this
    wx.getSystemInfo({
      success: function(res) {
        let rate = 750 / res.windowWidth
        _this.setData({
          rate: rate
        })
        wx.getImageInfo({
          src: imgURL,
          success: function(res) {
            if (res.errMsg == 'getImageInfo:ok') {
              return res.width * _this.data.rate
            }
          }
        })
      },
    })
  }
})