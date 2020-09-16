// miniprogram/pages/detail/detail.js
const api=require('../../api/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     filmid: {},
     start: 0,
     count: 12,
     comment: [],
     total: "",
     showlanding: "",
     id: "",
     showland: "",
     like: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.data.id=options.filmid
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.loadfilmid()
  },
  loadfilmid(){
     api.loadfilminurl(this.data.id)
     .then(data=>{
        console.log(data)
        this.setData({
           filmid:data,
        })
     }).catch(api.showerr)
   this.loadcomment()
  },
  loadcomment(){
   return api.loadfilmpinglu(this.data.id,{
      start:this.data.start,
      count:this.data.count,
      order_by:'time'
   }).then(data=>{
      console.log(data)
      this.setData({
         start:this.data.start+data.count,
         comment:this.data.comment.concat(data.interests),
         total:data.total
      })
   }).catch(api.showerr)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  ShouChang(){
    if(!app.userInfo){
      wx.showModal({
         title: '提示',
         content: '请先登录'
      })
      return;
   }
     var like = wx.getStorageSync('like') || {};
     if(like[this.data.id]){
         wx.showToast({
           title: '您已经收藏了',
           image: '../../images/error.png'
         })
         return;
     }
     this.data.filmid.cover.url=this.data.filmid.pic.normal
     like[this.data.id] = this.data.filmid
     wx.setStorageSync('like',like )
     wx.showToast({
       title: '收藏成功',
       image: '../../images/success.png'
     })
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
     console.log('haha')
      if(this.data.start < this.data.total){
         this.setData({
            showlanding:true
          })
         
         this.loadcomment()
         .then(()=>{
            this.setData({
              showlanding:false
            })
          })
          }else{
            this.setData({
              showland:true
            })
      }
  },

  /**
   * 用户点击右上角分享
   */
})