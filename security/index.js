let authentication = require('./manager/token')
let redis =require('./manager/redis')
module.exports={
 
    generateTicketData:async function(user,cb){  
        let data=await redis.createSeesion(user)
        cb(authentication.sign(data))      
    },
    secure: function(allowedRoles){
       
        return async function(req,res,next){
            let decode
            if(req.headers.ticket){
                decode=await authentication.verfiy(req.headers.ticket)
               if(decode){
                if(allowedRoles.includes(decode.user.role)){  
                    if(await redis.isValid(decode.session)){ 
                        if( await redis.validUsage(decode)){
                            console.log('success');
                            next()
                        }else{
                            return res.status(401).send({error:'you reach max usage'})
                        }
                    }else{
                        return res.status(401).send({error:'invalid session'})
                    }  
                    
                }else{
                    return res.status(401).send({error:'invalid Role'})
                }
                
               }else{
                return res.status(401).send({error:'invalid ticket'})
               }
            }else{
                return res.status(401).send({error:'un-authorized'})
            }
        }
    }
}