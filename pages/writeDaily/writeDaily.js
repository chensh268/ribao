// pages/writeDaily/writeDaily.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    bankType: [],
    subBank: [],
    businessType: [],
    index1: null, //银行类别的index 
    index2: null, //所属支行的index
    index3: null, //业务分类的index
    phonesSuccess: [],
    dhsl: "",
    yxkh: "",
    daohang: [],
    yixiang: []
  },
  formSubmit(e) {
    // console.log(e)
    var that = this;
    var value = e.detail.value;
    if (value.time === "") {
      wx.showToast({
        title: '请选择时间',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else if (value.bankType === "") {
      wx.showToast({
        title: '请选择银行!',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else if (value.subBank == "") {
      wx.showToast({
        title: '请填写支行!',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else if (value.businessType === 0) {
      wx.showToast({
        title: '请选择业务!',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else if (value.phoneNum == "") {
      wx.showToast({
        title: '请填写电话数!',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else {
      if (that.data.dhsl !== 0 && that.data.dhsl !== "") {
        var phonesSuccess = that.data.phonesSuccess;
        if (that.data.daohang !== []) {
          for (var a = 0; a < that.data.daohang.length; a++) {
            phonesSuccess.push(that.data.daohang[a]);
          }
        } else {
          phonesSuccess = [];
        }

      }
      if (that.data.yxkh !== 0 && that.data.yxkh !== "") {
        var phonesSuccess = that.data.phonesSuccess;
        if (that.data.yixiang !== []) {
          for (var a = 0; a < that.data.yixiang.length; a++) {
            phonesSuccess.push(that.data.yixiang[a]);
          }
        } else {
          phonesSuccess = [];
        }

      }
      var url = app.globalData.url + "/api/crmwork/saveOne";
      wx.request({
        url: url,
        method: 'post',
        data: {
          user_id: that.data.key.user_id,
          create_time: e.detail.value.time,
          bank_id: that.data.subBank_id[that.data.index2],
          type_id: that.data.business_id[that.data.index3],
          all_number: e.detail.value.phoneNum,
          arrival_number: that.data.dhsl, //到行数量
          arrival_money: that.data.dhed, //到行金额
          deal_number: that.data.sptg, //审批通过
          deal_money: that.data.spze, //审批金额
          intention_number: that.data.yxkh, //意向客户
          intention_money: that.data.yxze, //意向金额
          phonesSuccess: that.data.phonesSuccess,
          work_desc: e.detail.value.work_desc
        },
        success(res) {
          if (res.data.content == "今日已填写过日报,请勿多次提交!") {
            wx.showToast({
              title: '请勿多次提交！',
              icon: 'loading',
              mask: true,
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            })
            wx.removeStorage({
              key: 'daohang',
              success: function(res) {},
            })
            wx.removeStorage({
              key: 'yixiang',
              success: function(res) {},
            })
            that.setData({
              phonesSuccess: [],
              dhsl: "",
              dhed: "",
              sptg: "",
              spze: "",
              zhl: "",
              yxkh: "",
              yxze: ""
            })
          }

        },
        fail() {
          that.setData({
            phonesSuccess: []
          })
        }
      })
    }


  },
  bindDateChange: function(event) {
    // console.log(event);
    this.setData({
      date: event.detail.value
    })
  },
  bankTypeChange(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  subBankChange(e) {
    // console.log(e)
    this.setData({
      index2: e.detail.value
    })
  },
  businessTypeChange(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  navigateBank() {
    wx.navigateTo({
      url: '../bankCustom/bankCustom',
    })
  },
  navigateIntention() {
    wx.navigateTo({
      url: '../intentionCustom/intentionCustom',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取个人的user_id
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          key: res.data
        })
      },
    })
    // 获取银行类别和支行
    var url = app.globalData.url + "/api/crmbank/getList";
    wx.request({
      url: url,
      method: 'post',
      data: {},
      success(res) {
        console.log(res)
        var bank = res.data.content.list;
        var sub = [];
        for (var a = 0; a < bank.length; a++) {
          for (var f = 0; f < bank[a].list.length; f++) {
            sub.push(bank[a].list[f])
          }
        }
        var b = [];
        var c = [];
        var d = [];
        var e = [];
        for (var a = 0; a < bank.length; a++) {
          b.push(bank[a].bank_name);
          c.push(bank[a].bank_id);
        }
        for (var a = 0; a < sub.length; a++) {
          d.push(sub[a].bank_name);
          e.push(sub[a].bank_id);
        }
        that.setData({
          bankType: b,
          bank_id: c,
          subBank: d,
          subBank_id: e
        })

      }
    })
    // 获取业务类型
    var url = app.globalData.url + "/api/sysworktype/getList";
    wx.request({
      url: url,
      method: 'post',
      data: {},
      success(res) {
        // console.log(res)
        var b = [];
        var c = [];
        res.data.content.list.forEach(item => b.push(item.type_name));
        res.data.content.list.forEach(item => c.push(item.type_id));
        that.setData({
          businessType: b,
          business_id: c
        })
        // console.log(that.data.businessType);
        // console.log(that.data.business_id);
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
    wx.removeStorage({
      key: 'yixiang',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'daohang',
      success: function(res) {},
    })
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