//app.js
App({
  data:{
    userInfo:null
  },
  onLaunch:function(){
     wx.getSetting({
       success: res=>{
         console.log(res)
         if(res.authSetting['scope.userInfo']){
              wx.getUserInfo({
                success: res=>{
                  console.log(res)
                  this.userInfo=res.userInfo
                  if(this.userInfoReadyCallback){
                    this.userInfoReadyCallback(res)
                  }
                }
              })
         }
       }
     })
  }
})