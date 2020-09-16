// miniprogram/pages/search.js
const api=require('../../api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tag:[],
   i:0,
   b:10,
   input:"",
   his:[],
   inputvalue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     this.search()
  },
   search(){
      api.searchUrl()
      .then(data=>{
        console.log(data)
        let datas = data.searchHotWords
        let tag = []
        let i = this.data.i
        let b = this.data.b
        for(;i<b;i++){
           tag = tag.concat(datas[i])
        }
        this.setData({
           tag:tag
        })
      })
   },
   click:function(){
      if(this.data.b<100){
          this.setData({
            i : this.data.i+10,
            b: this.data.b+10
          })
          this.search()
      }else{
        this.setData({
          i:0,
          b:10
        })
        this.search()
      }
   },
   input:function(e){
     console.log(e)
      this.setData({
        input:e.detail.value
      })
   },
   cofirm:function(e){
     console.log(e)
     let input = this.data.input
    wx.navigateTo({
      url: "../../pages/search2/search2?input=" + input,
    })
    this.setData({
      input:""
    })
    let his = this.data.his || []
    this.setData({
      inputvalue:""
    })
   },
   click2:function(e){
    let input = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../../pages/search2/search2?input=" + input,
    })
   
    let his = this.data.his || []
    this.setData({
      his:his.concat(input)
    })
   },
   click3(){
     this.setData({
       his:[]
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