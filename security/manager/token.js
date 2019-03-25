var jwt      = require('jsonwebtoken');
let config   =require('../../config')

module.exports={
    sign:function(data){
       return jwt.sign(data,config.JWTSecret)
    },
    verfiy:function(ticket){
       try{
         return jwt.verify(ticket,config.JWTSecret)
       }catch(e){
        return false

      }
  }
}