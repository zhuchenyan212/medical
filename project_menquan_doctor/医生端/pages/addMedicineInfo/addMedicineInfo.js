var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    showSearchList: false,
    length: 0,
    sum: 0
  },

  showMask: function () {
    this.setData({
      showSearchList: true
    })
  },
  /**
   * 输入框搜索药品
   */
  inputSearch: function (e) {
    let inputText = e.detail.value
    let self = this
    if (inputText != "") {
      let url = wx.getStorageSync('requstURL') + 'doctor/searchDrug'
      let data = {
        keyword: inputText,
        drug_id: wx.getStorageSync('drug_id')
      }
      baseRequest.requestLoading(url, data, "GET").then(res => {
        if (res.data.status == 0) {
          self.setData({
            drugList: res.data.drugList
          })
        }
      })
    }
  },

  /**
   * 修改药品数量
   */
  choseNum: function (e) {
    let inputText = e.detail.value
    let index = e.currentTarget.dataset.index
    let x = "medInfo[" + index + "].num"
    if (inputText == "") {
      this.setData({
        [x]: 0
      })
    } else {
      this.setData({
        [x]: parseInt(inputText)
      })
    }
    //实时计算药单总价
    this.calculateSum()
  },

  /**
   * 保存药单
   */
  save: function () {
    this.calculateSum()
    if (this.data.sum == 0) {
      wx.showToast({
        title: '请选择药品副数',
        icon: 'none'
      })
    } else {
      setTimeout(() => {
        wx.navigateBack({})
      }, 500)
    }
  },

  /**
   * 遍历计算药品总价
   */
  calculateSum: function () {
    let sums = 0
    for (var index = 0; index < this.data.medInfo.length; index++) {
      if (this.data.medInfo[index].num == undefined) {
        this.data.medInfo[index].num = 1
      } sums = sums + this.data.medInfo[index].price * this.data.medInfo[index].num
    }
    this.setData({
      sum: (parseFloat(sums) * parseInt(this.data.length)).toFixed(2)
    })
  },

  //改变副数量
  doInput: function (e) {
    this.setData({
      length: e.detail.value
    })
    this.calculateSum()
  },

  cancelMask: function () {
    this.setData({
      showSearchList: false,
      disabled: true
    })
  },

  catchtouchmove: function () {
    return null
  },

  /**
   * 增加药方
   */
  selectMedicine: function (e) {
    let item = e.currentTarget.dataset.item
    this.data.medInfo.unshift(item)
    this.cancelMask()
    this.setData({
      medInfo: this.data.medInfo,
      length: this.data.length
    })
  },

  /**
   * 删除药方
   */
  deleteItem: function (e) {
    let index = e.currentTarget.dataset.index
    this.data.medInfo.splice(index, 1)
    this.calculateSum()
    this.setData({
      medInfo: this.data.medInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.getSystemInfo({
      success: function (res) {
        let rate = 750 / res.windowWidth
        _this.setData({
          maskH: res.windowHeight * rate - 102,
          medInfo: JSON.parse(options.medInfo),
        })
        if (parseInt(options.drugNumber) > 0) {
          _this.setData({
            length: parseInt(options.drugNumber)
          })
        }
        _this.calculateSum()
      },
    })
  },

  surechufang: function () {
    // 计算总计
    this.calculateSum()
    console.log('计算总计')
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
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    var list = "medicineInfo.drugList"
    var sum = "medicineInfo.totalFee"
    var drugNumber = "medicineInfo.drugNumber"
    prevPage.setData({
      [list]: that.data.medInfo,
      [sum]: that.data.sum,
      [drugNumber]: that.data.length
    });
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