// pages/myCustomer/myCustomer.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
    navBtn: ['全部患者', '我的处方', '历史问诊'],
    illness: '',
    selectedIndex: 0,
    state: false,
    imgs: [1, 2, 3],
    first_click: false,
    msgMenu: [{
      name: '已读',
      type: 1
    },
    {
      name: '未读',
      type: 0
    },
    {
      name: '全部',
      type: 2
    }
    ],
    selectedMsgMenu: '全部',
    seletedType: 2,
  },
  /**
   * 选择菜单选项刷新
   */
  selectOptions: function (e) {
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    this.setData({
      selectedMsgMenu: this.data.msgMenu[index].name,
      seletedType: type
    })
    this.getOptions() //收起菜单
    this.onShow() //刷新
  },

  /**
   * 顶部导航栏切换刷新
   */
  topTabSwitch: function (e) {
    let index = e.currentTarget.dataset.index
    let self = this
    if (index == 0) {
      wx.setNavigationBarTitle({
        title: '全部患者',
      })

    } else if (index == 1) {
      wx.setNavigationBarTitle({
        title: '我的处方',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '历史问诊',
      })
      self.setData({
        state: false,
        first_click: false
      })
      this.onShow()
    }
    self.setData({
      selectedIndex: index
    })
    self.onShow() //刷新
  },

  /**
   * 查看患者详情
   */
  getCustomerInfo: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/patientInfo/patientInfo?patientID=' + item.patientId,
    })
  },
  /**
   * 查看处方详情
   */
  medinceInfo: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/medicineInfo/medicineInfo?item=' + JSON.stringify(item),
    })
  },

  /**
   * 展开收起消息筛选菜单
   */
  getOptions: function () {
    var list_state = this.data.state,
      first_state = this.data.first_click;
    if (!first_state) {
      this.setData({
        first_click: true
      });
    }
    if (list_state) {
      this.setData({
        state: false
      });
    } else {
      this.setData({
        state: true
      });
    }
  },

  /**
   * 历史问诊
   */
  getHistory: function (e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/askIllnessInfo/askIllnessInfo?item=' + item,
    })
  },
  /**
   * 消息列表
   */
  message: function (e) {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    wx.getSystemInfo({
      success: function (res) {
        let rate = 750 / res.windowWidth
        self.setData({
          scorllH: res.windowHeight * rate - 44 * rate
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (index) {
    let url, data
    let self = this
    wx.showLoading({
      title: '加载中...',
    })

    if (self.data.selectedIndex == 0) { //全部患者
      url = wx.getStorageSync('requstURL') + 'doctor/doctorPatient'
      data = {
        id: wx.getStorageSync('id')
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          wx.hideLoading()
          self.setData({
            allPatients: res.data.patientList
          })
        }
      })
    } else if (self.data.selectedIndex == 1) { //我的处方
      url = wx.getStorageSync('requstURL') + 'doctor/doctorPrescription'
      data = {
        id: wx.getStorageSync('id')
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          //拼接处方详情
          for (var index1 = 0; index1 < res.data.diseaseHistory.length; index1++) {
            res.data.diseaseHistory[index1].medicineContent = ""
            for (var index2 = 0; index2 < res.data.diseaseHistory[index1].prescriptionList.length; index2++) {
              for (var index3 = 0; index3 < res.data.diseaseHistory[index1].prescriptionList[index2].prescriptionContent.length; index3++) {
                if (index3 == 0) {
                  res.data.diseaseHistory[index1].medicineContent = res.data.diseaseHistory[index1].prescriptionList[index2].prescriptionContent[index3].drugName
                } else {
                  res.data.diseaseHistory[index1].medicineContent = res.data.diseaseHistory[index1].medicineContent + '、' + res.data.diseaseHistory[index1].prescriptionList[index2].prescriptionContent[index3].drugName
                }
              }
            }
          }
          wx.hideLoading()
          self.setData({
            myMedicine: res.data.diseaseHistory
          })
        }
      })
    } else { //历史问诊
      url = wx.getStorageSync('requstURL') + 'doctor/doctorInquiryHistory'
      data = {
        id: wx.getStorageSync('id'),
        isRead: self.data.seletedType
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          wx.hideLoading()
          if (res.data.inquiryList.length == 0) {
            self.setData({
              haveInquiryList: false
            })
            wx.showToast({
              title: '当前暂无问诊记录喔～',
              duration: 2000,
              icon: 'none'
            })
          } else {
            //解析问诊单
            let historyLists = []
            for (var index = 0; index < res.data.inquiryList.length; index++) {
              res.data.inquiryList[index].basic = JSON.parse(res.data.inquiryList[index].basic)
              res.data.inquiryList[index].patientMsg = JSON.parse(res.data.inquiryList[index].patientMsg)
              res.data.inquiryList[index].special = JSON.parse(res.data.inquiryList[index].special)
              res.data.inquiryList[index].twoWill = JSON.parse(res.data.inquiryList[index].twoWill)
            }
            self.setData({
              inquiryList: res.data.inquiryList,
              haveInquiryList: true
            })
          }
        }
      })
    }
  },

  // //获取搜索关键字
  bindSearchInput: function (e) {
    this.setData({
      illness: e.detail.value
    })
  },

  //监听输入框
  bindSearch: function (e) {
    this.setData({
      illness: e.detail.value
    })
    if (e.detail.value == "") {
      this.onShow()
    }
  },

  //搜索目标数据
  navigatorToSearch: function () {
    if (this.data.illness != '') {
      let url = wx.getStorageSync('requstURL') + 'doctor/getPatientList'
      let data = {
        doctor_id: wx.getStorageSync('id'),
        content: this.data.illness
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          this.setData({
            allPatients: res.data.patientList
          })
          if (res.data.patientList.length == 0) {
            wx.showToast({
              title: '没有查询到患者信息',
              duration: 2000,
              icon: 'none'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入搜索关键字',
        duration: 2000,
        icon: 'none'
      })
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