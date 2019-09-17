// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 4, //默认选中第一个tabbar
    modal1: false,
    modal2: false,
    userInfo: null
  },
  //底部导航点击四个tabbar
  tap1() {
    this.setData({
      modal2: false,
      modal1: false,
      current: 1
    })
    wx.redirectTo({
      url: '../index/index',
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
  },
  hideModal() {
    this.setData({
      modal1: false,
      modal2: false,
      current: 4
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
  navigateLogin() {
    wx.redirectTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取头像、姓名、手机号以及三个提成
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })  
      },
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
    wx.getStorage({
      key: 'key',
      success: function(res) {
        // console.log(res.data.open_id)
        var url = app.globalData.url + "/api/sysuser/login";
        wx.request({
          url: url,
          method: 'post',
          data: {
            open_id: res.data.open_id
          },
          success(res) {
            console.log(res)
            wx.setStorage({
              key: 'key',
              data: res.data.content,
              success: function() {
                that.setData({
                  userInfo: res.data.content
                })
              },
              fail: function() {
                wx.showToast({
                  title: '数据错误!',
                  icon: 'loading',
                  mask: true,
                  duration: 1500
                })
              }
            })
          }
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
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