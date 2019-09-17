// pages/cusDetail/cusDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer: [],
    record: [],
    add: true
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
  // 时间1的改变
  changeTime1: function(e) {
    // console.log(e)
    var that = this;
    var index = e.currentTarget.id.split("-")[1];
    var value = e.detail.value;
    var name = "record[" + index + "].back_date";
    that.setData({
      [name]: value
    })
  },
  // 两位小数点验证
  value: function(e) {
    var that = this;
    var id = e.currentTarget.id.split("-");
    console.log(id)
    var name = id[0];
    var index = parseFloat(id[1]);
    if (name == "customer_use") {
      if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
        var value = e.detail.value;
        var name2 = "record[" + index + "]." + "customer_surplus";
        that.setData({
          [name2]: that.data.customer.customer_limit - value
        })
      } else {
        var value = e.detail.value.substring(0, e.detail.value.length - 1);
        var name = "record[" + index + "]." + name;
        that.setData({
          [name]: value

        })
      }
    } else {
      var value = e.detail.value;
    }
    that.data.record[index][name] = value;
  },
  add() {
    var that = this;
    var a = that.data.record;
    a.push({
      back_date: "",
      sales_name: that.data.key.real_name,
      customer_use: "",
      customer_surplus: "",
      back_desc: ""
    });
    that.setData({
      record: a,
      add: false
    })
  },
  save() {
    var that = this;
    that.setData({
      add: true
    }) 
    console.log(that.data.record); 
    if (that.data.record !== []) {
      var b = that.data.record.length - 1;
      var value = that.data.record[b]
    }
    var url = app.globalData.url + "/api/crmcustomerback/saveOne";
    wx.request({
      url: url,
      method: 'post',
      data: {
        sales_id: that.data.key.user_id,
        // sales_id: 9,
        customer_id: that.data.customer_id,
        back_date: value.back_date,
        back_desc: value.back_desc,
        customer_limit: that.data.customer.customer_limit,
        customer_use: value.customer_use,
        customer_surplus: value.customer_surplus,
      },
      success(res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var a = parseFloat(options.customer_id.split('"')[1]);
    that.setData({
      customer_id: a
    })
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          key: res.data
        })
      },
    })
    var url = app.globalData.url + "/api/crmcustomer/getById";
    wx.request({
      url: url,
      method: 'post',
      data: {
        customer_id: a
      },
      success(res) {
        // console.log(res)
        that.setData({
          customer: res.data.content,
        })
        if(res.data.content.backList!==null){
          that.setData({
            record: res.data.content.backList
          })
        }else{
          that.setData({
            record: []
          })
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