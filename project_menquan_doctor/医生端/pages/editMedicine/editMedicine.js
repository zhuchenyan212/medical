// pages/editMedicine/editMedicine.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   *  编辑药品功效
   */
  editGongxiao: function(e) {
    let value = e.detail.value
    let prescriptionEffect = "medicineInfo.prescriptionEffect"
    this.setData({
      [prescriptionEffect]: value
    })
  },
  /**
   * 编辑药品用法
   */
  editUsage: function(e) {
    let value = e.detail.value
    let useWay = "medicineInfo.useWay"
    this.setData({
      [useWay]: value
    })
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
  /**
   * 保存药单
   */
  saveItem: function() {
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/drugDuplicate'
    let data = {
      propertys: self.data.medicineInfo.drugList
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        let property = 'medicineInfo.property'
        self.setData({
          [property]: res.data.propertyList
        })
        wx.navigateBack({})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      medicineInfo: JSON.parse(options.item),
      seletedIndex: parseInt(options.index)
    })
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    let updateItem = 'infos.prescriptionContent[' + that.data.seletedIndex + ']'
    prevPage.setData({
      [updateItem]: this.data.medicineInfo
    })
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