const api=require('../../api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      method: "",
      films:{},
      start:  0,
      count: 12,
      showlanding:false,
      total: "",
      showland: "",
      showload: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      method:options.method
    })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
       this.LoadListData();
  },
  LoadListData(){
    return api[this.data.method]({
      start: this.data.start,
      count: this.data.count
    }).then( data=>{
      console.log(data);
      let  list = this.data.films.list || []
      let films = {
        title: data.subject_collection.name,
        list: list.concat(data.subject_collection_items),
      }
      this.setData({
        films:films,
        start:this.data.start+this.data.count,
        total:data.total
      });
    }).catch(api.showerr);

  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  // onReachBottom:function(){
  //   console.log(dd)
  //   this.LoadListData();
  // },
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
    this.setData({
      showload:true
    })
     this.setData({
       start: 0,
       count: 12,
       films: 0
     })
     this.LoadListData()
     .then(()=>{
       this.setData({
        showload:false
       })
     })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.start < this.data.total){
    this.setData({
      showlanding:true
    })
      this.LoadListData()
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
  onShareAppMessage: function () {
      
  }
})