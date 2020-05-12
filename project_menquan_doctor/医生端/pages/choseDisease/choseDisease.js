var app = getApp();
var baseRequest = require("./../../utils/baseRequest.js")
Page({
  data: {
    departmentList: '', //科室 + 疾病
    curNav: 1, //科室id
    curIndex: 0,
    array: '', //所有科室疾病数组
  },

  // 默认请求科室和疾病
  onShow: function () {
    var that = this;
    let url = wx.getStorageSync('requstURL') + 'salesman/departmentAndDiseaseList'
    //请求科室 + 疾病信息
    let data = {}
    baseRequest.requestLoading(url, data, "GET").then(res => {
      if (res.data.status == 0) {
        // 改变疾病对象
        for (var i = 0; i < res.data.departmentList.length; i++) {
          for (var j = 0; j < res.data.departmentList[i].diseaseList.length; j++) {
            res.data.departmentList[i].diseaseList[j].status = 0
          }
        }
        // 设置数组
        that.setData({
          departmentList: res.data.departmentList
        })
      }
    })
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index
    this.setData({
      curNav: id, //科室id
      curIndex: index
    })
  },

  // 选择疾病
  chooseillitem: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    //一级的下标
    var curindex = e.currentTarget.dataset.curindex;
    //当前点击的一级数组
    console.log(that.data.departmentList[curindex])
    // 改变当前选中状态
    if (this.data.departmentList[curindex].diseaseList[index].status == 1) {
      this.data.departmentList[curindex].diseaseList[index].status = 0;
    } else if (this.data.departmentList[curindex].diseaseList[index].status == 0) {
      this.data.departmentList[curindex].diseaseList[index].status = 1;
    }
    // 设置数组
    that.setData({
      departmentList: this.data.departmentList
    })
    //获取选中的科室数组
    var array = [];
    for (var i = 0; i < that.data.departmentList.length; i++) {
      if (that.data.departmentList[i].diseaseList.length > 0) {
        for (var j = 0; j < that.data.departmentList[i].diseaseList.length; j++) {
          if (that.data.departmentList[i].diseaseList[j].status == 1) {
            //获取对应科室选中的数据
            const newarr = that.data.departmentList[i].diseaseList.filter((item) => item.status !== 0)
            //存储键值对
            var obj = {
              departmentId: that.data.departmentList[i].id,
              departmentName: that.data.departmentList[i].name,
              diseaseList: newarr
            }
            array.push(obj)
          }
        }
      }
    }
    that.setData({
      array: array
    })
  },

  sureadd: function () {
    var that = this;
    // 数组去重
    let arr1 = [];
    for (let i = 0; i < that.data.array.length; i++) {
      let arr = [];
      for (let j = i + 1; j < that.data.array.length; j++) {
        if (that.data.array[i]['departmentName'] === that.data.array[j]['departmentName']) {
          arr.push(that.data.array[j]);
        }
      }
      if (arr.length === 0) {
        if (arr1.indexOf(that.data.array[i]) === -1) {
          arr1.push(that.data.array[i])
        }
      } else {
        if (arr1.indexOf(arr[arr.length - 1]) === -1) {
          arr1.push(arr[arr.length - 1])
        }
      }
    }
    //存储擅长科室数据
    wx.setStorageSync('obj', arr1);
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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