//navigater.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bgPic:null
  
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
      url: '../process/process?img='+this.data.bgPic,
    })
    },
  
  chooseImage:function(e){
    var source = e.currentTarget.dataset;
    var srcType = source.way;
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [srcType],
      success: function (res) {
        console.log(res);
        _this.setData({
          bgPic: res.tempFilePaths[0]
        });
      }
    })
  },
  /*  //////////与服务器对接
  nextPage: function (e) {
    var that = this;
    //将选择的图片作为全局数据
    app.globalData.bgPic = that.data.bgPic;
    wx.showToast({
      title: '正在处理', icon: 'loading', duration: 100000
    });
    wx.uploadFile({
      url: '', //服务器链接
      filePath: that.data.bgPic,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        // console.log(res.data);
        wx.hideToast();
        if (res.statusCode == 200) {
          var jj = JSON.parse(res.data);//成功的话，对结果的data，将json字符串转为json对象
          console.log('200');
          app.globalData.result = jj["roadname"]; //result存路名
          app.globalData.accuracy = jj["accuracy"]; //accuracy存结果准确度
          console.log(app.globalData.result);    
          console.log(app.globalData.accuracy);              
          wx.navigateTo({
            url: '../process/process',
          })
        } else {
          
          wx.showModal({
            title: '提示',
            content: '服务器错误，请稍后重试！',
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
*/
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        bgPic: options.img
        
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
