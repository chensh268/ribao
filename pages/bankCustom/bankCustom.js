// pages/daohang/daohang.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidn: false, //到行客户
    hide: true, //意向客户
    daohang: [],
    state: ['通过', '拒绝', '审批中'],
    // index2: 0,
  },
  onSearch(e) {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          key: res.data
        })
      },
    })
    if (e.detail === "") {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else {
      var url = app.globalData.url + "/api/crmworkphone/selectCustomers";
      wx.request({
        url: url,
        method: "post",
        data: {
          user_id: that.data.key.user_id,
          user_name: e.detail
        },
        success: function(res) {
          // console.log(res)
          that.setData({
            yxkh: res.data.content
          })
        },
        fail: function(res) {

        }
      })
    }
  },

  onCancel() {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function(e) {
        that.setData({
          key: e.data
        });
        var url = app.globalData.url + "/api/crmworkphone/selectCustomers";
        wx.request({
          url: url,
          method: "post",
          data: {
            user_id: e.data.user_id
          },
          success: function(res) {
            // console.log(res)
            if (res.data.content !== []) {
              for (var a = 0; a < res.data.content.length; a++) {
                res.data.content[a].user_type = 1;
                res.data.content[a].type_status = "";
              }
            }

            that.setData({
              yxkh: res.data.content
            })
          },
          fail: function(res) {

          }
        })
      }
    })
  },
  // 滑动
  bindscroll(e) {
    this.triggerEvent('scroll', e.detail.scrollLeft)
  },
  scroll(data) {
    this.setData({
      scrollLeft: data.detail
    })
  },

  // 分期数的改变
  changeLimit(e) {
    var that = this;
    // console.log(e)
    var b = "";
    if (e.detail.value == 0) {
      b = 12;
    } else if (e.detail.value == 1) {
      b = 24;
    } else if (e.detail.value == 2) {
      b = 36;
    } else if (e.detail.value == 3) {
      b = 48;
    }
    var index = e.currentTarget.id.split("-")[1];
    console.log(index)
    var limit_number = "daohang[" + index + "].limit_number";
    that.setData({
      [limit_number]: b
    })
  },

  // 审批状态的改变
  changeState(e) {
    var that = this;
    // console.log(e)
    var index = e.currentTarget.id.split("-")[1];
    // console.log(index)
    var type_status = "daohang[" + index + "].type_status";
    that.setData({
      [type_status]: parseInt(e.detail.value) + 1
    })
  },
  // 意向客户列表中的状态
  changeState2(e) {
    var that = this;
    // console.log(e)
    var index = e.currentTarget.id.split("-")[1];
    var a = that.data.yxkh[index];
    var b = that.data.daohang.push(a);
    var type_status = "yxkh[" + index + "].type_status";
    that.setData({
      [type_status]: parseInt(e.detail.value) + 1,
      hidn: false,
      hid: true,
      hide: true,
      hid_ss: true,
      daohang: that.data.daohang
    })
  },
  // 时间1的改变
  changeTime1: function(e) {
    // console.log(e)
    var that = this;
    var index = e.currentTarget.id.split("-")[1];
    var value = e.detail.value;
    var name = "daohang[" + index + "].cross_time";
    that.setData({
      [name]: value
    })
  },
  //时间2的改变
  changeTime2(e) {
    // console.log(e)
    var that = this;
    var index = e.currentTarget.id.split("-")[1];
    var value = e.detail.value;
    var name = "daohang[" + index + "].limit_date";
    that.setData({
      [name]: value
    })
  },
  tianjia: function() {
    // console.log('ppppp')
    var that = this;
    var a = that.data.daohang;
    a.push({
      user_type: 1,
      user_name: "",
      user_phone: "",
      user_level: "",
      f_number: "",
      money: "",
      limit_number: "",
      type_status: 1,
      cross_time: "",
      limit_date: "",
      status_desc: "",
    });
    that.setData({
      daohang: a
    })
  },
  shanchu: function() {
    var that = this;
    var a = that.data.daohang;
    a.pop();
    that.setData({
      daohang: a
    })
  },


  // 两位小数点验证和双向绑定
  value: function(e) {
    var that = this;
    var id = e.currentTarget.id.split("-");
    var name = id[0];
    var index = parseFloat(id[1]);
    if (name == "money") {
      if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
        var value = e.detail.value;
      } else {
        var value = e.detail.value.substring(0, e.detail.value.length - 1);
        var name = "daohang[" + index + "]." + name;
        that.setData({
          [name]: value
        })
      }
    } else {
      var value = e.detail.value;
    }
    that.data.daohang[index][name] = value;
  },
  // 手机号验证
  phone(e) {
    var phone = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'loading'
      })
    }
  },
  // 保存到行客户
  formSubmit: function(e) {
    var that = this;
    var dhed = 0;
    var sptg = 0;
    var spze = 0;
    var dhsl = 0;
    for (var a = 0; a < that.data.daohang.length; a++) {
      if (that.data.daohang[a].user_name !== "") {
        dhsl++;
        if (that.data.daohang[a].money == 0) {
          dhed += 0;
        } else {
          dhed += parseFloat(that.data.daohang[a].money);
        }
        if (that.data.daohang[a].type_status == 1) {
          sptg += 1;
          spze += parseFloat(that.data.daohang[a].money);
        } else {
          sptg += 0;
          spze += 0;
        }
      }
    }
    var dhed = dhed.toFixed(2);
    var spze = spze.toFixed(2);
    if (dhed != 0) {
      var zhl = (spze / dhed * 100).toFixed(2).toString() + "%";
    } else {
      var zhl = "0.00%";
    }
   
    for (var a = 0; a < that.data.daohang.length; a++) {
      if (!(/^1[34578]\d{9}$/.test(that.data.daohang[a].user_phone))) {
        wx.showToast({
          title: '手机号有误',
          icon: 'loading'
        })
      } else if ((that.data.daohang[a].user_name == "") || (that.data.daohang[a].user_phone == "")|| (that.data.daohang[a].money == "")){
        wx.showLoading({
          title: '名电话额度必填',
          icon: 'loading',
          mask: true,
          duration: 1500
        })
      } else {
        wx.setStorage({
          key: 'daohang',
          data: that.data.daohang,
          success: function () { },
          fail: function () { }
        })

        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        prevPage.setData({ //直接给上移页面赋值
          dhsl: dhsl,
          dhed: dhed,
          sptg: sptg,
          spze: spze,
          zhl: zhl,
          daohang: that.data.daohang
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      }
    }
  },


  dhtj: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    var index = parseFloat(id.split("-")[1]);
    for (var c = 0; c < that.data.yxkh.length; c++) {
      if (that.data.yxkh[c].record_id == index) {
        var tet = "yxkh[" + c + "].text";
        that.setData({
          [tet]: !that.data.yxkh[c].text
        })
      }
    }
    var yxkh_daohang = [];
    for (var a = 0; a < that.data.yxkh.length; a++) {
      if (that.data.yxkh[a].text) {
        yxkh_daohang.push(that.data.yxkh[a]);
      }
    };
    that.setData({
      yxkh_daohang: yxkh_daohang,
      daohang: yxkh_daohang
    })
    if (that.data.tj !== undefined) {
      // console.log(that.data.tj)
      for (var g = 0; g < that.data.tj.length; g++) {
        that.data.daohang.push(that.data.tj[g]);
      }
    }
  },
  dhtj_ss: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    var index = parseFloat(id.split("-")[1]);
    for (var c = 0; c < that.data.yxkh_ss.length; c++) {
      if (that.data.yxkh_ss[c].record_id == index) {
        var tet = "yxkh_ss[" + c + "].text";
        that.setData({
          [tet]: !that.data.yxkh_ss[c].text
        })
      }
    }
    for (var c = 0; c < that.data.yxkh.length; c++) {
      if (that.data.yxkh[c].record_id == index) {
        var tet = "yxkh[" + c + "].text";
        that.setData({
          [tet]: !that.data.yxkh[c].text
        })
      }
    }
    var yxkh_daohang = [];
    for (var a = 0; a < that.data.yxkh.length; a++) {
      if (that.data.yxkh[a].text) {
        yxkh_daohang.push(that.data.yxkh[a]);
      }
    };
    that.setData({
      yxkh_daohang: yxkh_daohang,
      daohang: yxkh_daohang
    })
  },

  // 点击到行客户列表按钮
  dhkhlb: function() {
    var that = this;
    that.setData({
      hidn: false,
      hide: true,
    })
  },
  // 点击意向客户列表按钮
  fh: function() {
    var that = this;
    that.setData({
      hidn: true,
      hide: false,
    })
  },
  // 点击全部意向客户列表按钮
  f: function() {
    this.setData({
      hid: false,
      hidn: true,
      hid_ss: true
    })
  },
  // 获取意向客户列表
  // getData() {
  //   var that = this;
  //   wx.request({
  //     url: 'http://192.168.0.110:10002/api/crmworkphone/selectCustomers',
  //     method: 'post',
  //     data: {
  //       user_id: that.data.key.user_id
  //     },
  //     success(res){
  //       console.log(res)
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    that.setData({
      scrollLeft: 0
    })
    // 获取意向客户列表
    wx.getStorage({
      key: 'key',
      success: function(e) {
        that.setData({
          key: e.data
        });
        var url = app.globalData.url + "/api/crmworkphone/selectCustomers";
        wx.request({
          url: url,
          method: "post",
          data: {
            user_id: e.data.user_id
          },
          success: function(res) {
            // console.log(res)
            if (res.data.content !== []) {
              for (var a = 0; a < res.data.content.length; a++) {
                res.data.content[a].user_type = 1;
                res.data.content[a].type_status = "";
              }
            }
            that.setData({
              yxkh: res.data.content
            })
          },
          fail: function(res) {

          }
        })
      }
    })
    // 意向客户列表end


    // 获取分期数
    var url = app.globalData.url + "/api/crmperiods/getList";
    wx.request({
      url: url,
      method: 'post',
      data: {},
      success(res) {
        // console.log(res)
        var b = [];
        for (var a = 0; a < res.data.content.list.length; a++) {
          b.push(res.data.content.list[a].periods_number)
        }
        that.setData({
          limit: b
        })
      }
    })
    // 分期数end

    wx.getStorage({
      key: 'daohang',
      success: function(e) {
        if (e.data == []) {
          var a = [];
          a.push({
            user_type: 1,
            user_name: "",
            user_phone: "",
            user_level: "",
            f_number: "",
            money: "",
            limit_number: "",
            type_status: 1,
            cross_time: "",
            limit_date: "",
            status_desc: "",
          })
          that.setData({
            daohang: a
          });
        } else {
          that.setData({
            daohang: e.data
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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