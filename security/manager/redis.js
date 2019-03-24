let Roles =require('../../static-archi/roles')
module.exports={
 getRandom : function(){
return Math.floor(100000000 + Math.random() * 900000000);
},

createSeesion:async function(user){
 
   let exist=await global.REDIS_CLIENT.existsAsync('userID:'+user._id) 
   let data={}
   if(!exist){
        let sid=this.getRandom()
        data.session=sid
        data.user=user
        await global.REDIS_CLIENT.lpushAsync('userID:'+user._id,sid) 
        await global.REDIS_CLIENT.expireAsync('userID:'+user._id,86400) 

        await global.REDIS_CLIENT.HMSETAsync('sid:'+sid,'role',user.role,'usage',0) 
        await global.REDIS_CLIENT.expireAsync('sid:'+sid,86400)

   }else{
       let usage= await  global.REDIS_CLIENT.lrangeAsync('userID:'+user._id,0,-1)    
       
        if(usage.length>=3 && !usage.includes()){
            let firstSession=await global.REDIS_CLIENT.rpopAsync('userID:'+user._id)      
            res=await global.REDIS_CLIENT.expireAsync('sid:'+firstSession,1) 
        }
       let sid2=this.getRandom()
       data.session=sid2
       data.user=user
       await global.REDIS_CLIENT.lpushAsync('userID:'+user._id,sid2) 
       await global.REDIS_CLIENT.HMSETAsync('sid:'+sid2,'role',user.role,'usage',0) 
       await global.REDIS_CLIENT.expireAsync('sid:'+sid2,86400)      
   }
   return data
 }
 ,isValid:async function(sessionID){
  
    return await global.REDIS_CLIENT.hgetallAsync('sid:'+sessionID)  
  }
,validUsage:async function(decode){
    let res=await global.REDIS_CLIENT.HGETAsync('sid:'+decode.session,'usage') 
   if(res>=Roles.getMaxUse(decode.user.role))
   {
      return false
   }else{
    await global.REDIS_CLIENT.HINCRBYAsync('sid:'+decode.session,'usage',1)  
    return true
   }
  }
    

}
