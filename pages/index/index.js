//index.js

import videosAPI from '../../api/videos.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    autoplay: true,
    duration: 1000,
    interval: 5000,
    indicatorDots: true,
    videos : [],
    pages : 1,
    imgUrls: [
      '../../images/swiper-1.jpg',
      '../../images/swiper-2.jpg',
      '../../images/swiper-3.jpg',
    ]
  },

  //事件处理函数
  onVideoClick(event) {
    event.target.dataset.alphaBeta;
    wx.navigateTo({
      url: '../video/video'
    })
  },

  onLoad() {
    this.refresh();
  },

  reloadVideos() {
    wx.showNavigationBarLoading()
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); this.refresh(); }, 2000);
    console.log('loadVideos');
  },

  loadMoreVideos() {
    wx.showNavigationBarLoading();
    let that = this;
    setTimeout(function () { wx.hideNavigationBarLoading();  
      that.setData({
        videos: [...that.data.videos, ...videosAPI.loadVideos(that.data.page, 10).data],
        page: that.data.page ++
      })
    }, 1000);
    console.log("loadMoreVideos")
  },

  refresh() {
    this.setData({
      videos: videosAPI.loadVideos(1, 10).data,
      page: 1
    }); 
  },
})
