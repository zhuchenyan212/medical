var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    isDefault: 1,
    address: '请选择地址',
    buttonClicked: false,
    toolips: app.data.toolips
  },

  //选择地址
  bindaddressChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      address: e.detail.value,
      addresschange: true
    })
  },

  //获取switch选中状态
  switchChange: function(event) {
    var checkedValue = event.detail.value;
    //打印输出
    console.info("当前开关按钮是否打开：" + checkedValue);
    if (checkedValue == true) {
      this.setData({
        isDefault: 0
      })
    } else if (checkedValue == false) {
      this.setData({
        isDefault: 1
      })
    }
  },

  //添加新的地址记录
  saveAddressInfo: function(e) {
    var that = this;
    var addressInfo = e.detail.value;
    var id = wx.getStorageSync('id');

    if (addressInfo.username != '' && addressInfo.phone != '' && addressInfo.address[0] != NaN && addressInfo.addressDetail != '') {
      app.buttonClicked(that);
      $.post('/addAddress', {
        'patientId': id,
        'name': addressInfo.username,
        'phone': addressInfo.phone,
        'province': addressInfo.address[0] + addressInfo.address[1] + addressInfo.address[2],
        'address': addressInfo.addressDetail,
        'isDefault': that.data.isDefault
      }, (err, res) => {
        if (res.data.status == 0) {
          wx.showToast({
            title: '地址保存成功',
            icon: 'success'
          })
          //返回地址列表
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        } else {
          app.showMsg(that, '请求异常请稍后');
        }
      })
    } else {
      app.showMsg(that, '请填写地址信息');
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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