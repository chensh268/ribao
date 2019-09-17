// pages/return/return.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warn: []
  },
  onSearch(e) {
    var that = this;
    if (e.detail === "") {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else {
      var url = app.globalData.url + "/api/crmremind/getList";
      wx.request({
        url: url,
        method: "post",
        data: {
          remind_user: that.data.key.user_id,     
          remind_customer_name: e.detail
        },
        success(res) {
          // console.log(res);
          that.setData({
           warn: res.data.content.list
          })
        }
      })
    }
  },
  onCancel() {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          key: res.data
        })
        var url = app.globalData.url + "/api/crmremind/getList";
        wx.request({
          url: url,
          method: 'post',
          data: {
            remind_user: that.data.key.user_id        
          },
          success(res) {
            that.setData({
              warn: res.data.content.list
            })
          }
        })
      },
    })
  },
  getData() {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          key: res.data
        })
        var url = app.globalData.url + "/api/crmremind/getList";
        wx.request({
          url: url,
          method: 'post',
          data: {
            remind_user: that.data.key.user_id
          },
          success(res) {
            that.setData({
              warn: res.data.content.list
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})