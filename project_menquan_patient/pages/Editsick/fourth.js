var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    id: '', //信息id
    file: [],
    imageList: [], //患者照片
    file1: [],
    imageList1: [], //患处照片
    patientId: '', //就诊人id
    patientInfo: '', //就诊人信息
    step1: '', //特殊情况
    step1: '', //基本情况
    step1: '', //二便情况
    buttonClicked: false,
    hide: true,//是否打开支付弹窗
    registId: '', //咨询参数
    docName: ' ', //医生姓名
    money: ' ', //支付金额
    toolips: app.data.toolips
  },

  onLoad: function (options) {
    var that = this;
    if (options.id != undefined) {
      var patientInfo = JSON.parse(options.patientInfo)
      console.log(patientInfo) //就诊人信息
      this.setData({
        hide: true,
        patientInfo: patientInfo,
        patientId: options.id, //就诊人patientId
        docName: wx.getStorageSync('docName'), //医生姓名
        money: wx.getStorageSync('money'), //支付金额
      })
    }
  },

  // 获取患者填写信息
  onShow: function () {
    $.post('/selectTempInterrogationForm', {
      'id': wx.getStorageSync('id'),
    }, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          step1: res.data.step1,
          step2: res.data.step2,
          step3: res.data.step3,
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //选择就诊人列表
  navigator: function () {
    wx.redirectTo({
      url: '../Editsick/myCustomer'
    })
  },

  //添加图片
  chooseImage: function () {
    var that = this;
    if (that.data.imageList.length > 2) {
      app.showMsg(that, '患者照片上传仅限三张')
    } else {
      wx.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        count: 3,
        success: function (res) {
          var file = that.data.imageList;
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            file.push(res.tempFilePaths[i]);
          }
          that.setData({
            imageList: file
          })
        }
      })
    }
  },

  //添加图片
  chooseImage1: function () {
    var that = this;
    if (that.data.imageList1.length > 2) {
      app.showMsg(that, '患处照片上传仅限三张')
    } else {
      wx.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        count: 3,
        success: function (res) {
          var file1 = that.data.imageList1;
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            file1.push(res.tempFilePaths[i]);
          }
          that.setData({
            imageList1: file1
          })
        }
      })
    }
  },

  //提交信息
  saveAll: function (e) {
    var that = this;
    var Info = e.detail.value
    var id = that.data.id //信息id
    if (that.data.patientId != '' && Info.chief != '' && that.data.imageList.length != 0) {
      app.buttonClicked(that);
      // 保存问诊单信息
      $.post('/interrogationForm', {
        'patientId': wx.getStorageSync('id'),
        'specialCase': that.data.step1,
        'basicCase': that.data.step2,
        'towCase': that.data.step3,
        'id': that.data.patientId,
        'mainComplain': Info.chief,
        'doctorId': wx.getStorageSync('doctorId'),
      }, (err, res) => {
        that.setData({
          id: res.data.fromId //信息id
        })
        if (res.data.status == 0) {
          if (that.data.imageList.length > 0) {
            //上传患者照片
            for (var i = 0; i < that.data.imageList.length; i++) {
              wx.uploadFile({
                url: 'https://mengquan.live/patient/interrogationFormPatientPic',
                filePath: that.data.imageList[i],
                name: 'file',
                formData: {
                  id: that.data.id, //信息id
                },
                success: function (res) {
                  console.log('ok')
                },
                fail: function () {
                  console.log("fail");
                }
              });
            }
          }
          if (that.data.imageList1.length > 0) {
            //上传患处照片
            for (var i = 0; i < that.data.imageList1.length; i++) {
              wx.uploadFile({
                url: 'https://mengquan.live/patient/interrogationFormDiseasePic',
                filePath: that.data.imageList1[i],
                name: 'file',
                formData: {
                  id: that.data.id, //信息id
                },
                success: function (res) {
                  console.log('ok')
                },
                fail: function () {
                  console.log("fail");
                }
              });
            }
          }
          //立即咨询
          setTimeout(() => {
            $.post('/zixunNow', {
              'patientId': wx.getStorageSync('id'),
              'doctorId': wx.getStorageSync('doctorId'),
              'money': wx.getStorageSync('money'),
              'doctorName': wx.getStorageSync('docName')
            }, (err, res) => {
              if (res.data.status == 0) {
                //立即咨询后弹窗支付
                this.setData({
                  registId: res.data.registId //咨询参数
                })
                if (wx.getStorageSync('money') == 0) { //如果支付金额为0默认已经支付
                  $.post('/addScore ', { //支付回调
                    'orderId': res.data.registId,
                    'doctorId': wx.getStorageSync('doctorId'),
                    'money': wx.getStorageSync('money')
                  }, (err, res) => {
                    //支付成功跳转
                    wx.navigateTo({
                      url: '../chatSocket/chatSocket',
                    })
                  })
                } else {
                  //立即咨询后弹窗支付
                  this.setData({
                    hide: false
                  })
                }
              } else {
                app.showMsg(that, '请求异常请稍后');
              }
            })
          }, 500);
        } else {
          app.showMsg(that, '请求异常请稍后！')
        }
      })
    } else {
      app.showMsg(that, '请将就诊单填写完整')
    }
  },

  //返回上一步
  backFor: function () {
    wx.redirectTo({
      url: '../Editsick/third',
    })
  },

  //取消支付
  backpack: function () {
    wx.showToast({
      title: '您取消了操作',
    })
    this.setData({
      hide: true
    })
    //回到首页
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  //确认支付
  surePay: function () {
    console.log('选择支付')
    var that = this;
    var money = that.data.money //支付金额
    var registId = that.data.registId
    // 支付
    wx.request({
      url: 'https://mengquan.live/weixin/pay',
      data: {
        openid: wx.getStorageSync('openid'),
        orderId: registId,
        money: money
      },
      method: 'GET',
      success: function (res) {
        var payResult = res.data;
        if (res.statusCode == 200) {
          wx.requestPayment({
            'appid': payResult.appid,
            'timeStamp': payResult.timeStamp,
            'nonceStr': payResult.nonceStr,
            'package': payResult.package,
            'paySign': payResult.paySign,
            'signType': payResult.signType,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              $.post('/addScore ', { //支付回调
                'orderId': registId,
                'doctorId': wx.getStorageSync('doctorId'),
                'money': money
              }, (err, res) => {
                // 支付成功跳转
                wx.navigateTo({
                  url: '../chatSocket/chatSocket',
                })
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000
              })
              //关闭弹窗
              that.setData({
                hide: true
              })
              //支付失败跳转首页
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        } else {
          app.showMsg(this, '请求异常请稍后');
        }
      },
      fail: function () {
        app.showMsg(that, '请求服务器失败！')
      }
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
    // 用户提交问诊单离开当前页面清除缓存
    setTimeout(() => {
      $.post('/clearTempInterrogationForm', {
        'id': wx.getStorageSync('id'),
      }, (err, res) => {
        if (res.data.status == 0) {
          console.log('第四步清除页面缓存成功')
        } else {
          app.showMsg(that, '清除缓存异常');
        }
      })
    }, 1000);
  }
})