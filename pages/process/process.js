//process.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },
  //事件处理函数
  
  back: function (e) {
    wx.navigateBack({
      delta: 0,
    })
    console.log('fanhui');
  },

  nextPage:function(e){
    wx.navigateTo({
      url: '../process/process',
    })
    },
  

    onLoad: function (options) {
      wx.getImageInfo({
        src: app.globalData.bgPic,
        text: app.globalData.result,
        success: res => {
          this.bgPic = res.path
          console.log(res.width)
          console.log(res.height)
          console.log(app.globalData.aestheticscore)
        }
      }),
        this.setData({
          bgPic: app.globalData.bgPic,
          text: app.globalData.aestheticscore
        })
    },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
