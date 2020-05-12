var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    cents: ['正常', '发烧至39℃以上', '发冷', '发烧在39℃以下'],
    foots: ['手脚发冷', '手脚发热', '正常'],
    kesos: ['有咳嗽', '无咳嗽'],
    tans: ['黄痰', '黄白痰', '白痰粘稠', '白痰清稀', '清稀泡沫痰', '痰中带血丝', '无痰'],
    yuejins: ['正常', '过多', '过少', '延迟', '提前'],
    addInfo: '',
    globaldata: {},
    choose: {},
    sex:'',
    toolips: app.data.toolips
  },

  //第二页返回默认显示
  onLoad: function() {
    var that = this
    //默认特殊情况展示
    $.post('/selectTempInterrogationForm', {
      'id': wx.getStorageSync('id')
    }, (err, res) => {
      if (res.data.status == 0) {
        if (res.data.step1 != undefined && res.data.step1 != '') {
          var choose = JSON.parse(res.data.step1)
          that.setData({
            choose: choose,
            globaldata: choose
          })
          // 不为空在渲染
          if (choose.cent != undefined && choose.foot != undefined && choose.keso != undefined && choose.tan != undefined && choose.yuejin !=undefined && choose.addInfo != undefined) {
            // 体温
            for (var i = 0; i < that.data.cents.length; i++) {
              if (that.data.cents[i] == choose.cent) {
                that.setData({
                  state1: i
                })
              }
            }
            // 手脚
            for (var i = 0; i < that.data.foots.length; i++) {
              if (that.data.foots[i] == choose.foot) {
                that.setData({
                  state2: i
                })
              }
            }
            // 咳嗽
            for (var i = 0; i < that.data.kesos.length; i++) {
              if (that.data.kesos[i] == choose.keso) {
                that.setData({
                  state3: i
                })
              }
            }
            // 痰
            for (var i = 0; i < that.data.tans.length; i++) {
              if (that.data.tans[i] == choose.tan) {
                that.setData({
                  state4: i
                })
              }
            }
            // 月经
            for (var i = 0; i < that.data.yuejins.length; i++) {
              if (that.data.yuejins[i] == choose.yuejin) {
                that.setData({
                  state5: i
                })
              }
            }
            // 补充情况
            that.setData({
              addInfo: choose.addInfo
            })
          }
        }
      } else {
        app.showMsg(that, '请求异常请稍后');
      }
    })
  },

  //点击选择
  click1: function(e) {
    var that = this;
    var globaldata = that.data.globaldata;
    this.setData({
      state1: e.currentTarget.dataset.key
    });

    //存储键值对
    var obj = {
      cent: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.cent = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click2: function(e) {
    var that = this;
    var globaldata = that.data.globaldata;
    this.setData({
      state2: e.currentTarget.dataset.key
    });

    //存储键值对
    var obj = {
      foot: e.currentTarget.dataset.name
    };

    // 往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.foot = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click3: function(e) {
    var that = this;
    var globaldata = that.data.globaldata
    this.setData({
      state3: e.currentTarget.dataset.key
    });

    //存储键值对
    var obj = {
      keso: e.currentTarget.dataset.name
    };

    // 往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.keso = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click4: function(e) {
    var that = this;
    var globaldata = that.data.globaldata
    this.setData({
      state4: e.currentTarget.dataset.key
    });

    //存储键值对
    var obj = {
      tan: e.currentTarget.dataset.name
    };

    // 往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.tan = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click5: function(e) {
    var that = this;
    var globaldata = that.data.globaldata
    this.setData({
      state5: e.currentTarget.dataset.key
    });

    //存储键值对
    var obj = {
      yuejin: e.currentTarget.dataset.name
    };

    // 往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.yuejin = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //补充说明
  saveInfo: function(e) {
    var that = this;
    var globaldata = that.data.globaldata;
    var Info = e.detail.value;
    //获取选中数据
    console.log(that.data.globaldata)

    //存储键值对
    var obj = {
      addInfo: Info.addInfo
    }
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var choose = that.data.choose
      that.setData({
        globaldata: choose
      })
    } else if (s == false) {
      var global = JSON.parse((JSON.stringify(globaldata) + JSON.stringify(obj)).replace(/}{/, ','));
      that.setData({
        globaldata: global
      })
    }

    // 判断当前一页的问诊单填写情况
    if (that.data.globaldata.cent != undefined && that.data.globaldata.foot != undefined && that.data.globaldata.keso != undefined && that.data.globaldata.tan != undefined && that.data.globaldata.addInfo != undefined) {
      // 特殊情况说明
      $.post('/tempInterrogationForm', {
        'id': wx.getStorageSync('id'),
        'type': 1,
        'msg': that.data.globaldata
      }, (err, res) => {
        if (res.data.status == 0) {
          app.showMsg(that, '保存成功');
          wx.redirectTo({
            url: '../Editsick/second'
          })
        } else {
          app.showMsg(that, '请求异常请稍后');
        }
      })
    } else {
      app.showMsg(that, '请将特殊情况填写完整');
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  onShow: function() {
    this.setData({
      sex:wx.getStorageSync('sex')
    })
  },

  /*
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {}

})