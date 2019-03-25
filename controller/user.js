let uCheck                    = require('ucheck');
let Validation                = require('../static-archi/validation');
let User                      = require('../models/user');
const verfication             = require("./verfication.js");
let VerifyModel               =require('../models/verify.js')
let Secure                    = require('../security')
module.exports={
    register:function(){
     return function(req,res,next){
        let x = [
    
            {
                param: 'email',
                label:'Email',
                required: true,
                type: 'string',
                regex: Validation.regex.email
            }
            ,{
                param: 'password',
                label:'Password',
                required: true,
                type: 'string',
                length: {min: Validation.length.password.min, max: Validation.length.password.max},
                regex: Validation.regex.password
            },
            {
                param: 'mobileNumber',
                label: 'mobileNumber',
                type: 'string',
                required: true,
                length: {min: Validation.length.egMobileNumber.min, max: Validation.length.egMobileNumber.max},
                regex: Validation.regex.egMobileNumber
            },{
                param: 'username',
                label: 'username',
                type: 'string',
                required: true,
                length: { min: Validation.length.username.min , max: Validation.length.username.max},
                regex: Validation.regex.username
            }
            
        ];
             
    let ucheck = new uCheck.validate(req).scenario(x);
 
    if(ucheck.hasErrors()){
        return res.status(400).send({error: ucheck.getErrors()});  
    } else {
        User.findOne({email:req.body.email}).exec(function(err,user){
            if(err)console.log(err);
            if(!user){
                let user=new User
                user.createUser(req.body)
                user.save(function(err){
                    if(err)console.log(err);
                    let verify=new VerifyModel
                    let hash=verify.createHash(user)
                    verify.save()
                    verfication.verifyEmail(req,hash)
                })
                res.status(200).send({message:'check your email'});
            }else{
                res.status(400).send({error:'already exist'});
            }
            
        })
         
       }
    }
  },
    emailVerification:function(){
     return function(req,res,next){
        var x = [
 
            {
                param: 'code',
                label: 'Code',
                required: true,
                type: 'string',
                length: { min: 10 , max: 50},
                regex: Validation.regex.uuid
            }
        ]
        req.body.code=req.params.code 
        let ucheck = new uCheck.validate(req).scenario(x);
     
        if(ucheck.hasErrors()){
            return res.status(400).send({error: ucheck.getErrors()})
        }else{
            if(req.params.code &&req.params.code!=undefined){
                console.log(req.params.code,"---------------------------");
                
                VerifyModel.findOne({code:req.body.code}).populate('userID').exec(function(err,result){
                    if(err)console.log(err);
                        if(result!=null ||result!=undefined ){
                        result.userID.emailVerification()
                        result.userID.save()
                        result.remove()
                        
                        return res.status('200').send({message:'verified successfully'})
                        }
                    return res.status('404').send({error:'email does not exit'})
                })
            }else{
                return res.status('400').send({error:'invalid code'})
            }
        }
     }
   },
   registerStaff:function(role){
    return function(req,res,next){
        let x = [
    
            {
                param: 'email',
                label:'Email',
                required: true,
                type: 'string',
                regex: Validation.regex.email
            }
            ,{
                param: 'password',
                label:'Password',
                required: true,
                type: 'string',
                length: {min: Validation.length.password.min, max: Validation.length.password.max},
                regex: Validation.regex.password
            },
        ]
        let ucheck = new uCheck.validate(req).scenario(x);
     
        if(ucheck.hasErrors()){
            return res.status(400).send({error: ucheck.getErrors()});
        }else{
         User.findOne({email:req.body.email}).exec(function(err,user){
             if(err) console.log(err);
                if(!user){
                let userObj=new User
                    userObj.registerStaff(req.body,role)
                    userObj.save()
                    return res.status(200).send({message:`${role} added`})
                }else{
                    return res.status('400').send({error:'email already exits'})
                }   
         })
      }
    }
  },
   access:function(){
    return function(req,res,next){
       let x = [

           {
               param: 'email',
               label:'Email',
               required: true,
               type: 'string',
               regex: Validation.regex.email
           }
           ,{
               param: 'password',
               label:'Password',
               required: true,
               type: 'string',
               length: {min: Validation.length.password.min, max: Validation.length.password.max},
               regex: Validation.regex.password
           }
           
       ];
           
      
       let ucheck = new uCheck.validate(req).scenario(x);
       if(ucheck.hasErrors()){
           return res.status(400).json({error: ucheck.getErrors()});
       } else {
           User.findOne({email:req.body.email}).exec(function(err,result){
               if(err)console.log(err);
                if(result){ 
                    if(result.emailVerified==true){
                        if(result.comparePass(req.body.password)){
                            Secure.generateTicketData(result.getTicketData(),function(ticket){
                            result.password=undefined
                            return res.status(200).send({user:result,ticket:ticket})
                            })
                            
                    } else{
                    return res.status(400).send({error: 'invalid password'});
                    }
                    }else{
                        return res.status(400).send({error: 'email not verified ,please check your email'});
                    }
                                
                }else{
                    return res.status(404).send({error: 'email does not exit'});
                    }
                
             })
        
       }
    }
   },
   resetPassword:function(){
       return function(req,res,next){
        let x = [
           
            {
                param: 'email',
                label:'Email',
                required: true,
                type: 'string',
                regex: Validation.regex.email
            },
            {
                param: 'newPassword',
                label: 'newPassword',
                required: true,
                type: 'string',
                length: {min: Validation.length.password.min, max: Validation.length.password.max},
                regex: Validation.regex.password
            }   
        ];
        let ucheck = new uCheck.validate(req).scenario(x);
 
        if(ucheck.hasErrors()){
            res.status(400).send({error: ucheck.getErrors()});
            return false;
         
        }else{
                  User.findOne({_id:req.ticket.user._id}).exec(function(err,user){
                      if (err)console.log(err);
                      if(user){  
                         if(user.comparePass(req.body.password)) {
                             user.updatePass(req.body.newPassword)
                             user.save()
                             return  res.status(200).send({message: 'password updated successfully'});
                         }else{
                            return  res.status(400).send({error: 'invalid password'});
                         }
                      }
                      else{
                        return res.status(404).send({error: 'does not exit'});
                      }
                  })
            
        }
       }
    },
    forgetPassword:function(){
        return function(req,res,next){
            let x = [
                {
                    param: 'email',
                    label:'Email',
                    required: true,
                    type: 'string',
                    regex: Validation.regex.email
                },
                {
                    param: 'newPassword',
                    label: 'newPassword',
                    required: true,
                    type: 'string',
                    length: {min: Validation.length.password.min, max: Validation.length.password.max},
                    regex: Validation.regex.password
                }   
            ];

            let ucheck = new uCheck.validate(req).scenario(x);
            if(ucheck.hasErrors()){
                res.status(400).send({error: ucheck.getErrors()});
                return false;
            }else{
    
                  User.findOne({email:req.body.email}).exec(function(err,user){
                      if(err)console.log(err);
                      if(user){
                          if(user.emailVerified==true){
                            user.updatePass(req.body.newPassword)
                            user.save()
                            return res.status(200).send({message: 'password updated successfully'});
                          }else{
                            return  res.status(400).send({error: 'email not verifid'}); 
                          }
                       
                      }else{
                        return res.status(404).send({error: 'email not exit'}); 
                      }
                      
                  })
            }
        }
    },
    getProfile:function(){
        return  function(req,res,next){
            User.findOne({_id:req.ticket.user._id}).exec(function(err,user){
                if(err) console.log(err);
                if(user){
                    user.password=undefined
                    return res.status(200).send({message:user})
                }
                return  res.status(404).send({error: 'not found'}); 
            })
        }
    },
    updateProfile:function(){
        return function(req,res,next){
            let x = [
                {
                    param: 'email',
                    label:'Email',
                    required: false,
                    type: 'string',
                    regex: Validation.regex.email
                },
                {
                    param: 'mobileNumber',
                    label: 'mobileNumber',
                    type: 'string',
                    required: false,
                    length: {min: Validation.length.egMobileNumber.min, max: Validation.length.egMobileNumber.max},
                    regex: Validation.regex.egMobileNumber
                },{
                    param: 'username',
                    label: 'username',
                    type: 'string',
                    required: false,
                    length: { min: Validation.length.username.min , max: Validation.length.username.max},
                    regex: Validation.regex.username
                }
            ]
            let ucheck = new uCheck.validate(req).scenario(x);
            if(ucheck.hasErrors()){
                return  res.status(400).send({error: ucheck.getErrors()});
            }else{
                  if(!req.body.email && !req.body.username && !req.body.mobileNumber){
                   return res.status(400).send({error: 'enter field to update'}); 
                  }else{
                  User.findOne({_id:req.ticket.user._id}).exec(function(err,user){
                      if(err)console.log(err);
                      if(user){
                        if(user.emailVerified==true) {
                            if(req.body.email){
                                User.findOne({email:req.body.email}).exec(function(err,result){
                                    if(err) console.log(err);
                                    if(!result){
                                        user.update(req.body)
                                        let verify=new VerifyModel
                                        let hash=verify.createHash(user)
                                        verify.save()
                                        verfication.verifyEmail(req,hash)

                                    }else{
                                        return  res.status(400).send({error: 'email already exists'}); 
                                    }
                            })        
                         }
                        if(req.body.username||req.body.mobileNumber){
                            user.update(req.body)
                        }
                            user.save(()=>{
                                console.log("updated");      
                            })
                            return res.status(200).send({message:'updated successfully'})
                            
                        }else{
                            return  res.status(400).send({error: 'email not verifid'}); 
                        }
                    }else{
                    return res.status(404).send({message:'user does not exists'})
                    }
                        
                  })      
               }

            }
        }
    },
  
}
