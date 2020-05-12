// pages/personnal-addMedicineInfo/personnal-addMedicineInfo.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
    prescriptionItem: {},
    medInfo: [],
    medicineInfo: {
      drugNumber: 0,
      totalFee: 0,
      drugList: [],
      prescriptionEffect: '',
      useWay: ''
    }
  },

  /**
   * 选择药品配方
   */
  selectMedicineInfo: function(e) {
    let self = this
    wx.navigateTo({
      url: '/pages/addMedicineInfo/addMedicineInfo?medInfo=' + JSON.stringify(self.data.medicineInfo.drugList) + '&drugNumber=' + self.data.medicineInfo.drugNumber,
    })
  },
  mediaInfluence: function(e) {
    let prescriptionEffect = 'medicineInfo.prescriptionEffect'
    this.setData({
      [prescriptionEffect]: e.detail.value
    })
  },

  usage: function(e) {
    let useWay = 'medicineInfo.useWay'
    this.setData({
      [useWay]: e.detail.value
    })
  },

  saveInfo: function() {
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/drugDuplicate'
    let data = {
      propertys: self.data.medicineInfo.drugList,
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        self.setData({
          propertyList: res.data.propertyList
        })
        wx.setStorageSync('number', self.data.medicineInfo.drugNumber) //药品副数
        wx.navigateBack({})
      }
    })
  },
  /**
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      operationType: options.operationType
    })
    if (options.operationType == '0') {
      //查看详情
      let item = JSON.parse(options.item)
      console.log(item)
      let drugList = "medicineInfo.drugList"
      let drugNumber = "medicineInfo.drugNumber"
      let totalFee = "medicineInfo.totalFee"
      let prescriptionEffect = "medicineInfo.prescriptionEffect"
      let useWay = "medicineInfo.useWay"
      let propertyList = "medicineInfo.propertyList"
      this.setData({
        [drugList]: item.drugList,
        [drugNumber]: item.pairs,
        [totalFee]: item.total*wx.getStorageSync('number'),
        [prescriptionEffect]: item.prescriptionEffect,
        [useWay]: item.useWay,
        [propertyList]: item.propertyList,
        seletedIndex: options.index
      })
    } else {
      //新增药单
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    if (that.data.operationType == '1') {
      let medicineInfo = {}
      medicineInfo.drugList = this.data.medicineInfo.drugList
      medicineInfo.useWay = this.data.medicineInfo.useWay
      medicineInfo.prescriptionEffect = this.data.medicineInfo.prescriptionEffect
      medicineInfo.pairs = this.data.medicineInfo.drugNumber
      medicineInfo.propertyList = this.data.propertyList
      if (medicineInfo.drugList.length !== 0) {
        prevPage.data.prescriptionList.push(medicineInfo) //药单添加到处方药单数组
        prevPage.setData({
          prescriptionList: prevPage.data.prescriptionList
        })
      }
    } else {
      // 查看药单详情返回
      let medicineInfo = {}
      medicineInfo.drugList = this.data.medicineInfo.drugList
      medicineInfo.useWay = this.data.medicineInfo.useWay
      medicineInfo.prescriptionEffect = this.data.medicineInfo.prescriptionEffect
      medicineInfo.pairs = this.data.medicineInfo.drugNumber
      medicineInfo.propertyList = this.data.medicineInfo.propertyList
      let updateItem = "prescriptionList[" + that.data.seletedIndex + "]"
      prevPage.setData({
        [updateItem]: medicineInfo
      })
    }
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