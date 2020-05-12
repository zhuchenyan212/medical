var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    file: [],
    imageList: [],
    toolips: app.data.toolips
  },

  //上传图片
  chooseImage: function() {
    var that = this;
    if (that.data.imageList.length > 3) {
      app.showMsg(that, '处方照片上传仅限四张')
    } else {
      wx.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        count: 3,
        success: function(res) {
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

  //上传拍方抓药信息
  attrInfoMessage: function(e) {
    var that = this,
      Info = e.detail.value;
    var id = wx.getStorageSync('id')
    if (Info.name != '' && Info.phone != '' && Info.num != '' && Info.note != '') {
      $.post('/shotPicMsg', {
        'id': id,
        'name': Info.name,
        'num': Info.num,
        'note': Info.note,
        'phone': Info.phone,
      }, (err, res) => {
        if (res.data.status == 0) {
          //请求照片上传的接口
          if (that.data.imageList.length > 0) {
            for (var i = 0; i < that.data.imageList.length; i++) {
              wx.uploadFile({
                url: 'https://mengquan.live/patient/shotPic',
                filePath: that.data.imageList[i],
                name: 'file',
                formData: {
                  insertId: res.data.insertId,
                },
                success: function(res) {
                  var data = JSON.parse(res.data)
                  if (data.status == 0) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //返回个人中心
                    setTimeout(() => {
                      wx.switchTab({
                        url: '/pages/person/index',
                      })
                    }, 1000);
                  }
                },
                fail: function() {
                  console.log("fail");
                }
              });
            }
          } else {
            app.showMsg(that, '请上传处方照片')
          }
        } else {
          app.showMsg(that, '请求异常请稍后！')
        }
      })
    } else {
      app.showMsg(that, '请填写完整的病人信息');
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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