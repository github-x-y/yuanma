const allurl = {
    leixing:'https://api.zhuishushenqi.com/ranking/gender/',
    allUrl: 'https://api.zhuishushenqi.com/cats/lv2/statistics', //分类
    rankingUrl: 'https://api.zhuishushenqi.com/ranking/',  //排行榜
    classUrl: 'https://api.zhuishushenqi.com/cats/lv2/', //分类
    detailUrl: 'https://api.zhuishushenqi.com/book/',  //小说详情
    reviewUrl: 'https://api.zhuishushenqi.com/post/review/by-book',  //书评
    categoryUrl:"https://api.zhuishushenqi.com/book/by-categories",
   atocUrl :"https://api.zhuishushenqi.com/atoc/", //书源
   mixAtocUrl :"https://api.zhuishushenqi.com/mix-atoc/", //章节
    chapterUrl:"https://chapterup.zhuishushenqi.com/chapter/", //书籍内容
    searchUrl:"https://api.zhuishushenqi.com/book/search-hotwords", //查询
    pingccUrl:"https://api.pingcc.cn", //查询
    searchvalueUrl:"https://api.zhuishushenqi.com/book/fuzzy-search"
}
const  chapterUrl = function(link){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.chapterUrl+link,
      data:link,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const  searchvalueUrl = function(pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.searchvalueUrl,
      data:pararms,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const  mixAtocUrl = function(id,pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.mixAtocUrl+id,
      data:pararms,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const  reviewUrl = function(pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.reviewUrl,
      data:pararms,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const  searchUrl = function(){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.searchUrl,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const  pingccUrl = function(pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.pingccUrl,
      data:pararms,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const majorUrl  = function(){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.allUrl,
      success: resolve,
      fail:reject
    })
}).then( res => {
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const atocUrl  = function(id,pararms={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.atocUrl+id,
      data:pararms,
      success: resolve,
      fail:reject
    })
}).then( res => {
  console.log(res)
  if(res.statusCode == 200){
      return res.data;
  }else{
     Promise.reject({
       message: res.errMsg
  });
  }   
})
}
const detailfilmurl = function(id){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.detailUrl+id,
      data:id,
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
const loadfreefilmurl = function(){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: allurl.leixing,
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
  const tolalRank = function(id){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: allurl.rankingUrl+id,
        data:id,
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
  const mangguoufilm = function(pararms={}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: allurl.categoryUrl,
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
  const classUrl = function(){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: allurl.classUrl,
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
  loadfreefilmurl,
  mangguoufilm,
  tolalRank,
  detailfilmurl,
  // zhangjie,
  // yunzhangjie,
  atocUrl,
  pingccUrl,
  majorUrl,
  classUrl,
  searchUrl,
  searchvalueUrl,
  reviewUrl,
  mixAtocUrl,
  chapterUrl
}

