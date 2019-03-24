let User =require('../models/user')
let Security = require('../auth.js')
let Roles =require('../systemArchi/roles')
let uCheck                    = require('ucheck');
let Validation                = require('../static_arch/validation.js');
let User       

module.exports={

    makeOrder:function(req,res,next){
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
        } else {}}}
