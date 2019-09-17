// pages/writeCase/writeCase.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: ""
  },
  formSubmit(e) {
    var that = this;
    var value = e.detail.value;
    if (value.title === "") {
      wx.showToast({
        title: '请填写标题!',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else if (value.content === "") {
      wx.showToast({
        title: '请填写案例内容!',
        icon: 'loading',
        mask: true,
        duration: 1500
      })
    } else {
      wx.showToast({
        title: '提交中',
        icon: 'loading',
        mask: true,
        duration: 100000
      });
      var url = app.globalData.url + "/api/crmcase/saveOne";
      wx.request({
        url: url,
        method: "post",
        data: {
          title: value.title,
          content: value.content,
          user_id: that.data.key.user_id
        },
        success: function(res) {
          if (res.data.content == "账户密码不正确!") {
            wx.showToast({
              title: '账户密码不正确!',
              icon: 'loading',
              mask: true,
              duration: 1500
            })
          } else if (res.data.content == "当前用户不存在!") {
            wx.showToast({
              title: '当前用户不存在!',
              icon: 'loading',
              mask: true,
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              mask: true,
              duration: 100
            })
            that.setData({
              title: "",
              content: ""
            });
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '发布失败!',
            icon: 'loading',
            mask: true,
            duration: 1500
          })
        }
      })
    }


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