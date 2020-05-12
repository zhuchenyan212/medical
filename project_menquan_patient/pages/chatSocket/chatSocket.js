  var app = getApp();
  var $ = require("../../utils/https.js");
  var utils = require("./../../utils/util.js")

  Page({
    data: {
      date: '', //显示当前聊天时间
      msgList: [], //查询历史聊天记录
      patientImg: '', //患者头像
      doctorImg: '', //医生头像
      newsList: [], //聊天记录
      input: null,
      doctorId:'', //医生id
      increase: false, //图片添加区域隐藏
      aniStyle: true, //动画效果
      pageNo: 1, //历史聊天记录页数
      toolips: app.data.toolips
    },

    onLoad: function(options) {
      var _this = this;
      var patientId = wx.getStorageSync('id')
      var doctorId = wx.getStorageSync('doctorId')
      _this.setData({
        doctorId:wx.getStorageSync('doctorId')
      })
      //建立连接
      wx.connectSocket({
        url: "wss://mengquan.live/webSocketServer?doctorId=doctor" + doctorId + "&patientId=patient" + patientId + '&direct=' + 1,
      })

      //连接成功
      wx.onSocketOpen(function() {
        console.log('连接成功');
      })

      //获取聊天信息
      wx.onSocketMessage(function(res) {
        var list = [];
        list = _this.data.newsList;
        var _data = JSON.parse(res.data);
        list.push(_data);
        _this.setData({
          newsList: list
        })
      })

      //标记历史消息为已读
      wx.request({
        url: 'https://mengquan.live/patient/setRead',
        data: {
          doctorId: doctorId,
          patientId: patientId,
          identify: 1
        },
        method: 'GET',
        success: function(res) {
          console.log('标记已读成功')
        },
        fail: function() {
          app.showMsg(that, '请求服务器失败！')
        }
      })
    },

    increase() {
      this.setData({
        increase: true,
        aniStyle: true
      })
    },

    // 获取信息
    onShow: function() {
      var that = this,
        pageNo = that.data.pageNo;
      var doctorId = wx.getStorageSync('doctorId') //医生id
      var id = wx.getStorageSync('id') //患者id

      //获取患者头像
      wx.request({
        url: 'https://mengquan.live/doctor/getWxLoc',
        data: {
          id: wx.getStorageSync('id'),
          type: 1
        },
        method: 'GET',
        success: function(res) {
          if (res.data.status == 0) {
            console.log('获取患者头像成功')
            that.setData({
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
          id: wx.getStorageSync('doctorId'),
          type: 0
        },
        method: 'GET',
        success: function(res) {
          if (res.data.status == 0) {
            console.log('获取医生头像成功')
            that.setData({
              doctorImg: res.data.wxPic
            })
          }
        },
        fail: function() {
          console.log('请求服务器失败！')
        }
      })

      //获取第一页历史聊天记录
      that.getHistoryData(pageNo);
    },

    //请求历史聊天信息
    getHistoryData: function(pageNo, msgList) {
      var that = this;
      var doctorId = wx.getStorageSync('doctorId') //医生id
      var patientId = wx.getStorageSync('id') //患者id
      var list = [];
      var height = wx.getSystemInfoSync().windowHeight; // 获取当前窗口的高度
      //查询历史聊天记录
      wx.request({
        url: 'https://mengquan.live/patient/msgRecord',
        data: {
          doctorId: doctorId,
          patientId: patientId,
          identify: 1,
          page: pageNo
        },
        method: 'GET',
        success: function(res) {
          if (res.data.status == 0) {
            console.log('获取历史聊天记录成功')
            let list = res.data.msgList.concat(that.data.msgList)
            that.setData({
              pageNo: pageNo + 1,
              msgList: list
            })
          }
        },
        fail: function() {
          app.showMsg(this, '请求服务器失败！')
        }
      })
    },

    //发送消息
    send: function() {
      var _this = this;
      setTimeout(function() {
        _this.setData({
          increase: false
        })
      }, 500)
      var patientId = wx.getStorageSync('id')
      var doctorId = wx.getStorageSync('doctorId')
      let msg = {
        "doctorId": doctorId,
        "patientId": patientId,
        "msg": _this.data.input,
        "identify": 1,
        type: 0
      }
      if (_this.data.input) {
        wx.sendSocketMessage({
          data: JSON.stringify(msg),
        })
        var list = [];
        list = this.data.newsList;
        var temp = {
          'message': _this.data.input,
          "identify": 1,
          type: 0
        };
        list.push(temp);
        this.setData({
          newsList: list,
          input: null
        })
      }
      //获取发送时间
      if (utils.formatTime(new Date())) {
        _this.setData({
          date: utils.formatTime(new Date()),
        })
      }
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

    //发送图片
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
            url: 'https://mengquan.live/patient/saveMsg2',
            filePath: tempFilePaths[0],
            name: 'file',
            success: function(res) {
              let uploadData = JSON.parse(res.data)
              if (res.data) {
                _this.setData({
                  increase: false
                })
                let msg = {
                  "doctorId": wx.getStorageSync('doctorId'),
                  "patientId": wx.getStorageSync('id'),
                  "msg": uploadData.picLoc,
                  "identify": 1,
                  type: 1
                }
                wx.sendSocketMessage({
                  data: JSON.stringify(msg),
                })
                var list = [];
                list = _this.data.newsList;
                var temp = {
                  "img": uploadData.picLoc,
                  "identify": 1,
                  type: 1
                };
                list.push(temp);
                _this.setData({
                  newsList: list
                })
                //获取发送时间
                if (utils.formatTime(new Date())) {
                  _this.setData({
                    date: utils.formatTime(new Date()),
                  })
                }
              }
              if (JSON.parse(res.data).status == 0) {
                console.log('刷新当前页面')
                //刷新当前页面的数据
              }
            }
          })
        }
      })
    },

    // 历史聊天记录图片预览
    previewImageHis: function(e) {
      var that = this;
      var list = [];
      for (var i = 0; i < that.data.msgList.length; i++) {
        if (that.data.msgList[i].type == 1) {
          if (that.data.msgList[i].msg == e.target.dataset.src) {
            list.push(that.data.msgList[i].msg)
          }
        }
      }
      wx.previewImage({
        urls: list,
        current: e.target.dataset.src
      })
    },

    // 下拉刷新
    onPullDownRefresh: function(e) {
      wx.showNavigationBarLoading() //在标题栏中显示加载

      var that = this,
        pageNo = this.data.pageNo, //当前的页码
        msgList = this.data.msgList;

      setTimeout(function() {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.getHistoryData(pageNo, msgList); //重新请求数据
      }, 1500);
    },

    onUnload: function() {
    },

    onHide: function() {
    }

  })