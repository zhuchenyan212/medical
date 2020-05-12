// pages/manageMedicine/manageMedicine.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    type: '', //开方来源
    showMask: false
  },

  inputName: function (e) {
    let name = e.detail.value
    let infos = 'infos.prescriptionName'
    this.setData({
      [infos]: name
    })
  },
  /**
   * 查看药单详情
   */
  showMask: function (e) {
    this.setData({
      showMask: true,
      seletedContentItem: e.currentTarget.dataset.item
    })
  },
  cancelMask: function () {
    this.setData({
      showMask: false
    })
  },
  /**
   * 编辑药单
   */
  editOrder: function (e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/editMedicine/editMedicine?item=' + JSON.stringify(item) + '&index=' + index,
    })
  },
  /**
   * 保存处方
   */
  saveOrder: function (e) {
    wx.showLoading({
      title: '保存中...',
    })
    let self = this
    let url1 = wx.getStorageSync('requstURL') + 'doctor/addDrugList' //保存药单
    let url2 = wx.getStorageSync('requstURL') + 'doctor/addPrescriptionList' //生成新的处方id
    let url3 = wx.getStorageSync('requstURL') + 'doctor/deletePrescription' //删除原有处方
    let data2 = {
      doctorId: wx.getStorageSync('id'),
      prescriptionName: self.data.infos.prescriptionName
    }
    baseRequest.requestLoading(url2, data2, "GET").then(res => { //生成处方id
      if (res.data.status == 0) {
        let data3 = {
          prescriptionId: self.data.infos.prescriptionId
        }
        //删除原有处方
        baseRequest.requestLoading(url3, data3, "GET").then(res1 => {
          if (res1.data.status == 0) {
            let prescriptionList = []
            prescriptionList = JSON.parse(JSON.stringify(self.data.infos.prescriptionContent))
            //修改数组属性名
            let argumentList = JSON.parse(JSON.stringify(prescriptionList).replace(/drugNumber/g, "pairs"))
            let data1 = {
              prescriptionList: argumentList,
              prescriptionId: res.data.prescriptionId
            }
            baseRequest.requestLoading(url1, data1, "GET").then(t => { //保存药单到新处方id
              if (t.data.status == 0) {
                wx.hideLoading()
                wx.navigateBack({})
              }
            })
          }
        })
      }
    })
  },
  /**
   * 发送处方
   */
  sendMedicine: function (e) {
    let self = this
    console.log(JSON.stringify(self.data.infos))
    wx.navigateTo({
      url: '/pages/wenzhendan/wenzhendan?item=' + JSON.stringify(self.data.infos) + '&price=' + self.data.orderSum,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item)
    this.setData({
      infos: item,
      operationType: parseInt(options.type)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let sum = 0
    for (var index = 0; index < this.data.infos.prescriptionContent.length; index++) {
      sum = sum + this.data.infos.prescriptionContent[index].totalFee
    }
    this.setData({
      orderSum: sum,
      type: wx.getStorageSync("type") //开方来源
    })
    if (wx.getStorageSync("type")) {
      wx.setNavigationBarTitle({
        title: '快速开方'
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