var app = getApp();
var $ = require("../../utils/https.js");
Page({
  data: {
    id: '',
    addInfo: '',
    isDefault: 1,
    address: '请选择地址',
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    var that = this;
    var addInfo = JSON.parse(options.addInfo)
    //获取编辑地址的信息
    this.setData({
      addInfo: addInfo,
      id: options.id
    })
  },

  //展示地址信息
  onShow: function() {
    var that = this;
    var addInfo = that.data.addInfo
    that.setData({
      username: addInfo.name,
      phone: addInfo.phone,
      address: addInfo.province,
      addressDetail: addInfo.address,
      isDefault: addInfo.isDefault
    })

    if (addInfo.isDefault == 0) {
      this.setData({
        ischecked: true
      })
    } else if (addInfo.isDefault == 1) {
      this.setData({
        ischecked: false
      })
    }
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

  //编辑地址
  saveAddressInfo: function(e) {
    var that = this;
    var addressInfo = e.detail.value;
    var id = that.data.id;
    if (addressInfo.username != '' && addressInfo.phone != '' && addressInfo.addressDetail != '') {
      //用户没有修改选中地址
      if (addressInfo.address[0] == undefined) {
        $.post('/editAddress', {
          'id': id,
          'name': addressInfo.username,
          'phone': addressInfo.phone,
          'province': that.data.address,
          'address': addressInfo.addressDetail,
          'isDefault': that.data.isDefault
        }, (err, res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '修改地址成功',
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
        // 用户修改选中地址
        $.post('/editAddress', {
          'id': id,
          'name': addressInfo.username,
          'phone': addressInfo.phone,
          'province': addressInfo.address[0] + addressInfo.address[1] + addressInfo.address[2],
          'address': addressInfo.addressDetail,
          'isDefault': that.data.isDefault,
        }, (err, res) => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '修改地址成功',
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
      }
    } else {
      app.showMsg(that, '请完善地址信息');
    }
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