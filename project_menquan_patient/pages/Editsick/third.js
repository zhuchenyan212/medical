var app = getApp();
var $ = require("../../utils/https.js");
Page({

  data: {
    bigNums: ['一日一次', '一日多次', '一周5次以下'],
    bigColors: ['黄色', '偏黑', '红色'],
    likes: ['正常', '偏稀', '干结', '带血'],
    smallNums: ['正常', '较少', '过多'],
    samllColors: ['正常', '偏红', '偏白', '带血'],
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
        if (res.data.step3 != undefined && res.data.step3 != '') {
          var choose = JSON.parse(res.data.step3)
          that.setData({
            choose: choose,
            globaldata: choose
          })
          // 不为空在渲染
          if (choose.bigNum != undefined && choose.bigColor != undefined && choose.like != undefined && choose.smallNum != undefined && choose.samllColor != undefined && choose.addInfo != undefined) {
            // 大便次数
            for (var i = 0; i < that.data.bigNums.length; i++) {
              if (that.data.bigNums[i] == choose.bigNum) {
                that.setData({
                  state1: i
                })
              }
            }
            // 大便颜色
            for (var i = 0; i < that.data.bigColors.length; i++) {
              if (that.data.bigColors[i] == choose.bigColor) {
                that.setData({
                  state2: i
                })
              }
            }
            // 大便形态
            for (var i = 0; i < that.data.likes.length; i++) {
              if (that.data.likes[i] == choose.like) {
                that.setData({
                  state3: i
                })
              }
            }
            // 小便次数
            for (var i = 0; i < that.data.smallNums.length; i++) {
              if (that.data.smallNums[i] == choose.smallNum) {
                that.setData({
                  state4: i
                })
              }
            }
            // 小便颜色
            for (var i = 0; i < that.data.samllColors.length; i++) {
              if (that.data.samllColors[i] == choose.samllColor) {
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
      bigNum: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.bigNum = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
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
      bigColor: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.bigColor = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
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
      like: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.like = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
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
      smallNum: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.smallNum = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
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
      samllColor: e.currentTarget.dataset.name
    };

    //往数组里面插入数据
    let s = JSON.stringify(globaldata) == "{}"
    if (s == true) {
      var global = JSON.parse(JSON.stringify(obj));
      that.setData({
        globaldata: global
      })
    } else if (s == false) {
      that.data.globaldata.samllColor = JSON.parse(JSON.stringify(e.currentTarget.dataset.name))
    }
  },

  //补充说明
  saveInfo: function(e) {
    var that = this;
    var globaldata = that.data.globaldata;
    var Info = e.detail.value;
    //存储键值对
    var obj = {
      'addInfo': Info.addInfo
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
    if (that.data.globaldata.bigNum != undefined && that.data.globaldata.bigColor != undefined && that.data.globaldata.like != undefined && that.data.globaldata.smallNum != undefined && that.data.globaldata.samllColor != undefined && that.data.globaldata.addInfo != undefined) {
      // 二便情况说明
      $.post('/tempInterrogationForm', {
        'id': wx.getStorageSync('id'),
        'type': 3,
        'msg': that.data.globaldata,
      }, (err, res) => {
        if (res.data.status == 0) {
          app.showMsg(that, '保存成功');
          // 提交成功跳转
          wx.redirectTo({
            url: '../Editsick/fourth',
          })
        } else {
          app.showMsg(that, '请求异常请稍后');
        }
      })
    } else {
      app.showMsg(that, '请二便殊情况填写完整');
    }
  },

  //返回上一步
  backFor: function() {
    wx.redirectTo({
      url: '../Editsick/second',
    })
  }

})