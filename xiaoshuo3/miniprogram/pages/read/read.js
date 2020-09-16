// miniprogram/pages/read/read.js
const api=require('../../api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    num:"",
    titles:"",
    i:"",
    title:"",
    winHeight:"",
    length:"",
    index:0,
    indexs:0,
    array: ['小','中','大'],
    arrays: ['白天','夜间'],
    index:'1',
    length:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title:options.title,
      i:options.d
  })
  wx.setNavigationBarColor({
    backgroundColor: '#ffff;',
    frontColor: '#000000',
  })
  wx.setNavigationBarTitle({
    title: options.title,
  })
  wx.getSystemInfo({
    success: (res => {
      console.log(res)
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
bindPickerChanges: function(e) {
  console.log(e)
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    indexs: e.detail.value,
  })
  let indexs=e.detail.value
  if(this.data.arrays[indexs]=='夜间'){
  wx.setNavigationBarColor({
    backgroundColor: '#000000',
    frontColor: '#000000',
  })
}else{
  wx.setNavigationBarColor({
    backgroundColor: '#ffff;',
    frontColor: '#000000',
  })
}
},
bindPickerChange: function(e) {
  console.log(e)
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    return api.pingccUrl({
      xsname:this.data.title
    }
    ).then(data=>{
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
        console.log(data)
        this.setData({
          content:data.content,
          num:data.num
        })
      })
    })
},
  click1:function(){
    let i = this.data.i
    this.setData({
      i:i++,
      num:this.data.zhangjielist[i].num,
      url:this.data.zhangjielist[i].url,
      i:i,
      titles:0
    })
    api.pingccUrl({
      xsurl2:this.data.url
    }).then(data=>{
      let content = data.content
      this.setData({
        content:content
      })
    })
  },
  click2:function(){
    let i = this.data.i
    // let  = i-=1
    this.setData({
      i:i--,
      num:this.data.zhangjielist[i].num,
      url:this.data.zhangjielist[i].url,
      i:i,
      titles:0
    })
    api.pingccUrl({
      xsurl2:this.data.url
    }).then(data=>{
      console.log(data.num)
      let content = data.content
      this.setData({
        content:content,
      })
    })
  },
  mulu:function(){
    let c = this.data.title
     let a = this.data.i
     let b =this.data.num
   wx.navigateTo({
     url: '../../pages/mulu/muli?title='+c+'&a='+a+'&b='+b,
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