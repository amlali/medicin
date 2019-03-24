let User =require('../models/user')
let Security = require('../auth.js')
let Roles =require('../systemArchi/roles')
let uCheck                    = require('ucheck');
let Validation                = require('../static_arch/validation.js');
let User                      = require('../models/user');
module.exports={

        access:function(req,res,next){
            let x = [
    
                {
                    param: 'email',
                    label: Say.lng(req).label.email,
                    required: true,
                    type: 'string',
                    regex: Validation.regex.email
                }
                ,{
                    param: 'password',
                    label: Say.lng(req).label.password,
                    required: true,
                    type: 'string',
                    length: {min: Validation.length.password.min, max: Validation.length.password.max},
                    regex: Validation.regex.password
                }
                
            ];
                
            //create instance and pass the array x to be validated 
            let ucheck = new uCheck.validate(req).setMsgs(Say.lng(req).error).scenario(x);

            if(ucheck.hasErrors()){
                return res.status(400).json({error: ucheck.getErrors()});
            } else {

           
                User.findOne({email:req.body.email}).exec(function(err,result){
                    if(err)console.log(err);
                    if(result){ 
                         if(result.comparePass(req.body.password)){
                             Security.generateTicketData(result.getTicketData(),function(ticket){
                                result.password=undefined
                                return res.status(200).send({user:result,ticket:ticket})
                             })
                             
                        } else{
                        return res.status(400).send({error: 'invalid password'});
                        }        
                    }else{
                        return res.status(404).send({error: 'email does not exit'});
                     }
                     
                  })
             
            }
        }
    
}