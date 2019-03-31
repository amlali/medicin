let Stock =require('../models/user')
let config = require('../config')
let Roles =require('../static-archi/roles')
let uCheck                    = require('ucheck');
let Validation                = require('../static-archi/validation.js');
var cloudinary                = require('cloudinary');
const fs                      = require('fs');
const path                    = require('path');
let uploader                  =require('../modules/image-upload').upload.array('file',1)

cloudinary.config(config.config.cloudinary)
function deleteImage(){
    console.log("delete all images");
    let directory='./uploads'
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        files.map(file=>{
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
          })
        });
      });
}
function uploadImage(imgPath){
    console.log(imgPath);
    
    cloudinary.v2.uploader.upload(imgPath, 
    {public_id: "medicine",
    overwrite: true,async:true},
    function(error, result) {
        console.log(result, error)
    });
}

module.exports={

    addItem:function(req,res,next){
        let x = [

            {
                param: 'name',
                label: 'name',
                required: true,
                type: 'string',
                regex: Validation.regex.username
            }
            ,{
                param: 'description',
                label: 'description',
                required: true,
                type: 'string',
                length: {min: Validation.length.desc.min, max: Validation.length.desc.max},
                regex: Validation.regex.desc
            }
            ,{
                param: 'price',
                label: 'price',
                required: true,
                type: 'string',
                length: {min: Validation.length.desc.min, max: Validation.length.desc.max},
                regex: Validation.regex.desc
            }
            ,{
                param: 'category',
                label: 'category',
                required: true,
                type: 'string',
                length: {min: Validation.length.desc.min, max: Validation.length.desc.max},
                regex: Validation.regex.desc
            }
            ,{
                param:"expireDate",
                label: 'expireDate',
                required: true,
                type: 'string',
                length: {min: Validation.length.dateDDMMYY.min, max: Validation.length.dateDDMMYY.max},
                regex: Validation.regex.dateDDMMYY
            }
            
        ];
            
        //create instance and pass the array x to be validated 
        let ucheck = new uCheck.validate(req).scenario(x);

        if(ucheck.hasErrors()){
            return res.status(400).json({error: ucheck.getErrors()});
        } else {
            
        }
    },
    upload:function(){
        return function(req,res,next){
            console.log('inside upload');
           // console.log(req);
            
            uploader(req, res, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({message: err})
                        
                }

                //  console.log(req.files[0]);
                
               // uploadImage(req.files[0].path)
              //deleteImage()

            })
        }
    }
}
