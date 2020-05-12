var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    //img: 'https://47.105.132.249:80/wxPic/weizhi.png',
    img:'https://mengquan.live/wxPic/weizhi.png'
  },
  /**
   * 上传本地图片
   */
  choseImg: function () {
    let _this = this
    wx.chooseImage({
      success: function (res) {
        let filePath = res.tempFilePaths[0]
        console.log(res.tempFilePaths[0])
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
  inputName: function (e) {
    let name = e.detail.value
    let nameArgu = "userInfo.name"
    this.setData({
      [nameArgu]: name
    })
  },
  /**
   * 年龄
   */
  inputAge: function (e) {
    let name = e.detail.value
    let ageArgu = "userInfo.age"
    this.setData({
      [ageArgu]: name
    })
  },
  /**
   * 性别选择
   */
  selecUsrSex: function (e) {
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
  /**
   * 电话
   */
  inputPhone: function (e) {
    let name = e.detail.value
    let ageArgu = "userInfo.phone"
    this.setData({
      [ageArgu]: name
    })
  },
  //出诊费用
  inputfee: function (e) {
    let data = e.detail.value
    let fee = "userInfo.fee"
    this.setData({
      [fee]: data
    })
  },
  //出诊时间
  inputworkTime: function (e) {
    let data = e.detail.value
    let workTime = "userInfo.workTime"
    this.setData({
      [workTime]: data
    })
  },
  //简介
  inputdetail: function (e) {
    let data = e.detail.value
    let detail = "userInfo.detail"
    this.setData({
      [detail]: data
    })
  },
  //医院
  inputHospital: function (e) {
    let name = e.detail.value
    let hospital = "userInfo.hospital"
    this.setData({
      [hospital]: name
    })
  },
  /**
   * 职称
   */
  selectLevel: function (e) {
    let ageArgu = "userInfo.level"
    this.setData({
      titleNameListIndex: parseInt(e.detail.value),
      [ageArgu]: this.data.titleNameList[parseInt(e.detail.value)]
    })
  },
  /**
   * 地址
   */
  inputAddress: function (e) {
    let name = e.detail.value
    let ageArgu = "userInfo.address"
    this.setData({
      [ageArgu]: name
    })
  },
  /**
   * 业务人员
   */
  searchBusinessPeople: function () {
    wx.navigateTo({
      url: '/pages/searchBusinessPeople/searchBusinessPeople',
    })
  },
  /**
   * 擅长治疗
   */
  selectSkills: function () {
    wx.navigateTo({
      url: '/pages/choseDisease/choseDisease',
    })
  },
  /**
   * 提交医生信息
   */
  applyInfo: function () {
    var self = this;
    if (self.data.userInfo != undefined) {
      if (self.data.userInfo.name != undefined && self.data.userInfo.age != undefined && self.data.userInfo.sex != undefined && self.data.userInfo.phone != undefined && self.data.userInfo.fee != undefined && self.data.userInfo.workTime != undefined && self.data.userInfo.hospital != undefined && self.data.userInfo.type != undefined && self.data.userInfo.level != undefined && self.data.userInfo.detail != undefined && self.data.userInfo.address != undefined && self.data.userInfo.goodAt != undefined && self.data.userInfo.salesMan != undefined) {
        if (self.data.tempFIle == undefined) {
          wx.showToast({
            title: '请上传医生照片',
            icon: 'none'
          })
        } else {
          if (self.data.userInfo.phone != wx.getStorageSync('phone')) {
            wx.showLoading({
              title: '提交资料...',
            })
            let url = wx.getStorageSync('requstURL') + 'doctor/doctorApply'
            let data = {
              name: self.data.userInfo.name,
              age: self.data.userInfo.age,
              sex: self.data.userInfo.sex,
              phone: self.data.userInfo.phone,
              fee: self.data.userInfo.fee,
              workTime: self.data.userInfo.workTime,
              hospitalNane: self.data.userInfo.hospital,
              type: self.data.userInfo.type,
              title: self.data.userInfo.level.title_name,
              detail: self.data.userInfo.detail,
              address: self.data.userInfo.address,
              goodAt: self.data.userInfo.goodAt,
              salesmanId: self.data.userInfo.salesMan.id
            }
            baseRequest.requestLoading(url, data, "GET").then(res => { //上传医生文本资料
              wx.setStorageSync('phone', self.data.userInfo.phone)
              if (res.data.status == 0) {
                wx.uploadFile({
                  url: wx.getStorageSync('requstURL') + 'doctor/doctorApplyPic',
                  filePath: self.data.tempFIle[0],
                  name: 'file',
                  formData: {
                    'doctorId': res.data.doctorId
                  },
                  success: function (e) {
                    if (e.errMsg == "uploadFile:ok") {
                      wx.setStorageSync('id', res.data.doctorId)
                      wx.hideLoading()
                      wx.switchTab({
                        url: '/pages/myCustomer/myCustomer',
                      })
                    }
                  }
                })
              }
            })
          } else {
            wx.showToast({
              title: '医生的手机号码不能重复',
              icon: 'none'
            })
          }
        }
      } else {
        wx.showToast({
          title: '请输入完整的医生信息',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请输入医生资料',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let illList = wx.getStorageSync('obj')
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