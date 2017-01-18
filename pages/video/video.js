import videoAPI from '../../api/video.js'

//获取应用实例
var app = getApp()
Page({
  data: {
    video: {}
  },
  
  onLoad(options) {
  	this.setData({
  		video: videoAPI.loadVideoById(options.id)
  	})
  },

  onReady: function() {
  }
})
