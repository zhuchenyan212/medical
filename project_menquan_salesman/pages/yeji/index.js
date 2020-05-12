var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    currentTab: 1,
    select: false,
    choosetype: 'AllTime',
    tihuoWay: '全部时间',
    start: '请选择开始时间',
    end: '请选择结束时间',
    month: '请点击选择月份',
    wait1: ' ', //待付款订单数
    wait2: ' ', //待发货订单数
    wait3: ' ', //待收货订单数
    wait4: ' ', //已完成订单数
    wait5: ' ', //已取消订单数
    money1: '', //待付款订单金额
    money2: '', //待发货订单金额
    money3: '', //待收货订单金额
    money4: '', //已完成订单金额
    money5: '', //已取消订单金额
    orderList: '', //业绩数据
    toolips: app.data.toolips
  },

  onLoad: function(options) {
    var that = this;
    var wait1 = '';
    var wait2 = '';
    var wait3 = '';
    var wait4 = '';
    var wait5 = '';

    var money1 = '';
    var money2 = '';
    var money3 = '';
    var money4 = '';
    var money5 = '';
    // 查询我的业绩
    $.post('/salesmanDatas', {
      'id': wx.getStorageSync('third_session').id,
      'type': 0
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          orderList: res.data.orderList
        })
        var result1 = [];
        var sum1 = 0;
        var result2 = [];
        var sum2 = 0;
        var result3 = [];
        var sum3 = 0;
        var result4 = [];
        var sum4 = 0;
        var result5 = [];
        var sum5 = 0;
        for (var i = 0; i < res.data.orderList.length; i++) {
          if (res.data.orderList[i].orderStatus == 1) {
            result1.push(res.data.orderList[i]);
            sum1 += res.data.orderList[i].fee;
            that.setData({
              wait1: result1.length, // 待付款订单数
              money1: sum1 //待付款订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 2) {
            result2.push(res.data.orderList[i]);
            sum2 += res.data.orderList[i].fee;
            that.setData({
              wait2: result2.length, // 待发货订单数
              money2: sum2 //待发货订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 3) {
            result3.push(res.data.orderList[i]);
            sum3 += res.data.orderList[i].fee;
            that.setData({
              wait3: result3.length, // 待收货订单数
              money3: sum3 //待收货订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 4) {
            result4.push(res.data.orderList[i]);
            sum4 += res.data.orderList[i].fee;
            that.setData({
              wait4: result4.length, // 已完成订单数
              money4: sum4 //已完成订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 5) {
            result5.push(res.data.orderList[i]);
            sum5 += res.data.orderList[i].fee;
            that.setData({
              wait5: result5.length, // 已取消订单数
              money5: sum5 //已取消订单金额
            })
          }
        }
      } else {
        app.showMsg(that, '请求异常请稍后！')
      }
    })
  },

  //点击切换tab
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  //弹出选择框
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },

  //选择查询方式
  mySelect(e) {
    var that = this;
    var wait1 = '';
    var wait2 = '';
    var wait3 = '';
    var wait4 = '';
    var wait5 = '';

    var money1 = '';
    var money2 = '';
    var money3 = '';
    var money4 = '';
    var money5 = '';
    var name = e.currentTarget.dataset.name;
    var type = e.currentTarget.dataset.type;
    this.setData({
      tihuoWay: name,
      choosetype: type,
      select: false
    })

    if (type == 'AllTime') {
      // 查询全部
      $.post('/salesmanDatas', {
        'id': wx.getStorageSync('third_session').id,
        'type': 0
      }, (err, res) => {
        if (res.data.status == 0) {
          that.setData({
            orderList: res.data.orderList
          })
          //获取订单统计数据
          var result1 = [];
          var sum1 = 0;
          var result2 = [];
          var sum2 = 0;
          var result3 = [];
          var sum3 = 0;
          var result4 = [];
          var sum4 = 0;
          var result5 = [];
          var sum5 = 0;
          for (var i = 0; i < res.data.orderList.length; i++) {
            if (res.data.orderList[i].orderStatus == 1) {
              result1.push(res.data.orderList[i]);
              sum1 += res.data.orderList[i].fee;
              that.setData({
                wait1: result1.length, // 待付款订单数
                money1: sum1 //待付款订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 2) {
              result2.push(res.data.orderList[i]);
              sum2 += res.data.orderList[i].fee;
              that.setData({
                wait2: result2.length, // 待发货订单数
                money2: sum2 //待发货订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 3) {
              result3.push(res.data.orderList[i]);
              sum3 += res.data.orderList[i].fee;
              that.setData({
                wait3: result3.length, // 待收货订单数
                money3: sum3 //待收货订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 4) {
              result4.push(res.data.orderList[i]);
              sum4 += res.data.orderList[i].fee;
              that.setData({
                wait4: result4.length, // 已完成订单数
                money4: sum4 //已完成订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 5) {
              result5.push(res.data.orderList[i]);
              sum5 += res.data.orderList[i].fee;
              that.setData({
                wait5: result5.length, // 已取消订单数
                money5: sum5 //已取消订单金额
              })
            }
          }
          //数据结果为0
          if (res.data.orderList.length == 0) {
            app.showMsg(that, '暂无数据')
          }
        } else {
          app.showMsg(that, '请求异常请稍后！')
        }
      })
    } else if (type == 'AllMonth') {
      that.setData({
        month: '请点击选择月份'
      })
    } else if (type == 'AllDate') {
      that.setData({
        start: '请选择开始时间',
        end: '请选择结束时间'
      })
    }
  },

  //选择年月
  getmonthTime: function(e) {
    var that = this;
    var wait1 = '';
    var wait2 = '';
    var wait3 = '';
    var wait4 = '';
    var wait5 = '';

    var money1 = '';
    var money2 = '';
    var money3 = '';
    var money4 = '';
    var money5 = '';
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      month: e.detail.value
    })

    //选择了月份查询
    $.post('/salesmanDatas', {
      'id': wx.getStorageSync('third_session').id,
      'type': 1,
      'yearAndMonth': e.detail.value
    }, (err, res) => {
      if (res.data.status == 0) {
        that.setData({
          orderList: res.data.orderList
        })
        //获取订单统计数据
        var result1 = [];
        var sum1 = 0;
        var result2 = [];
        var sum2 = 0;
        var result3 = [];
        var sum3 = 0;
        var result4 = [];
        var sum4 = 0;
        var result5 = [];
        var sum5 = 0;
        for (var i = 0; i < res.data.orderList.length; i++) {
          if (res.data.orderList[i].orderStatus == 1) {
            result1.push(res.data.orderList[i]);
            sum1 += res.data.orderList[i].fee;
            that.setData({
              wait1: result1.length, // 待付款订单数
              money1: sum1 //待付款订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 2) {
            result2.push(res.data.orderList[i]);
            sum2 += res.data.orderList[i].fee;
            that.setData({
              wait2: result2.length, // 待发货订单数
              money2: sum2 //待发货订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 3) {
            result3.push(res.data.orderList[i]);
            sum3 += res.data.orderList[i].fee;
            that.setData({
              wait3: result3.length, // 待收货订单数
              money3: sum3 //待收货订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 4) {
            result4.push(res.data.orderList[i]);
            sum4 += res.data.orderList[i].fee;
            that.setData({
              wait4: result4.length, // 已完成订单数
              money4: sum4 //已完成订单金额
            })
          } else if (res.data.orderList[i].orderStatus == 5) {
            result5.push(res.data.orderList[i]);
            sum5 += res.data.orderList[i].fee;
            that.setData({
              wait5: result5.length, // 已取消订单数
              money5: sum5 //已取消订单金额
            })
          }
        }
        //数据结果为0
        if (res.data.orderList.length == 0) {
          app.showMsg(that, '暂无数据')
        }
      } else {
        app.showMsg(that, '请求异常请稍后！')
      }
    })
  },

  //选择开始日期
  bindstartChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start: e.detail.value,
    })
  },

  //选择结束日期
  bindendChange: function(e) {
    var that = this;
    var wait1 = '';
    var wait2 = '';
    var wait3 = '';
    var wait4 = '';
    var wait5 = '';

    var money1 = '';
    var money2 = '';
    var money3 = '';
    var money4 = '';
    var money5 = '';
    var start = that.data.start //开始时间
    if (start == '请选择开始时间') {
      app.showMsg(that, '请选择开始时间')
    } else {
      this.setData({
        end: e.detail.value,
      })
      console.log('picker发送选择改变，携带值为', e.detail.value)
      //选择了时间段查询
      $.post('/salesmanDatas', {
        'id': wx.getStorageSync('third_session').id,
        'type': 2,
        'stime': start,
        'etime': e.detail.value
      }, (err, res) => {
        if (res.data.status == 0) {
          that.setData({
            orderList: res.data.orderList
          })
          //获取订单统计数据
          var result1 = [];
          var sum1 = 0;
          var result2 = [];
          var sum2 = 0;
          var result3 = [];
          var sum3 = 0;
          var result4 = [];
          var sum4 = 0;
          var result5 = [];
          var sum5 = 0;
          for (var i = 0; i < res.data.orderList.length; i++) {
            if (res.data.orderList[i].orderStatus == 1) {
              result1.push(res.data.orderList[i]);
              sum1 += res.data.orderList[i].fee;
              that.setData({
                wait1: result1.length, // 待付款订单数
                money1: sum1 //待付款订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 2) {
              result2.push(res.data.orderList[i]);
              sum2 += res.data.orderList[i].fee;
              that.setData({
                wait2: result2.length, // 待发货订单数
                money2: sum2 //待发货订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 3) {
              result3.push(res.data.orderList[i]);
              sum3 += res.data.orderList[i].fee;
              that.setData({
                wait3: result3.length, // 待收货订单数
                money3: sum3 //待收货订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 4) {
              result4.push(res.data.orderList[i]);
              sum4 += res.data.orderList[i].fee;
              that.setData({
                wait4: result4.length, // 已完成订单数
                money4: sum4 //已完成订单金额
              })
            } else if (res.data.orderList[i].orderStatus == 5) {
              result5.push(res.data.orderList[i]);
              sum5 += res.data.orderList[i].fee;
              that.setData({
                wait5: result5.length, // 已取消订单数
                money5: sum5 //已取消订单金额
              })
            }
          }
          //数据结果为0
          if (res.data.orderList.length == 0) {
            app.showMsg(that, '暂无数据')
          }
        } else {
          app.showMsg(that, '请求异常请稍后！')
        }
      })
    }
  }
})