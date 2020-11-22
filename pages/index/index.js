//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    actionSheetHidden: true,
    bgPic:null
  },
  //事件处理函数
  
  actionSheetTap: function(e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照','相册选择'],
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
        
      },
    }) 
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
          url: '../navigater/navigater?img='+that.data.bgPic,
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
          url: '../navigater/navigater?img='+that.data.bgPic,
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

 
})
