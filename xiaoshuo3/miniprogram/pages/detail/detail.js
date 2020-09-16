// miniprogram/pages/detail/detail.js
const api=require('../../api/api');
var app = getApp();
const db = wx.cloud.database().collection('db2')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    type:{},
    current:0,
    yunzhangjie:{},
    link:"",
    book_id:"",
    title:"",
    zhangjielist:[],
    content:"",
    first:{},
    shu:"加入书架",
    like:{},
    reviewUrl:[],
    total:"",
    booksource:"",
    gender:"",
    major:"",
    minor:"",
    zhuzi:[],
    length:"",
    limit:50,
    input:"",
    hiddenmodalput: true,
    pinglun:"",
    datalist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    console.log(options)
    this.setData({
      id:options.id,
      title:options.title
    })
    var like = wx.getStorageSync('like') || {};
    if(like[this.data.id]){
       this.setData({
         shu:'从书架中移除'
       })
    }
  },
  modalinput: function (e) {
    if(!app.userInfo){
      wx.showModal({
         title: '提示',
         content: '请先登录'
      })
      return;
   }
  this.setData({
    hiddenmodalput: !this.data.hiddenmodalput
  })
},
confirm: function (e) {
  let that = this
  this.setData({
    hiddenmodalput: !this.data.hiddenmodalput
  })
// 2. 构造查询语句
// collection 方法获取一个集合的引用
// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// get 方法会触发网络请求，往数据库取数据
return db.add({
  data:{
     title:that.data.title,
      name:app.userInfo.nickName,
      avatarUrl:app.userInfo.avatarUrl,
      content:this.data.input,
      time:that.getNowFormatDate()
  }
}).then(()=>{
  db.where({
    title: that.data.title
}).get({
  success: function(res) {
    that.setData({
      datalist:res.data.reverse()
    })
 }
})
})
},
haha(e){
this.setData({
  input:e.detail.value
})
},
getNowFormatDate: function() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
   strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
   " " + date.getHours() + seperator2 + date.getMinutes() +
   seperator2 + date.getSeconds();
  return currentdate;
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    db.where({
      title: that.data.title
  }).get({
    success: function(res) {
      that.setData({
        datalist:res.data.reverse()
      })
   }
  })
   this.detailpage()
   this.booksource()
  },
  detailpage(){
   api.atocUrl({
    book: this.data.id,
    view: "summary"
  })
  .then(data=>{
  this.setData({
    book_id:data[1]._id
  }) 
  })
   api.detailfilmurl(this.data.id)
   .then(data=>{
      this.setData({
        type:data,
        gender:data.gender[0],
        major:data.majorCate,
        minor:data.minorCateV2
      })
   })
  return api.reviewUrl({
    book: this.data.id,
    start: 0,
    limit: 10,
    sort: "updated"
   }).then(data=>{
    this.setData({
      reviewUrl:data.reviews,
      total:data.total
    })
   })
 },
 booksource(){
   this.detailpage().then(()=>{
   return api.mangguoufilm({
      type: 'hot',
      gender:this.data.gender,
      major:this.data.major,
      minor:this.data.minor,
      start:0,
      limit:this.data.limit
    }).then( data=>{
      this.setData({
        booksource:data.books,
      })
      let length = this.data.limit
      return length
    })
   }).then(data=>{
     console.log(data)
     for(let i =0;9 > i;i++){
    let a = Math.floor(Math.random()*data)
    let shuzi = this.data.shuzi || []
      let shuzis = shuzi.concat(a)
      this.setData({
        shuzi:shuzis
      })
     }
   })
 },
click6(){
  this.setData({
    shuzi:[]
  })
  this.booksource()
},
click4:function(){
  if(!app.userInfo){
    wx.showModal({
       title: '提示',
       content: '请先登录'
    })
    return;
 }
  let c = this.data.title
  let d = 0
   wx.navigateTo({
     url: '../../pages/read/read?title='+c+'&d='+0,
   })
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
      var id = this.data.id
      delete like[id]
    this.setData({
      shu:'加入书架'
    })
    wx.setStorageSync('like', like)   
    }else{
      like[this.data.id] = this.data.type
      wx.setStorageSync('like',like )
      this.setData({
        shu:'从书架中移除'
       })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})