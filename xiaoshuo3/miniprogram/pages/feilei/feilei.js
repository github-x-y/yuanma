// miniprogram/pages/feilei/feilei.js
const api=require('../../api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    winHeight:0,
    male:[],
    female:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      wx.getSystemInfo({
    success: (res => {
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
    this.feilei()
  },
  feilei(){
    api.majorUrl().then( data=>{
      this.setData({
        male:data.male,
        female:data.female
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