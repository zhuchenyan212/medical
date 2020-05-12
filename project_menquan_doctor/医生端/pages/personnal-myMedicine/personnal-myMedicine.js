// pages/personnal-myMedicine/personnal-myMedicine.js

var baseRequest = require("./../../utils/baseRequest.js")

Page({

  data: {
  },
  /**
   * 添加处方
   */
  addMedicine: function () {
    wx.navigateTo({
      url: '/pages/addMedicineOptions/addMedicineOptions',
    })
  },
  /**
   * 发送处方给患者
   */
  sendToPatient: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/manageMedicine/manageMedicine?item=' + JSON.stringify(item),
    })
  },
  /**
 * 编辑处方
 */
  editMedicine: function (e) {
    let item = e.currentTarget.dataset.item
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/manageMedicine/manageMedicine?item=' + JSON.stringify(item) + '&type=' + type,
    })
  },
  /**
 * 查看处方详情
 */
  showInfo: function (e) {
    let item = e.currentTarget.dataset.item
    let type = e.currentTarget.dataset.type
    console.log(item)
    console.log(type)
    // wx.navigateTo({
    //   url: '/pages/manageMedicine/manageMedicine?item=' + JSON.stringify(item) + '&type=' + type
    // })
  },
  /**
 * 删除处方
 */
  deleteMedicine: function (e) {
    let deleteID = e.currentTarget.dataset.itemid
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/deletePrescription'
    let data = {
      prescriptionId: deleteID
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        self.onShow()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/doctorPrescriptionList'
    let data = {
      id: wx.getStorageSync('id'),
      type: 0 //私有处方
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        let medincineList = res.data.prescriptionList
        self.setData({
          medincineList: res.data.prescriptionList
        })
      }
    })
    wx.removeStorageSync('number') //移除药品副数
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