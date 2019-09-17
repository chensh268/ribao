// pages/daily/daily.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    current: 1,
    total: null

  },
  handleChange({
    detail
  }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        current: this.data.current + 1
      });
      this.getData();
    } else if (type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
      this.getData();
    }
  },

  // 搜索
  onSearch(e) {
    // console.log(e);
    var that = this;
    if (e.detail === "") {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else {
      var url = app.globalData.url + "/api/crmwork/getList";
      wx.request({
        url: url,
        method: 'post',
        data: {
          user_id: that.data.user_id,
          user_name: e.detail
        },
        success(res) {
          that.setData({
            daily: res.data.content.list,
            user_name: that.data.user_name
          })
        }
      })
    }

  },

  onCancel() {
    this.getData();
  },

  writeDaily() {
    wx.navigateTo({
      url: '../writeDaily/writeDaily',
    })
  },
  getData() {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        // console.log(res);
        var url = app.globalData.url + "/api/crmwork/getList";
        wx.request({
          url: url,
          method: 'post',
          data: {
            pageSize: 2,
            pageNum: that.data.current,
            user_id: res.data.user_id
          },
          success(res) {
            var a = Math.ceil(res.data.content.total / 2)
            that.setData({
              daily: res.data.content.list,
              total: a
            })
          }
        })

      },

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getData();
    wx.getStorage({
      key: 'key',
      success: function(res) {
        // console.log(res);
        that.setData({
          user_id: res.data.user_id
        })
      },
      fail(e) {
        // console.log(e)
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