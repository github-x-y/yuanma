// miniprogram/pages/search2.js
const api=require('../../api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:"",
    books:[],
    zhangjielis:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '跟'+options.input+'相关的书'
    })
     this.setData({
       input:options.input
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.search2()
  },
  search2(){
    api.searchvalueUrl({
      query:this.data.input
    }).then(data=>{
      console.log(data)
      this.setData({
        books:data.books
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

  }
})