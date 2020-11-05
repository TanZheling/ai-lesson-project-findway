//choice.js
//获取应用实例
const app = getApp()

Page({
  data:{

  },
  //事件处理函数
beginTest: function(){
  wx.navigateTo({
    url: '../choice2/choice2'
  }
  )
}
})