// miniprogram/pages/mins/mins.js
const api=require('../../api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:"",
    major:"",
    gender:"",
    start:0,
    limit:12,
    minor:"",
    type:"hot",
    books:[],
    mins:[],
    minors:[],
    a:"",
    total:"",
    showload:"",
    showland:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:options.major,
     })
    this.setData({
      major:options.major,
      gender:options.gender
    })
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
    this.minor()
    this.setData({
      minor:'全部'
    })
  },
  minor(){
    return api.classUrl().then( data=>{
      this.setData({
        mins:data,
      })
      }).then(()=>{
        if(this.data.gender=='male'){
          let Data = this.data.mins.male
          console.log(Data)
          for(let a=0;Data.length>a;a++){
              if(Data[a].major==this.data.major){
                Data[a].mins.unshift('全部')
                this.setData({
                  minors:Data[a].mins
                })
              }
          }
     }else{
      let Data = this.data.mins.female
      console.log(Data)
      for(let a=0;Data.length>a;a++){
          if(Data[a].major==this.data.major){
            Data[a].mins.unshift('全部')
            this.setData({
              minors:Data[a].mins
            })
          }
      }
     }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.minor == '全部'){
      this.allsource(this.data.gender,this.data.type,this.data.major,'',this.data.start,this.data.limit)
     }else{
      this.allsource(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start,this.data.limit)
     }
  },
 allsource:function(gender,type,major,minor,start,limit){
  return api.mangguoufilm({
    gender:gender,
    type: type,
    major:major,
    minor:minor,
    start:start,
    limit:limit
  }).then( data=>{
    console.log(data)
    this.setData({
      books:this.data.books.concat(data.books),
      total:data.total
    })
  })
 },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  click:function(e){
    console.log(e)
    this.setData({
      start:0,
      limit:12,
      books:[],
      showland:false
    })
    this.setData({
      type:e.currentTarget.dataset.type
    })
    if(this.data.minor == '全部'){
      this.allsource(this.data.gender,this.data.type,this.data.major,'',this.data.start,this.data.limit)
     }else{
      this.allsource(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start,this.data.limit)
     }
  },
  click2:function(e){
     this.setData({
      start:0,
      limit:12,
       books:[],
       showland:false
     })
     console.log(e)
     if(e.currentTarget.dataset.mins !='全部'){
      this.setData({
        minor:e.currentTarget.dataset.mins
      })
     }else{
       this.setData({
         minor:'全部'
       })
     }
     if(this.data.minor == '全部'){
      this.allsource(this.data.gender,this.data.type,this.data.major,'',this.data.start,this.data.limit)
     }else{
      this.allsource(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start,this.data.limit)
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
  lower: function () {
    this.setData({
      showload:true
    })
    if(this.data.start < this.data.total){
       this.setData({
          start:this.data.start+12
        })
        if(this.data.minor == '全部'){
          this.allsource(this.data.gender,this.data.type,this.data.major,'',this.data.start,this.data.limit)
          .then(()=>{
            this.setData({
             showload:false
            })
          })
         }else{
          this.allsource(this.data.gender,this.data.type,this.data.major,this.data.minor,this.data.start,this.data.limit)
          .then(()=>{
            this.setData({
             showload:false
            })
          })
         }
    }else{
        this.setData({
          showload:false,
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