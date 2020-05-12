var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {},
  /**
   * 上传本地图片
   */
  choseImg: function() {
    let _this = this
    wx.chooseImage({
      success: function(res) {
        let filePath = res.tempFilePaths[0]
        _this.setData({
          img: res.tempFilePaths[0],
          tempFIle: res.tempFilePaths
        })
      },
    })
  },
  /**
   * 姓名
   */
  inputName: function(e) {
    let data = e.detail.value
    let name = "userInfo.name"
    this.setData({
      [name]: data
    })
  },

  /**
   * 年龄
   */
  inputAge: function(e) {
    let data1 = e.detail.value
    let age = "userInfo.age"
    this.setData({
      [age]: data1
    })
  },
  /**
   * 性别选择
   */
  selecUsrSex: function(e) {
    let index = parseInt(e.currentTarget.dataset.index)
    let sex = "userInfo.sex"
    if (index == 0) {
      this.setData({
        selectedIndex: index,
        [sex]: "男"
      })
    } else {
      this.setData({
        selectedIndex: index,
        [sex]: "女"
      })
    }
  },
  /**
   * 医院属性选择
   */
  selecUsrSexs: function(e) {
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
  /**
   * 电话
   */
  inputPhone: function(e) {
    let data2 = e.detail.value
    let phone = "userInfo.phone"
    this.setData({
      [phone]: data2
    })
  },
  //出诊费用
  inputfee: function(e) {
    let data3 = e.detail.value
    let fee = "userInfo.fee"
    this.setData({
      [fee]: data3
    })
  },
  //出诊时间
  inputworkTime: function(e) {
    let data4 = e.detail.value
    let workTime = "userInfo.workTime"
    this.setData({
      [workTime]: data4
    })
  },
  //简介
  inputdetail: function(e) {
    let data5 = e.detail.value
    let detail = "userInfo.detail"
    this.setData({
      [detail]: data5
    })
  },
  //医院
  inputHospital: function(e) {
    let data6 = e.detail.value
    let hospital = "userInfo.hospital"
    this.setData({
      [hospital]: data6
    })
  },
  /**
   * 职称
   */
  selectLevel: function(e) {
    let title = 'userInfo.title'
    let level = "userInfo.level"
    this.setData({
      [title]: '',
      titleNameListIndex: parseInt(e.detail.value),
      [level]: this.data.titleNameList[parseInt(e.detail.value)]
    })
  },
  /**
   * 地址
   */
  inputAddress: function(e) {
    let data7 = e.detail.value
    let address = "userInfo.address"
    this.setData({
      [address]: data7
    })
  },
  /**
   * 业务人员
   */
  searchBusinessPeople: function() {
    wx.navigateTo({
      url: '/pages/searchBusinessPeople/searchBusinessPeople',
    })
  },
  /**
   * 擅长治疗
   */
  selectSkills: function() {
    wx.navigateTo({
      url: '/pages/choseDisease/choseDisease',
    })
  },
  /**
   * 提交医生信息
   */
  applyInfo: function() {
    wx.showLoading({
      title: '提交资料...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/updateDoctorMsg'
    if (this.data.titleNameListIndex != undefined) {
      let data = {
        'doctorId': wx.getStorageSync('id'),
        'name': self.data.userInfo.name,
        'age': self.data.userInfo.age,
        'sex': self.data.userInfo.sex,
        'phone': self.data.userInfo.phone,
        'fee': self.data.userInfo.fee,
        'workTime': self.data.userInfo.workTime,
        'hospitalNmae': self.data.userInfo.hospital,
        'hospitaType': self.data.userInfo.type,
        'title': self.data.userInfo.level.title_name,
        'detail': self.data.userInfo.detail,
        'address': self.data.userInfo.address,
        'goodAt': self.data.userInfo.goodAt,
      }
      wx.hideLoading()
      baseRequest.requestLoading(url, data, "GET").then(res => { //上传医生文本资料
        if (res.data.status == 0) {
          wx.setStorageSync('phone', self.data.userInfo.phone)
          wx.switchTab({
            url: '../personnal/personnal',
          })
          wx.uploadFile({
            url: wx.getStorageSync('requstURL') + 'doctor/doctorApplyPic',
            filePath: self.data.tempFIle[0],
            name: 'file',
            formData: {
              'doctorId': wx.getStorageSync('id')
            },
            success: function(e) {
              if (e.errMsg == "uploadFile:ok") {
                wx.switchTab({
                  url: '../personnal/personnal',
                })
              }
            }
          })
        }
      })
    } else {
      let data = {
        'doctorId': wx.getStorageSync('id'),
        'name': self.data.userInfo.name,
        'age': self.data.userInfo.age,
        'sex': self.data.userInfo.sex,
        'phone': self.data.userInfo.phone,
        'fee': self.data.userInfo.fee,
        'workTime': self.data.userInfo.workTime,
        'hospitalNmae': self.data.userInfo.hospital,
        'hospitaType': self.data.userInfo.type,
        'title': self.data.userInfo.title,
        'detail': self.data.userInfo.detail,
        'address': self.data.userInfo.address,
        'goodAt': self.data.userInfo.goodAt,
      }
      wx.hideLoading()
      baseRequest.requestLoading(url, data, "GET").then(res => { //上传医生文本资料
        if (res.data.status == 0) {
          wx.setStorageSync('phone', self.data.userInfo.phone)
          wx.switchTab({
            url: '../personnal/personnal',
          })
          wx.uploadFile({
            url: wx.getStorageSync('requstURL') + 'doctor/doctorApplyPic',
            filePath: self.data.tempFIle[0],
            name: 'file',
            formData: {
              'doctorId': wx.getStorageSync('id')
            },
            success: function(e) {
              if (e.errMsg == "uploadFile:ok") {
                wx.switchTab({
                  url: '../personnal/personnal',
                })
              }
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (JSON.parse(options.doctorInfo)) {
      this.setData({
        showPlaceholder: false,
        img: JSON.parse(options.doctorInfo).wxLoc,
        userInfo: JSON.parse(options.doctorInfo)
      })
      if (JSON.parse(options.doctorInfo).sex == "女") {
        this.setData({
          selectedIndex: 1,
        })
      } else {
        this.setData({
          selectedIndex: 0,
        })
      }
      if (JSON.parse(options.doctorInfo).type == 0) {
        this.setData({
          selectedIndexs: 1,
        })
      } else {
        this.setData({
          selectedIndexs: 0,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let illList = wx.getStorageSync('obj')
    if (wx.getStorageSync('obj')) {
      if (illList == "") {
        this.setData({
          showPlaceholder: true
        })
      } else {
        let goodAt = "userInfo.goodAt"
        this.setData({
          [goodAt]: illList,
          showPlaceholder: false
        })
      }
    }
    //请求默认的职称
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/getTitleNameList'
    baseRequest.requestLoading(url, "POST").then(res => {
      if (res.data.status == 0) {
        self.setData({
          titleNameList: res.data.titleNameList
        })
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