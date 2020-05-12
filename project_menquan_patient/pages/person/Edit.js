var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    userInfo: '', //患者信息
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
    address: '请选择地址',
    age: '请选择出生年月',
    userInfos: '', //用户信息
    username: '',
    sex: '',
    phone: '',
    address: '',
    sickness: '',
    description: '',
    addresschange: false,
    toolips: app.data.toolips
  },

  onShow: function () {
    var that = this; //显示信息
    //请求患者个人信息
    $.post('/patientIndex', {
      'id': wx.getStorageSync('id')
    }, (err, res) => {
      if (res.data.status == 0) {
        // 回显患者基本信息
        this.setData({
          userInfos: res.data,
          username: res.data.name,
          sex: res.data.sex,
          age: res.data.age,
          height: res.data.height,
          weight: res.data.weight,
          phone: res.data.phone,
          address: res.data.address,
          sickness: res.data.medicalHistory,
          description: res.data.description
        })
        // 显示默认性别
      } else {
        app.showMsg(this, '请求异常请稍后');
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
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i].checked == true) {
        this.setData({
          sex: items[i].name
        })
      }
    }
    that.setData({
      radioList: items
    })
  },

  // 选择年龄
  bindTimeChange: function (e) {
    // 选择的时间
    var sel_time = e.detail.value
    //获取当前时间
    var newdate = new Date(); //今天
    var mybirthday = new Date(sel_time); //出生日期
    var age = newdate.getTime() - mybirthday.getTime();
    //向下取整   获取年龄
    var real_age = Math.floor(age / 1000 / 60 / 60 / 24 / 365);
    this.setData({
      age: real_age
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

  saveUserInfo: function (e) {
    var that = this,
      userInfo = e.detail.value;
    var id = wx.getStorageSync('id')
    var sex = that.data.sex;
    if (userInfo.username != '' && userInfo.age != '请选择出生年月' && sex != '' && userInfo.phone != '' && userInfo.height != '' && userInfo.weight != '') {
      if (userInfo.address[0] == undefined) {
        console.log('用户没有修改地址')
        $.post('/editPatientMsg', {
          'id': id,
          'name': userInfo.username,
          'sex': sex,
          'age': userInfo.age,
          'weight': userInfo.weight,
          'height': userInfo.height,
          'phone': userInfo.phone,
          'address': that.data.address,
          'medicalHistory': userInfo.sickness,
          'description': userInfo.description,
        }, (err, res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(() => {
              wx.setStorageSync('sex', sex)
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              title: '保存失败,请稍后',
              icon: 'fail',
              duration: 2000
            })
          }
        })
      } else {
        console.log('用户修改了地址')
        $.post('/editPatientMsg', {
          'id': id,
          'name': userInfo.username,
          'sex': sex,
          'age': userInfo.age,
          'weight': userInfo.weight,
          'height': userInfo.height,
          'phone': userInfo.phone,
          'address': userInfo.address[0] + userInfo.address[1] + userInfo.address[2],
          'medicalHistory': userInfo.sickness,
          'description': userInfo.description,
        }, (err, res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(() => {
              wx.setStorageSync('sex', sex)
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              title: '保存失败,请稍后',
              icon: 'fail',
              duration: 2000
            })
          }
        })
      }
    } else {
      app.showMsg(that, '请填写完整的病人信息');
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