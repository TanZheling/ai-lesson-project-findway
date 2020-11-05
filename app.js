//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    bgPic:null,
    result:null,
    accuracy:null,
    questions: [
      { "question": "../../../image/001.jpg", "option": { "A": "教五前的路", "B": "万林附近的路", "C": "自强大道", "D": "弘毅大道" }, "true": "B" },
      { "question": "../../../image/002.jpg", "option": { "A": "文体路", "B": "学府路", "C": "梅园一路", "D": "自强大道" }, "true": "A" },
      { "question": "../../../image/003.jpg", "option": { "A": "桂园路", "B": "樱花大道", "C": "梅操旁的路", "D": "奥场旁的路" }, "true": "D" },
      { "question": "../../../image/004.jpg", "option": { "A": "珞珈山路", "B": "自强大道", "C": "人文路", "D": "梅园二路" }, "true": "B" },
    ]
  }
})