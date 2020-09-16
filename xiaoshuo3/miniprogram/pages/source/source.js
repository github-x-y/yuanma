// miniprogram/pages/source/source.js
const api=require('../../api/api');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    mouthRank:"",
    totalRank:"",
    scrollTop:0,
    week:[],
    mouth:[],
    all:[],
    current:0,
    winHeight: "",//窗口高度
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   this.setData({
     id:options._id,
     mouthRank:options.mouthRank,
     totalRank:options.totalRank,
     title:options.title
   })
   wx.getSystemInfo({
    success: (res => {
      console.log(res)
      var clientHeight = res.windowHeight,
        clientWidth = res.windowWidth,
        rpxR = 750 / clientWidth;
      var calc = clientHeight * rpxR;
      this.setData({
        winHeight: calc
      });
    })
  });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     wx.setNavigationBarTitle({
       title: this.data.title,
     })
     this.zhongbang()
  },
 zhongbang(){
  api.tolalRank(this.data.id).then( data=>{
    console.log(data)
    let week = {
      week:data.ranking.books
    }
    this.setData({
      week:week
    })
  })
  if(this.data.mouthRank){
  api.tolalRank(this.data.mouthRank).then( data=>{
    console.log(data)
    let mouth = {
      mouth:data.ranking.books
    }
    this.setData({
      mouth:mouth
    })
  })
}else{
  return
}
  api.tolalRank(this.data.totalRank).then( data=>{
    console.log(data)
    let all = {
      all:data.ranking.books
    }
    this.setData({
      all:all
    })
  })
 },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  click1:function(e){
    console.log(e)
    let current = e.target.dataset.current
    if(current == this.data.current){
       return;
    }else{
      this.setData({
        current:current
      })
    }
  },
})