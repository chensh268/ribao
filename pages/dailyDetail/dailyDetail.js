// pages/dailyDetail/dailyDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    state: ['通过', '拒绝', '审批中'],
    disabled: true, //到行客户input的disabled
    disabled2: true, //意向客户input的disabled
    add1: true, //到行客户的添加的wx：if
    add2: true, //意向客户的添加的wx：if
    edit1: true, //到行客户的修改的wx：if
    edit2: true, //意向客户的修改的wx：if
    daohang: [],
    yixiang: []
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
  // 两位小数点验证并双向绑定到行客户daohang
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

  // 两位小数点验证并双向绑定意向客户yixiang
  value2: function(e) {
    // console.log(e)
    var that = this;
    var id = e.currentTarget.id.split("-");
    var name = id[0];
    var index = parseFloat(id[1]);
    if (name == "money") {
      if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
        var value = e.detail.value;
      } else {
        var value = e.detail.value.substring(0, e.detail.value.length - 1);
        var name = "yixiang[" + index + "]." + name;
        that.setData({
          [name]: value
        })
      }
    } else {
      var value = e.detail.value;
    }
    that.data.yixiang[index][name] = value;
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
    var value2 = Date.parse(value);
    // console.log(value2)
    var name = "daohang[" + index + "].limit_date";
    that.setData({
      [name]: value2
    })
  },
  // 修改电话数量
  blur(e) {
    // console.log(e)
    var that = this;
    var url = app.globalData.url + "/api/crmwork/updateById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        work_id: that.data.a,
        all_number: e.detail.value
      },
      success(res) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
      }
    })
  },
  // 到行客户的增删改
  // 修改
  edit1(e) {
    // console.log(e)
    var that = this;
    that.setData({
      edit1: false,
      disabled: false
    })
  },
  // 保存
  save(e) {
    // console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;
    var value = that.data.daohang[index];
    var url = app.globalData.url + "/api/crmworkphone/updateById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        record_id: value.record_id,
        user_type: 1,
        type_status: value.type_status,
        status_desc: value.status_desc,
        user_name: value.user_name,
        user_phone: value.user_phone,
        money: value.money,
        limit_number: value.limit_number,
        limit_date: value.limit_date,
        user_level: value.user_level,
        cross_time: value.cross_time,
        f_number: value.f_number
      },
      success(res) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        that.setData({
          edit1: true,
          disabled: true
        })

        var dhsl = 0;
        var dhed = 0;
        var sptg = 0;
        var spze = 0;
        if (that.data.daohang !== []) {
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
        }
        var url = app.globalData.url + "/api/crmwork/updateById";
        wx.request({
          url: url,
          method: 'post',
          data: {
            work_id: that.data.a,
            arrival_number: dhsl,
            arrival_money: dhed,
            deal_number: sptg,
            deal_money: spze
          },
          success(res) {
            // console.log(res)
          }
        })

      }
    })
  },
  // 删除
  delete(e) {
    var that = this;
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    // console.log(index)
    var ids = e.currentTarget.dataset.item.record_id;
    var url = app.globalData.url + "/api/crmworkphone/deleteById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        ids: ids
      },
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        // that.data.daohang.splice(index,1)
        // var number = "daily.arrival_number";
        // that.setData({
        //   [number]: that.data.daohang.length
        // })
        var dhsl = 0;
        var dhed = 0;
        var sptg = 0;
        var spze = 0;
        if (that.data.daohang !== []) {
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
        }
        if (that.data.daohang !== []) {
          if (that.data.daohang[index].type_status == 1) {
            sptg = sptg - 1;
            spze = spze - that.data.daohang[index].money
          }
        }

        // console.log(dhsl-1)
        // console.log(dhed - that.data.daohang[index ].money)
        // console.log(sptg)
        // console.log(spze)
        var url = app.globalData.url + "/api/crmwork/updateById";
        wx.request({
          url: url,
          method: 'post',
          data: {
            work_id: that.data.a,
            arrival_number: dhsl - 1,
            arrival_money: dhed - that.data.daohang[index].money,
            deal_number: sptg,
            deal_money: spze
          },
          success(res) {
            // console.log(res)
          }
        })

      }
    })
  },
  // 添加到行客户
  add1() {
    var that = this;
    var a = that.data.daohang;
    a.push({
      user_type: 1,
      user_name: "",
      user_phone: "",
      user_level: 1,
      f_number: "",
      money: "",
      limit_number: 12,
      type_status: 1,
      cross_time: "",
      limit_date: null,
      work_desc: "",
    });
    that.setData({
      daohang: a,
      disabled: false,
      add1: false
    })

  },
  saveAdd1() {
    var that = this;
    that.setData({
      add1: true
    })
    if (that.data.daohang !== []) {
      var b = that.data.daohang.length - 1;
      var value = that.data.daohang[b]
    } else {
      var value = that.data.daohang[0]
    }
    var url = app.globalData.url + "/api/crmworkphone/saveOne";
    wx.request({
      url: url,
      method: 'post',
      data: {
        user_id: this.data.key.user_id,
        work_id: that.data.a,
        user_type: 1,
        type_status: value.type_status,
        status_desc: value.status_desc,
        user_name: value.user_name,
        user_phone: value.user_phone,
        money: value.money,
        limit_number: value.limit_number,
        limit_date: value.limit_date,
        user_level: value.user_level,
        cross_time: value.cross_time,
        f_number: value.f_number
      },
      success(res) {
        console.log(res.data.content)
        if (res.data.content == "请填写F码!") {
          wx.showToast({
            title: '请填写F码!',
            icon: 'loading'
          })
          that.setData({
            add1: false
          })
        } else if (res.data.content == "请输入正确格式的手机号！") {
          wx.showToast({
            title: '手机号有误',
            icon: 'loading'
          })
          that.setData({
            add1: false
          })
        } else if (res.data.content == "请勿提交重复数据!") {
          wx.showToast({
            title: '请勿提交重复数据!',
            icon: 'loading'
          })
          that.setData({
            add1: false
          })
        } else {
          wx.showToast({
            title: '添加成功',
            icon: 'success'
          })

          var dhsl = 0;
          var dhed = 0;
          var sptg = 0;
          var spze = 0;
          if (that.data.daohang !== []) {
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
          }
          var url = app.globalData.url + "/api/crmwork/updateById";
          wx.request({
            url: url,
            method: 'post',
            data: {
              work_id: that.data.a,
              arrival_number: dhsl,
              arrival_money: dhed,
              deal_number: sptg,
              deal_money: spze
            },
            success(res) {
              // console.log(res)
            },
            fail(e) {
              console.log(e)
            }
          })
        }
      }
    })
  },


  // 意向客户的增删改查
  // 修改
  edit2(e) {
    // console.log(e)
    var that = this;
    that.setData({
      edit2: false,
      disabled2: false
    })

  },
  // 保存
  save2(e) {
    // console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.index;
    var value = that.data.yixiang[index]
    var url = app.globalData.url + "/api/crmworkphone/updateById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        record_id: value.record_id,
        user_type: 2,
        status_desc: value.status_desc,
        user_name: value.user_name,
        user_phone: value.user_phone,
        money: value.money,
        user_level: value.user_level,
      },
      success(res) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        that.setData({
          edit2: true,
          disabled2: true
        })

        var yxze = 0;
        var yxsl = 0;
        if (that.data.yixiang !== []) {
          for (var a = 0; a < that.data.yixiang.length; a++) {

            if (that.data.yixiang[a].user_name == 0) {
              yxsl += 0;
            } else {
              yxsl++;
              if (that.data.yixiang[a].money == 0) {
                yxze += 0;
              } else {
                yxze += parseFloat(that.data.yixiang[a].money);
              }
            }
          }
        }
        var url = app.globalData.url + "/api/crmwork/updateById";
        wx.request({
          url: url,
          method: 'post',
          data: {
            work_id: that.data.a,
            intention_number: yxsl,
            intention_money: yxze
          },
          success(res) {
            // console.log(res)
          }
        })

      }
    })
  },
  // 删除
  delete2(e) {
    var that = this;
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    var ids = e.currentTarget.dataset.item.record_id;
    var url = app.globalData.url + "/api/crmworkphone/deleteById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        ids: ids
      },
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        var yxze = 0;
        var yxsl = 0;
        if (that.data.yixiang !== []) {
          for (var a = 0; a < that.data.yixiang.length; a++) {

            if (that.data.yixiang[a].user_name == 0) {
              yxsl += 0;
            } else {
              yxsl++;
              if (that.data.yixiang[a].money == 0) {
                yxze += 0;
              } else {
                yxze += parseFloat(that.data.yixiang[a].money);
              }
            }
          }
        }
        var url = app.globalData.url + "/api/crmwork/updateById";
        wx.request({
          url: url,
          method: 'post',
          data: {
            work_id: that.data.a,
            intention_number: yxsl - 1,
            intention_money: yxze - that.data.yixiang[index].money
          },
          success(res) {
            // console.log(res)
          }
        })
      }
    })
  },
  add2() {
    var that = this;
    var a = that.data.yixiang;
    a.push({
      "user_type": 2,
      "user_name": "",
      "user_phone": "",
      "user_level": 1,
      "money": "",
      "status_desc": ""
    });
    that.setData({
      yixiang: a,
      disabled2: false,
      add2: false
    })
  },
  saveAdd2() {
    var that = this;
    that.setData({
      add2: true
    })
    if (that.data.yixiang !== []) {
      var b = that.data.yixiang.length - 1;
      var value = that.data.yixiang[b]
    } else {
      var value = that.data.yixiang[0]
    }
    var url = app.globalData.url + "/api/crmworkphone/saveOne";
    wx.request({
      url: url,
      method: 'post',
      data: {
        user_id: this.data.key.user_id,
        work_id: that.data.a,
        user_type: 2,
        status_desc: value.status_desc,
        user_name: value.user_name,
        user_phone: value.user_phone,
        money: value.money,
        user_level: value.user_level,
      },
      success(res) {
        if (res.data.content == "请填写用户名!") {
          wx.showToast({
            title: '请填写用户名!',
            icon: 'loading'
          })
          that.setData({
            add2: false
          })
        } else if (res.data.content == "请填写用户手机号!") {
          wx.showToast({
            title: '请填写手机号!',
            icon: 'loading'
          })
          that.setData({
            add2: false
          })
        } else if (res.data.content == "请输入正确格式的手机号！") {
          wx.showToast({
            title: '手机号有误',
            icon: 'loading'
          })
          that.setData({
            add2: false
          })
        } else if (res.data.content == "请勿提交重复数据!") {
          wx.showToast({
            title: '请勿提交重复!',
            icon: 'loading'
          })
        } else {
          wx.showToast({
            title: '添加成功',
            icon: 'success'
          })
          var yxze = 0;
          var yxsl = 0;
          if (that.data.yixiang !== []) {
            for (var a = 0; a < that.data.yixiang.length; a++) {

              if (that.data.yixiang[a].user_name == 0) {
                yxsl += 0;
              } else {
                yxsl++;
                if (that.data.yixiang[a].money == 0) {
                  yxze += 0;
                } else {
                  yxze += parseFloat(that.data.yixiang[a].money);
                }
              }
            }
          }
          var url = app.globalData.url + "/api/crmwork/updateById";
          wx.request({
            url: url,
            method: 'post',
            data: {
              work_id: that.data.a,
              intention_number: yxsl,
              intention_money: yxze
            },
            success(res) {
              // console.log(res)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        // console.log(res)
        that.setData({
          key: res.data
        })
      },
    })

    that.setData({
      a: parseFloat(options.work_id.split('"')[1])
    })
    // console.log(a)
    var url = app.globalData.url + "/api/crmwork/getById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        work_id: that.data.a
      },
      success(res) {
        // console.log(res)
        that.setData({
          daily: res.data.content,
          daohang: res.data.content.phonesSuccess,
          yixiang: res.data.content.phonesIntention
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
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
    var that = this;
    var url = app.globalData.url + "/api/crmwork/getById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        work_id: that.data.a
      },
      success(res) {
        // console.log(res)
        that.setData({
          daily: res.data.content,
          daohang: res.data.content.phonesSuccess,
          yixiang: res.data.content.phonesIntention
        })
      }
    })

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