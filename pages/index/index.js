//index.js
//获取应用实例
const app = getApp()
var items=['拍照','我的']
Page({
  data: {
    actionSheetHidden: true,
    actionSheetItems: items,
    bgPic:null
  },
  //事件处理函数
  
  actionSheetTap: function(e) {
    var that = this;
    wx.showActionSheet({

      itemList: ['拍照','相册选择','取消'],

      success(res) {

        console.log(res.tapIndex)

        if (res.tapIndex == 0) 
        {
          that.chooseImageFromCamera();
        }
        if (res.tapIndex == 1) 
        {
          that.chooseImageFromPhotoAlbum();
        }
        if(res.tapIndex ==2)
        {

        }
      },

    }) 
      
  },

 



  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
    console.log("点击ation-sheet-cancel，会触发action-sheet绑定的事件。在这里可以通过改变hidden控制菜单的隐藏");
  },

  chooseImageFromCamera() {

    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],

      success: function (res) {
        console.log(res);
        that.setData({
          bgPic: res.tempFilePaths[0]
        });
        wx.navigateTo({
          url: '../navigater/navigater?img='+this.data.bgPic,
        });
      },

    })
  },

  chooseImageFromPhotoAlbum() {

    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],

      success: function (res) {
        console.log(res);
        that.setData({
          bgPic: res.tempFilePaths[0]
        });
        wx.navigateTo({
          url: '../navigater/navigater?img='+this.data.bgPic,
        });
      },

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

  navigater: function (e) {
    wx.navigateTo({
      url: '../navigater/navigater',
    })
    console.log('zhanshi');
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
