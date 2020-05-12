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
    age: '请选择出生年月',
    address: '请选择地址',
    time: '请选择年龄',
    file: [],
    imageList: [],
    id: ' ',
    patientInfo: ' ',
    toolips: app.data.toolips
  },

  //获取就诊人信息 //展示就诊人信息
  onLoad: function(options) {
    var that = this;
    var patientInfo = JSON.parse(options.patientInfo)
    that.setData({
      id: options.id,
      patientInfo: patientInfo,
      username: patientInfo.name,
      sex: patientInfo.sex,
      age: patientInfo.age,
      height: patientInfo.height,
      weight: patientInfo.weight,
      phone: patientInfo.phone,
      address: patientInfo.address,
      sickness: patientInfo.medicalHistory,
      description: patientInfo.description
    })
    // 显示默认性别
    // for (var i = 0; i < that.data.radioList.length; i++) {
    //   let state = 'radioList[' + i + '].state'
    //   let checked = 'radioList[' + i + '].checked'
    //   if (that.data.radioList[i].name == patientInfo.sex) {
    //     that.setData({
    //       [state]: true,
    //       [checked]: true
    //     })
    //   } else {
    //     that.setData({
    //       [state]: false,
    //       [checked]: false
    //     })
    //   }
    // }
  },

  //选择性别
  bindSelect: function(e) {
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
  bindTimeChange: function(e) {
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
  bindaddressChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      address: e.detail.value,
      addresschange: true
    })
  },

  //添加图片
  chooseImage: function() {
    var that = this;
    if (that.data.imageList.length > 2) {
      app.showMsg(that, '就诊人照片上传仅限三张')
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

  //编辑就诊人
  addsickInfo: function(e) {
    var that = this,
      sickInfo = e.detail.value;
    var id = that.data.id;
    var sex = that.data.sex;
    if (sickInfo.username != '' && sickInfo.phone != '') {
      // 用户没有修改选中地址
      if (sickInfo.address[0] == undefined) {
        $.post('/sureEditPatientPatient', {
          'id': id,
          'name': sickInfo.username,
          'sex': sex,
          'age': sickInfo.age,
          'weight': sickInfo.weight,
          'height': sickInfo.height,
          'phone': sickInfo.phone,
          'address': that.data.address,
          'medicalHistory': sickInfo.sickness,
          'description': sickInfo.description,
        }, (err, res) => {
          if (res.data.status == 0) {
            //请求照片上传的接口
            for (var i = 0; i < that.data.imageList.length; i++) {
              wx.uploadFile({
                url: 'https://mengquan.live/patient/sureEditPatientPatientPic',
                filePath: that.data.imageList[i],
                name: 'file',
                formData: {
                  id: id,
                },
                success: function(res) {
                  var data = JSON.parse(res.data)
                  if (data.status == 0) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //返回就诊人列表
                    setTimeout(() => {
                      wx.navigateTo({
                        url: '../patient/index',
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
            app.showMsg(that, '请求异常请稍后！')
          }
        })
      } else {
        // 用户修改选中地址
        $.post('/sureEditPatientPatient', {
          'id': id,
          'name': sickInfo.username,
          'sex': sex,
          'age': sickInfo.age,
          'weight': sickInfo.weight,
          'height': sickInfo.height,
          'phone': sickInfo.phone,
          'address': sickInfo.address[0] + sickInfo.address[1] + sickInfo.address[2],
          'medicalHistory': sickInfo.sickness,
          'description': sickInfo.description,
        }, (err, res) => {
          if (res.data.status == 0) {
            //请求照片上传的接口
            for (var i = 0; i < that.data.imageList.length; i++) {
              wx.uploadFile({
                url: 'https://mengquan.live/patient/sureEditPatientPatientPic',
                filePath: that.data.imageList[i],
                name: 'file',
                formData: {
                  id: id,
                },
                success: function(res) {
                  var data = JSON.parse(res.data)
                  if (data.status == 0) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //返回就诊人列表
                    setTimeout(() => {
                      wx.navigateTo({
                        url: '../patient/index',
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
            app.showMsg(that, '请求异常请稍后！')
          }
        })
      }
    } else {
      app.showMsg(that, '请填写完整的病人信息');
    }
  }

})