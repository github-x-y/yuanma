const allurl = {
  hotUrl: "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
  lasthotUrl: "https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items",
  freefilmurl:"https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items",
  filminurl: "https://m.douban.com/rexxar/api/v2/movie",
  filmpinglunUrl:"https://m.douban.com/rexxar/api/v2/movie/电影ID/interests"
}
const showerr = function(error){
  wx.showToast({
    title: '加载失败',
    image: '../../images/error.png'
  })
}
const loadhotfilm = function(pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.hotUrl,
      data: pararms,
      success: resolve,
      fail:reject
    })
    }).then( res => {
      console.log(res)
      if(res.statusCode == 200){
        res.data.method='loadhotfilm';
          return res.data;
      }else{
         Promise.reject({
           message: res.errMsg
      });
      }   
    })
}
const loadlasthotfilm = function(pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.lasthotUrl,
      data: pararms,
      success: resolve,
      fail:reject
    })
    }).then( res => {
      if(res.statusCode == 200){
          res.data.method='loadlasthotfilm';
          return res.data;
      }else{
         Promise.reject({
           message: res.errMsg
      });
      }   
    })
}
const loadfreefilmurl = function(pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.freefilmurl,
      data: pararms,
      success: resolve,
      fail:reject
    })
    }).then( res => {
      if(res.statusCode == 200){
          res.data.method='loadfreefilmurl';
          return res.data;
      }else{
         Promise.reject({
           message: res.errMsg
      });
      }   
    })
} 
module.exports={
  loadhotfilm,
  showerr,
  loadlasthotfilm,
  loadfreefilmurl
}
