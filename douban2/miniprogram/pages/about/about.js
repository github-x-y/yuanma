// pages/about/about.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    like:{},
    showtisi: true
  },
  onShow(){
     let like = wx.getStorageSync('like')
     console.log(like)
     this.setData({
       like:like,
       showtisi:Object.keys(like).length == 0
     })
  },
 ShanChu:function(e){
    var like = e.target.dataset.id
    delete this.data.like[like]
    this.setData({
      like: this.data.like,
      showtisi:Object.keys(this.data.like).length == 0
    })
    wx.setStorageSync('like', this.data.like)
    
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(app.userInfo){
       this.setData({
         userInfo:app.userInfo
       })
      }else{
        app.userInfoReadyCallback = res =>{
          console.log(res)
          this.setData({
            userInfo:res.userInfo
          })
          
        }
      }
  },
  getuserinfo(e){
    console.log(e)
     let userInfo = e.detail.userInfo
     this.setData({
       userInfo:userInfo
     })
     app.userInfo=userInfo
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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

  }
})