// pages/yixiang/yixiang.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yixiang: []
  },

  tianjia: function() {
    var that = this;
    var a = that.data.yixiang;
    a.push({
      "user_type": 2,
      "user_name": "",
      "user_phone": "",
      "user_level": "",
      "money": "",
      "status_desc": ""
    });
    that.setData({
      yixiang: a
    })
  },
  shanchu: function() {
    var that = this;
    var a = that.data.yixiang;
    a.pop();
    that.setData({
      yixiang: a
    })
  },
  // 两位小数点验证
  value: function(e) {
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
  formSubmit: function(e) {
    console.log(e)

    var that = this;
    console.log(that.data.yixiang)
    var yxze = 0;
    var yxsl = 0;
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
    var yxze = yxze.toFixed(2);
  
    for (var a = 0; a < that.data.yixiang.length; a++) {
      if (!(/^1[34578]\d{9}$/.test(that.data.yixiang[a].user_phone))){
        wx.showToast({
          title: '手机号有误',
          icon: 'loading'
        })
      } else if ((that.data.yixiang[a].user_name == "")|| (that.data.yixiang[a].user_phone == "") || (that.data.yixiang[a].money == "")){
        wx.showLoading({
          title: '名电话额度必填',
          icon: 'loading',
          mask: true,
          duration: 1500
        })
      }else{
        wx.setStorage({
          key: 'yixiang',
          data: that.data.yixiang,
          success: function () { },
          fail: function () { }
        })
        let pages = getCurrentPages(); //当前页面
        // console.log(pages)
        let prevPage = pages[pages.length - 2]; //上一页面
        prevPage.setData({ //直接给上移页面赋值
          yxkh: yxsl,
          yixiang: that.data.yixiang,
          yxze: yxze
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      }
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'yixiang',
      success: function(e) {
        if (e.data.length == 0) {
          that.setData({
            yixiang: [{
              "user_type": 2,
              "user_name": "",
              "user_phone": "",
              "user_level": "",
              "money": "",
              "remarks": ""
            }]
          });
        } else {
          that.setData({
            yixiang: e.data
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