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

  /*
  nextPage:function(e){
    wx.navigateTo({
      url: '../process/process?img='+this.data.bgPic,
    })
    },
  */

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
    //////////与服务器对接
  nextPage: function (e) {
    var that = this;
    //将选择的图片作为全局数据
    app.globalData.bgPic = that.data.bgPic;
    wx.showToast({
      title: '正在处理', icon: 'loading', duration: 100000
    });

    /*wx.uploadFile({
      url: 'https://tanzheling.cn/', //服务器链接
      filePath: that.data.bgPic,
      method: 'POST',
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },

    })
*/

    var filePath = that.data.bgPic;
    console.log(filePath),
/*
wx.getSystemInfo({
	success: function(res){
		if(res.platform == 'android'){
      filePath = filePath.split('//')[1]  //安卓系统的解析方法
      console.log(filePath)
		}else{
      filePath = filePath//.split('.')[2] + filePath.match(/\.[^.]+?$/)[0]
      console.log(filePath)
		}
	}
})
*/
    wx.uploadFile({
      url: 'https://www.tanzheling.cn/upload', //服务器链接
      filePath: that.data.bgPic,
      name: 'file',
      //method: 'GET',
      header: {
        //'content-type': 'multipart/form-data'
        'content-type': 'application/json'
        //'content-type':'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        wx.hideToast();
        console.log(res.statusCode);
        if (res.statusCode == 200) {
          console.log(res.data);
          var json = res.data;
          console.log(typeof json);
          console.log(json==null);
          if (typeof json != 'object') {
            if (json != null) {
              json = json.replace("\ufeff", "");
              console.log(json);
              json = JSON.stringify(json);
              console.log(json);
             // json = encodeURIComponent(json);
             // console.log(json);
              var jj = JSON.parse(json);
              jj = JSON.parse(jj);
              console.log(jj);
              //json = decodeURIComponent(json);
             // console.log(json);
            }
          }   
        //  var jj = JSON.parse(json);//成功的话，对结果的data，将json字符串转为json对象
          console.log(jj);
          console.log('200');
          app.globalData.result = jj["prediction"]; //result存路名
          app.globalData.accuracy = jj["probability"]; //accuracy存结果准确度
          console.log(app.globalData.result);    
          console.log(app.globalData.accuracy);              
          wx.navigateTo({
            url: '../process/process',
          })
        } else {
         
         // wx.showModal({
           // title: '提示',
           // content: '服务器错误，请稍后重试！',
         // });
        }
      },
      fail: function (res) {
        console.log(res);
        console.log('bad news!!!!')
      }
    })

  },

  onLoad: function (options) {
      this.setData({
        bgPic: options.img
        
      })
    
  }
})
