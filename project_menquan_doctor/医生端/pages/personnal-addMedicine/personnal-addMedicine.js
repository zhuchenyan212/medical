// pages/personnal-addMedicine/personnal-addMedicine.js
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
    type:'', //开方来源
    prescriptionId: '', //处方prescriptionId
    prescriptionList: [],
    number: wx.getStorageSync("number")
  },

  inputName: function (e) {
    let name = e.detail.value
    this.setData({
      prescriptionName: name
    })
  },
  /**
   * 新增药单
   */
  addMedicineInfo: function (e) {
    wx.navigateTo({
      url: '/pages/personnal-addMedicineInfo/personnal-addMedicineInfo?operationType=' + 1,
    })
  },
  /**
   * 查看详情
   */
  showInfo: function (e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/personnal-addMedicineInfo/personnal-addMedicineInfo?operationType=' + 0 + '&item=' + item + '&index=' + index,
    })
  },
  /**
   * 保存处方
   */
  saveMedia: function () {
    wx.showLoading({
      title: '保存中...',
    })
    let self = this
    let url1 = wx.getStorageSync('requstURL') + 'doctor/addDrugList' //保存药单
    let url2 = wx.getStorageSync('requstURL') + 'doctor/addPrescriptionList' //生成处方id
    let data2 = {
      doctorId: wx.getStorageSync('id'),
      prescriptionName: self.data.prescriptionName
    }
    baseRequest.requestLoading(url2, data2, "GET").then(res => { //生成处方id
      if (res.data.status == 0) {
        let data1 = {
          prescriptionList: self.data.prescriptionList,
          prescriptionId: res.data.prescriptionId
        }
        //保存处方prescriptionId
        this.setData({
          prescriptionId: res.data.prescriptionId
        })
        baseRequest.requestLoading(url1, data1, "GET").then(t => { //保存药单到新处方
          if (t.data.status == 0) {
            wx.hideLoading()
            if (wx.getStorageSync('type')) { // 如果是快速开方的话
              // 1.请求私有处方列表
              let urls = wx.getStorageSync('requstURL') + 'doctor/doctorPrescriptionList'
              let datas = {
                id: wx.getStorageSync('id'),
                type: 0 //私有处方
              }
              baseRequest.requestLoading(urls, datas, "GET").then(res => {
                if (res.data.status == 0) {
                  // 2.进入私有处方详情选择当前处方选择发送给患者
                  for (let i in res.data.prescriptionList) {
                    if (res.data.prescriptionList[i].prescriptionId == this.data.prescriptionId) {
                      wx.navigateTo({
                        url: '/pages/manageMedicine/manageMedicine?item=' + JSON.stringify(res.data.prescriptionList[i]) + '&type=0'
                      })
                    }
                  }
                }
              })
            } else { //如果新建私有处方的话就返回
              wx.navigateBack({})
            }
          }
        })
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
    let prescriptionList1 = []
    let sum = 0
    prescriptionList1 = JSON.parse(JSON.stringify(this.data.prescriptionList)) //界面渲染的数组，prescriptionList为参数传递数组
    for (var index = 0; index < prescriptionList1.length; index++) {
      //循环遍历拼接药品内容、药单价格
      prescriptionList1[index].contentText = ''
      prescriptionList1[index].total = 0
      for (var index1 = 0; index1 < prescriptionList1[index].drugList.length; index1++) {
        if (index1 == 0) {
          prescriptionList1[index].contentText = prescriptionList1[index].drugList[index1].drugName + prescriptionList1[index].drugList[index1].num + prescriptionList1[index].drugList[index1].drugUnit
        } else {
          prescriptionList1[index].contentText = prescriptionList1[index].contentText + '，' + prescriptionList1[index].drugList[index1].drugName + prescriptionList1[index].drugList[index1].num + prescriptionList1[index].drugList[index1].drugUnit
        }
        prescriptionList1[index].total = prescriptionList1[index].total + prescriptionList1[index].drugList[index1].price * prescriptionList1[index].drugList[index1].num
      }
      sum = sum + prescriptionList1[index].total //计算处方价格
    }
    this.setData({
      prescriptionList1: prescriptionList1,
      sum: sum * wx.getStorageSync("number"),
      number: wx.getStorageSync("number"),
      type: wx.getStorageSync("type") //开方来源
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