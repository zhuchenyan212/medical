var baseRequest = require("./../../utils/baseRequest.js")
Page({

  data: {
    selectedMenuIndex: 0,
    typeid: 1, //一级类目
    drug_id: '' //二级类目
  },
  /**
 * 选择药品属性分类
 */
  selctedMenuItem: function (e) {
    let selectedMenuIndex = e.currentTarget.dataset.index
    let menuItem = this.data.optionsList[selectedMenuIndex].propertyList
    this.setData({
      selectedMenuIndex: selectedMenuIndex,
      menuItem: menuItem,
      typeid: e.currentTarget.dataset.typeid //一级类目id
    })
  },

  /**
   * 选择药品属性
   */
  selectInfoItem: function (e) {
    let selectedItemIndex = e.currentTarget.dataset.index
    this.setData({
      selectedItemIndex: selectedItemIndex,
      drug_id: e.currentTarget.dataset.propertyid
    })
    // 一级类目
    console.log(this.data.typeid)
    // 二级类目
    console.log(e.currentTarget.dataset.propertyid)
  },


  //确定药品属性
  sureType: function () {
    //确认药品属性
    wx.setStorageSync('drug_id', this.data.drug_id)
    // 去开方
    wx.navigateTo({
      url: '/pages/personnal-addMedicine/personnal-addMedicine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let self = this
    let url = wx.getStorageSync('requstURL') + 'doctor/propertyList'
    let data = {
    }
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        wx.hideLoading()
        self.setData({
          optionsList: res.data.typeList,
          menuItem: res.data.typeList[self.data.selectedMenuIndex].propertyList
        })
      }
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