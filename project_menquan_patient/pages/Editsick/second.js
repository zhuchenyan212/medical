var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    foods: ['正常', '过少', '过多'],
    waters: ['正常', '过少', '过多'],
    jinshens: ['精神好', '精神一般', '精神差'],
    sleeps: ['睡眠好', '睡眠一般', '睡眠差'],
    hans: ['出汗较多', '出汗较少', '正常'],
    addInfo: '',
    globaldata: {},
    choose: {},
    toolips: app.data.toolips
  },

  //第二页返回默认显示
  onLoad: function() {
    var that = this
    //默认特殊情况展示
    $.post('/selectTempInterrogationForm', {
      'id': wx.getStorageSync('id'),
    }, (err, res) => {
      if (res.data.status == 0) {
        if (res.data.step2 != undefined && res.data.step2 != '') {
          var choose = JSON.parse(res.data.step2)
          that.setData({
            choose: choose,
            globaldata: choose
          })
          // 不为空在渲染
          if (choose.food != undefined && choose.water != undefined && choose.jinshen != undefined && choose.sleep != undefined && choose.han != undefined && choose.addInfo != undefined) {
            // 饮食
            for (var i = 0; i < that.data.foods.length; i++) {
              if (that.data.foods[i] == choose.food) {
                that.setData({
                  state1: i
                })
              }
            }
            // 饮水
            for (var i = 0; i < that.data.waters.length; i++) {
              if (that.data.waters[i] == choose.water) {
                that.setData({
                  state2: i
                })
              }
            }
            // 精神
            for (var i = 0; i < that.data.jinshens.length; i++) {
              if (that.data.jinshens[i] == choose.jinshen) {
                that.setData({
                  state3: i
                })
              }
            }
            // 睡眠
            for (var i = 0; i < that.data.sleeps.length; i++) {
              if (that.data.sleeps[i] == choose.sleep) {
                that.setData({
                  state4: i
                })
              }
            }
            // 出汗
            for (var i = 0; i < that.data.hans.length; i++) {
              if (that.data.hans[i] == choose.han) {
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
      state1: e.currentTarget.dataset.key,
    });

    //存储键值对
    var obj = {
      food: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.food = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click2: function(e) {
    var that = this;
    var globaldata = that.data.globaldata;
    this.setData({
      state2: e.currentTarget.dataset.key,
    });

    //存储键值对
    var obj = {
      water: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.water = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click3: function(e) {
    var that = this;
    var globaldata = that.data.globaldata
    this.setData({
      state3: e.currentTarget.dataset.key,
    });

    //存储键值对
    var obj = {
      jinshen: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.jinshen = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click4: function(e) {
    var that = this;
    var globaldata = that.data.globaldata
    this.setData({
      state4: e.currentTarget.dataset.key,
    });

    //存储键值对
    var obj = {
      sleep: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.sleep = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //点击选择
  click5: function(e) {
    var that = this;
    var globaldata = that.data.globaldata
    this.setData({
      state5: e.currentTarget.dataset.key,
    });

    //存储键值对
    var obj = {
      han: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.han = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //补充说明
  saveInfo: function(e) {
    var that = this;
    var globaldata = that.data.globaldata;
    var Info = e.detail.value;
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
    if (that.data.globaldata.food != undefined && that.data.globaldata.water != undefined && that.data.globaldata.jinshen != undefined && that.data.globaldata.sleep != undefined && that.data.globaldata.han != undefined && that.data.globaldata.addInfo != undefined) {
      // 基本情况说明
      $.post('/tempInterrogationForm', {
        'id': wx.getStorageSync('id'),
        'type': 2,
        'msg': that.data.globaldata,
      }, (err, res) => {
        if (res.data.status == 0) {
          app.showMsg(that, '保存成功');
          // 提交成功跳转
          wx.redirectTo({
            url: '../Editsick/third',
          })
        } else {
          app.showMsg(that, '请求异常请稍后');
        }
      })
    } else {
      app.showMsg(that, '请基本殊情况填写完整');
    }
  },

  //返回上一步
  backFor: function() {
    wx.redirectTo({
      url: "../Editsick/index"
    })
  }

})