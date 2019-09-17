// pages/myPerformance/myPerformance.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    performance: []
  },
  getData() {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          key: res.data
        })
        var url = app.globalData.url + "/api/sysuser/getMyPerformance";
        wx.request({
          url: url,
          method: 'post',
          data: {
            user_id: that.data.key.user_id
          },
          success(res) {
            if (res.data.content !== []) {
              var money1 = 0;
              var money2 = 0;
              var money3 = 0;
              var bonus = 0;
              for (var a = 0; a < res.data.content.length; a++) {
                money1 += res.data.content[a].money1;
                money2 += res.data.content[a].money2;
                money3 += res.data.content[a].money3;
                bonus += res.data.content[a].bonus;
              }
              that.setData({
                performance: res.data.content,
                money1:money1,
                money2: money2,
                money3: money3,
                bonus: bonus
              })
            }

          }
        })
      },
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