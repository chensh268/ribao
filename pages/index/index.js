//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 1, //默认选中第一个tabbar
    modal1: false,
    modal2: false,
    currentTab: 'tab1',

    order_by: 0,
    accord_to: 6,
    time: 2,
    ribao: []
  },
  handleChange(e) {
    this.setData({
      currentTab: e.detail.key
    });
    if (e.detail.key === "tab1") {
      this.setData({
        time: 3
      })
    } else if (e.detail.key === "tab2") {
      this.setData({
        time: 2
      })
    } else if (e.detail.key === "tab3") {
      this.setData({
        time: 1
      })
    } else if (e.detail.key === "tab4") {
      this.setData({
        time: 0
      })
    }
  },
  scroll(e) {
    var a = e.detail.scrollLeft;
    this.setData({
      scrollLeft: a
    })
  },
  phoneNum() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 0,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 0,
        order_by: 0
      })
    }
    that.getData();
  },
  intentionNum() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 6,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 6,
        order_by: 0
      })
    }
    that.getData();
  },
  intentionMoney() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 7,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 7,
        order_by: 0
      })
    }
    that.getData();
  },
  rate1() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 8,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 8,
        order_by: 0
      })
    }
    that.getData();
  },
  bankNum() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 1,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 1,
        order_by: 0
      })
    }
    that.getData();
  },
  bankMoney() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 2,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 2,
        order_by: 0
      })
    }
    that.getData();
  },
  passNum() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 3,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 3,
        order_by: 0
      })
    }
    that.getData();
  },
  passMoney() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 4,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 4,
        order_by: 0
      })
    }
    that.getData();
  },
  rate2() {
    let that = this;
    if (that.data.order_by == 0) {
      that.setData({
        accord_to: 5,
        order_by: 1
      })
    } else if (that.data.order_by == 1) {
      that.setData({
        accord_to: 5,
        order_by: 0
      })
    }
    that.getData();
  },

  //底部导航点击四个tabbar
  tap1() {
    this.setData({
      modal2: false,
      modal1: false,
      current: 1
    })
  },
  tap2() {
    this.setData({
      modal2: false,
      modal1: !(this.data.modal1),
      current: 2
    })
  },
  tap3() {
    this.setData({
      modal1: false,
      modal2: !(this.data.modal2),
      current: 3
    })
  },
  tap4() {
    this.setData({
      modal2: false,
      modal1: false,
      current: 4
    })
    wx.redirectTo({
      url: '../my/my',
    })
  },

  hideModal() {
    this.setData({
      modal1: false,
      modal2: false,
      current: 1
    })
  },
  navigateDaily() {
    wx.navigateTo({
      url: '../daily/daily',
    })
  },
  navigateCase() {
    wx.navigateTo({
      url: '../case/case',
    })
  },
  navigateWarning() {
    wx.navigateTo({
      url: '../warning/warning',
    })
  },
  navigateReturn() {
    wx.navigateTo({
      url: '../return/return',
    })
  },
  navigateCustomerpool() {
    wx.navigateTo({
      url: '../customer-pool/customer-pool',
    })
  },
  getData() {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          key:res.data
        })
        var url = app.globalData.url + "/api/crmwork/getLeaderBoard";
        wx.request({
          url: url,
          method: "post",
          data: {
            user_id: that.data.key.user_id,
            accord_to: that.data.accord_to,
            order_by: that.data.order_by
          },
          success: function (res) {
            var b = [];
            b.push(res.data.years);
            b.push(res.data.month);
            b.push(res.data.week);
            b.push(res.data.yesterday);
            that.setData({
              ribao: b
            })
          }
        })
      },
      fail(e){
        var url = app.globalData.url + "/api/crmwork/getLeaderBoard";
        wx.request({
          url: url,
          method: "post",
          data: {
            user_id: 0,
            accord_to: that.data.accord_to,
            order_by: that.data.order_by
          },
          success: function (res) {
            var b = [];
            b.push(res.data.years);
            b.push(res.data.month);
            b.push(res.data.week);
            b.push(res.data.yesterday);
            that.setData({
              ribao: b
            })
          }
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
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
    this.getData();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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