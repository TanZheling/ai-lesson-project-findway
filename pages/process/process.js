//process.js
//获取应用实例
const app = getApp()

Page({
  data: {
  bgPic:null,
  text1:null,
  text2:null,
  
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
        text: [app.globalData.result,app.globalData.accuracy],
        success: res => {
          this.bgPic = res.path
          console.log(res.width)
          console.log(res.height)
          console.log(app.globalData.result)
          console.log(app.globalData.accuracy)
        }
      }),
        this.setData({
          bgPic: options.img,
          text1: app.globalData.result,
          text2: app.globalData.accuracy

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
