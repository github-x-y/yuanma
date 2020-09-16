// miniprogram/pages/mulu/muli.js
const api=require('../../api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhangjielist:[],
    title:"",
    i:"",
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       title:options.title,
       i:options.a,
     })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mulu(this.data.title)
  },
  mulu:function(title){
    return api.pingccUrl({
      xsname:title
    }).then(data=>{
      console.log(data)
     for(let i = 0;i < data.list.length;i++){
         if(data.list[i].name=this.data.title){
            let  zhangjieurl=data.list[i].url
            return zhangjieurl
         }
     }
    }).then(data=>{
     return api.pingccUrl({
        xsurl1:data
      }).then(data=>{
        console.log(data)
        let zhangjielist = [
          data.list
        ]
        this.setData({
          zhangjielist:zhangjielist[0],
        })
        let url = zhangjielist[0][this.data.i].url
        return url
      })
    }).then(data=>{
      console.log(data)
      api.pingccUrl({
        xsurl2:data
      }).then(data=>{
        this.setData({
          content:data.content,
          num:data.num
        })
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
 click5:function(e){
   console.log(e)
  let c = this.data.title
  let d = e.currentTarget.dataset.index
   wx.redirectTo({
     url: '../../pages/read/read?title='+c+'&d='+d,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})