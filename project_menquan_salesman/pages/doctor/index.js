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
    address: '请选择医生所在地址',
    imageList: [],
    sex: '', //医生性别
    age: '', //医生年龄
    goodAt: '请选择医生擅长科室疾病', //擅长科室
    titleNameList: [], //默认职称选择
    hospitalType: '', //医院类型
    type: '', //医院类型传值字段
    toolips: app.data.toolips
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow: function () {
    var that = this;
    var goodAt = wx.getStorageSync('obj') // 擅长科室
    if (goodAt != '') {
      that.setData({
        goodAt: goodAt
      })
    }
    //请求默认的职称
    wx.request({
      url: 'https://mengquan.live/doctor/getTitleNameList',
      method: 'POST',
      success: function (res) {
        that.setData({
          titleNameList: res.data.titleNameList
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },

  /**
   * 医院属性选择
   */
  selecUsrSexs: function (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    let type = "userInfo.type"
    if (index == 0) {
      this.setData({
        selectedIndexs: index,
        [type]: 1
      })
    } else {
      this.setData({
        selectedIndexs: index,
        [type]: 0
      })
    }
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
          url: 'https://mengquan.live/salesman/salesmanUpdatePic',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            type: 1,
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

  //选择地址
  bindaddressChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      address: e.detail.value,
      addresschange: true
    })
  },

  //选择科室
  choosekeshi: function () {
    // 选择科室
    wx.navigateTo({
      url: '../doctor/chooseillness',
    })
  },

  //选择职称
  selectLevel: function (e) {
    let level = "userInfo.level"
    this.setData({
      titleNameListIndex: parseInt(e.detail.value),
      [level]: this.data.titleNameList[parseInt(e.detail.value)]
    })
  },

  //添加医生信息
  saveDoctorInfo: function (e) {
    var that = this,
      docInfo = e.detail.value;
    var user = wx.getStorageSync('third_session')
    var sex = that.data.sex;
    var goodAt = wx.getStorageSync('obj') // 擅长科室
    if (this.data.hospitalType == "公立") {
      this.setData({
        type: 0
      })
    } else {
      this.setData({
        type: 1
      })
    }
    if (docInfo.docName != '' && docInfo.age != '' && sex != '' && docInfo.phone != '' && docInfo.hospital != '' && that.data.userInfo.level.title_name != '' && docInfo.address[0] + docInfo.address[1] + docInfo.address[2] != NaN && goodAt != '请选择医生擅长科室疾病') {
      $.post('/doctorApply', {
        'salesmanId': user.id,
        'name': docInfo.docName,
        'age': docInfo.age,
        'sex': sex,
        'phone': docInfo.phone,
        'hospitalNane': docInfo.hospital,
        'type': this.data.type,
        'title': that.data.userInfo.level.title_name,
        'address': docInfo.address[0] + docInfo.address[1] + docInfo.address[2],
        'goodAt': goodAt,
        'imgHttp': that.data.imageList[0]
      }, (err, res) => {
        if (res.data.status == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(() => {
            // 清除擅长科室缓存
            wx.removeStorage({
              key: 'obj',
              success: function (res) {
                console.log("数据key删除成功")
              },
            })
            wx.navigateBack()
          }, 1500)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      app.showMsg(that, '请填写完整的医生信息');
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 获取到用户离开选择擅长科室页面
    wx.removeStorage({
      key: 'obj',
      success: function (res) {
        console.log("数据key删除成功")
      },
    })
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