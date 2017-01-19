import videoAPI from '../../api/video.js'
import WxParse from '../../wxParse/wxParse.js'

//获取应用实例
var app = getApp()
Page({
  data: {
    video: {},
    navTab: ["字幕", "讲解", "评论"],
    currentNavtab: "0",
    isLoading: true,
  },

  onLoad(options) {
    const v = videoAPI.loadVideoById(options.id);
    const frsArray = v.parsed_content.split('||');
    const length = frsArray.length;
    for (let i = 0; i < length; i++) {
      WxParse.wxParse('fr' + i, 'html', frsArray[i], this);
      if (i === length - 1) {
        WxParse.wxParseTemArray("frs", 'fr', length, this)
      }
    }
    // WxParse.wxParse('frs[' + key + ']', 'html', this.data.test, this);
    this.setData({
      video: v,
    })
  },

  onReady() {
  },

  switchTab(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  showDict(e) {
   console.log('clicked', e.currentTarget);
  }
})
