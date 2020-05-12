var app = getApp();
var $ = require("../../utils/https.js");

Page({

  data: {
    radioList: [{
      "name": "男",
      "state": "true",
      "checked": ''
    },
    {
      "name": "女",
      "state": "false"
    }
    ],
    radioLists: [{
      "name": "公立",
      "state": "true",
      "checked": ''
    },
    {
      "name": "私立",
      "state": "false"
    }
    ],
    sex: '',
    birthday: '请选择出生日期',
    address: '请选择地址',
    imageList: [],
    hospital: '请输入您所服务的医院',
    hospitalType: '', //医院类型
    type: '', //医院类型传值字段
    toolips: app.data.toolips
  },

  //回显患者信息 + 医院可选
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('third_session')
    if (user.wxLoc != '' && user.name != '' && user.sex != '' && user.birthday != '' && user.phone != '' && user.phone != '' && user.hospital != '' && user.address != '') {
      that.setData({
        imageList: [user.wxLoc], //用户默认头像
        username: user.name,
        sex: user.sex,
        birthday: user.birthday,
        phone: user.phone,
        hospital: user.hospital,
        address: user.address
      })
    }

    //请求医院信息
    $.post('/hospitalList', {}, (err, res) => {
      if (res.data.status == 0) {
        this.setData({
          hospitalList: res.data.hospitalList //用户默认选择医院
        })
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //添加图片
  chooseImage: function () {
    var that = this;
    var user = wx.getStorageSync('third_session')
    wx.chooseImage({
      count: 1,
      sizeType: ['orignal', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://mengquan.live/salesman/updatePic',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            type: 0,
            id: user.id,
          },
          success: function (res) {
            var obj = JSON.parse(res.data)
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

  //选择性别
  bindSelect: function (e) {
    var that = this,
      items = that.data.radioList,
      state = e.detail.value;
    for (let i = 0, len = items.length; i < len; i++) {
      items[i].checked = items[i].state == state
    }
    for (let j = 0, len = items.length; j < len; j++) {
      if (items[j].checked == true) {
        this.setData({
          sex: items[j].name
        })
      }
    }
    that.setData({
      radioList: items
    })
  },

  //选择医院类型
  bindSelects: function (e) {
    var that = this,
      items = that.data.radioLists,
      state = e.detail.value;
    for (let i = 0, len = items.length; i < len; i++) {
      items[i].checked = items[i].state == state
    }
    for (let j = 0, len = items.length; j < len; j++) {
      if (items[j].checked == true) {
        this.setData({
          sex: items[j].name
        })
      }
    }
    that.setData({
      radioLists: items
    })
    console.log(items)
    for (let i in items) {
      if (items[i].checked == true) {
        this.setData({
          hospitalType: items[i].name,
        })
      }
    }
  },

  //选择生日
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value,
      datechange: true
    })
  },

  //选择地址
  bindaddressChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      address: e.detail.value,
      addresschange: true
    })
  },

  //保存个人资料
  saveUserInfo: function (e) {
    var that = this,
      userInfo = e.detail.value;
    var user = wx.getStorageSync('third_session')
    var sex = this.data.sex;
    if (this.data.hospitalType == "公立") {
      this.setData({
        type: 0
      })
    } else {
      this.setData({
        type: 1
      })
    }
    // 个人资料必填
    if (userInfo.username != '' && sex != '' && userInfo.birthday != '请选择出生日期' && userInfo.phone != '' && userInfo.hospital != '') {
      if (userInfo.address[0] == undefined) {
        console.log('用户没有修改地址')
        $.post('/updateSalesmanMsg', {
          'id': user.id,
          'name': userInfo.username,
          'sex': sex,
          'birthday': userInfo.birthday,
          'phone': userInfo.phone,
          'location': that.data.address,
          'type': this.data.type,
          'hospitalName': userInfo.hospital,
        }, (err, res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
            //保存成功后请求接口更新缓存的个人信息
            $.post('/salesmanIndex', {
              'id': user.id
            }, (err, res) => {
              if (res.data.status == 0) {
                //更新用户信息
                wx.setStorageSync('third_session', res.data.salesman);
              } else {
                app.showMsg(that, '请求异常请稍后');
              }
            })
            //保存个人信息成功回到个人中心
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              title: '保存失败,请稍后',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        console.log('用户修改了地址')
        $.post('/updateSalesmanMsg', {
          'id': user.id,
          'name': userInfo.username,
          'sex': sex,
          'birthday': userInfo.birthday,
          'phone': userInfo.phone,
          'type': this.data.type,
          'location': userInfo.address[0] + userInfo.address[1] + userInfo.address[2],
          'hospitalName': userInfo.hospital,
        }, (err, res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
            //保存成功后请求接口更新缓存的个人信息
            $.post('/salesmanIndex', {
              'id': user.id
            }, (err, res) => {
              if (res.data.status == 0) {
                //更新用户信息
                wx.setStorageSync('third_session', res.data.salesman);
              } else {
                app.showMsg(that, '请求异常请稍后');
              }
            })
            //保存个人信息成功回到个人中心
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              title: '保存失败,请稍后',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    } else {
      app.showMsg(that, '请填写完整的个人信息');
    }
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