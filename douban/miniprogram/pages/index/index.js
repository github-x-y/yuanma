//index.js
const api=require('../../api/api.js');
Page({
  data: {
     types:{

     }
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

    setTimeout(() => {
      
    }, 3000);
    this.loadhomepage()
    //  this.loadingfilm()
  },
  //  loadingfilm(){
  //  wx.request({
  //    url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
  //    data:{
  //      start:0,
  //      count:6
  //  },
  //    success: res=>{
        // let type = {
        //   title: res.data.subject_collection.name,
        //   list: res.data.subject_collection_items
        // }
        // this.setData({
        //   'types[0]':type
        // });
  //    }
  //  })
  // },
  loadhomepage(){
    api.loadhotfilm({
      start: 0,
      count: 6
    }).then( data=>{
      let type = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      }
      this.setData({
        'types[0]':type
      });
    }).catch(api.showerr);
    api.loadlasthotfilm({
      start: 0,
      count: 6
    }).then( data=>{
      let type = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      }
      this.setData({
        'types[1]':type
      });
    }).catch(api.showerr);
    api.loadfreefilmurl({
      start: 0,
      count: 6
    }).then( data=>{
      let type = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      }
      this.setData({
        'types[2]':type
      });
    }).catch(api.showerr);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (){

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
