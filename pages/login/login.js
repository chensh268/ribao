// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navigateToindex() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  getUserInfo(e) {
    // console.log(e)
    let that = this;
    // 点了允许
    if (e.detail.errMsg === 'getUserInfo:ok') {
      wx.login({
        fail: function() {
          wx.showToast({
            title: '无法获取到微信!',
            icon: 'loading',
            mask: true,
            duration: 1500
          });
        },
        success(res) {
          //res: code
          wx.setStorage({
            key: 'login',
            data: {
              rawData: e.detail.rawData, //用户非敏感信息
            },
          })
          var url = app.globalData.url + "/api/sysuser/obtainOpenId";
          wx.request({
            url: url,
            method: 'post',
            data: {
              code: res.code, //临时登录凭证
            },
            fail(res) {
              // console.log(res)
            },
            success(response) {
              var url = app.globalData.url + "/api/sysuser/login";
              wx.request({
                url: url,
                method: 'post',
                data: {
                  open_id: response.data.content.openid
                },
                success(res) {
                  // console.log(res)
                  wx.setStorage({
                    key: 'key',
                    data: res.data.content,
                    success: function() {
                      wx.redirectTo({ // 打开首页页面，无返回键
                        url: '../index/index'
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
            }
          })
        }
      })
    } else {
      // wx.showToast({
      //   title: '微信未授权!',
      //   icon: 'loading',
      //   mask: true,
      //   duration: 1500
      // })
      wx.redirectTo({
        url: '../index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this;
    // wx.getSetting({
    //   success(e) {
    //     // console.log(e);
    //     if (e.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success(e) {
    //           if (e.errMsg === 'getUserInfo:ok') {
    //             wx.login({
    //               fail: function() {
    //                 wx.showToast({
    //                   title: '无法获取到微信!',
    //                   icon: 'loading',
    //                   mask: true,
    //                   duration: 1500
    //                 });
    //               },
    //               success(res) {
    //                 //res: code
    //                 wx.setStorage({
    //                   key: 'login',
    //                   data: {
    //                     rawData: e.rawData, //用户非敏感信息
    //                   },
    //                 })
    //                 var url = app.globalData.url + "/api/sysuser/obtainOpenId";
    //                 wx.request({
    //                   url: url,
    //                   method: 'post',
    //                   data: {
    //                     code: res.code, //临时登录凭证
    //                   },
    //                   fail(res) {
    //                     // console.log(res)
    //                   },
    //                   success(response) {
    //                     var url = app.globalData.url + "/api/sysuser/login";
    //                     wx.request({
    //                       url: url,
    //                       method: 'post',
    //                       data: {
    //                         open_id: response.data.content.openid
    //                       },
    //                       success(res) {
    //                         // console.log(res)
    //                         wx.setStorage({
    //                           key: 'key',
    //                           data: res.data.content,
    //                           success: function() {
    //                             wx.redirectTo({ // 打开首页页面，无返回键
    //                               url: '../index/index'
    //                             })
    //                           },
    //                           fail: function() {
    //                             wx.showToast({
    //                               title: '数据错误!',
    //                               icon: 'loading',
    //                               mask: true,
    //                               duration: 1500
    //                             })
    //                           }
    //                         })
    //                       }
    //                     })
    //                   }
    //                 })
    //               }
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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