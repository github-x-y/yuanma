// miniprogram/pages/index/index.js
const api=require('../../api/api');
Page({
  data:{
    types:[],
    id:"",
    paihang: [],
    male:"",
      type: 'hot',
      major:'玄幻',
      start:0,
      limit:6,
    femaletotal:"",
    maletotal:""
  },
  onReady: function () {
    this.loadhomepage()
    //  this.loadingfilm()
  },
  loadhomepage(){
    // api.loadfreefilmurl().then( data=>{
    //   console.log(data)
    //   this.setData({
    //     paihang:data.female
    //   })
    // })
    // api.tolalRank('5a323096fc84c2b8efab2482').then( data=>{
    //   console.log(data)
    // })
    // api.majorUrl().then( data=>{
    //   console.log(data)
    // })
    api.classUrl().then( data=>{
      console.log(data)
    })
  
    // api.loadfreefilmurl().then( data=>{
    //   console.log(data)
    // })
    api.mangguoufilm({
      gender:"male",
      type: 'hot',
      major:'玄幻',
      start:0,
      limit:6
    }).then( data=>{
      console.log(data)
      let type = {
        male:data.books,
      }
      this.setData({
        'types[0]':type,
        maletotal:data.total
      })
    })
    api.mangguoufilm({
      gender:'female',
      type: 'hot',
      major:'现代言情',
      start:0,
      limit:6
    }).then( data=>{
      console.log(data)
      let type = {
        male:data.books,
      }
      this.setData({
        'types[1]':type,
        femaletotal:data.total
      })
    })
  },
  click3:function(){
    if(this.data.limit<this.data.maletotal){
        this.setData({
          start: this.data.start+10,
        })
        api.mangguoufilm({
          type: 'hot',
          major:'玄幻',
          start:this.data.start,
          limit:6
        }).then( data=>{
          console.log(data)
          let type = {
            male:data.books,
          }
          this.setData({
            'types[0]':type,
            maletotal:data.total
          })
        })
    }else{
      this.setData({
        start:0
      })
    }
 },
 click4:function(){
  if(this.data.limit<this.data.femaletotal){
      this.setData({
        start: this.data.start+10,
      })
      api.mangguoufilm({
        gender:'female',
      type: 'hot',
      major:'现代言情',
      start:this.data.start,
      limit:6
      }).then( data=>{
        console.log(data)
        let type = {
          male:data.books,
        }
        this.setData({
          'types[1]':type,
          maletotal:data.total
        })
      })
  }else{
    this.setData({
      start:0
    })
  }
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (){

},
click7:function(){
  wx.navigateTo({
    url: '../../pages/search/search',
  })
}
})
