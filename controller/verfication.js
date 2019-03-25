let config=require('../config')
const sgMail = require('@sendgrid/mail');
module.exports={
    verifyEmail:function(req,hash){
       console.log("==========inside verfiy=====");
       
        try{  
            sgMail.setApiKey(config.SendGriDAPIKEY);
            const msg = {
              to: req.body.email,
              from: 'medicine@app.com',
              subject: 'Email verfication link',
              text: "http://"+req.get('host')+"/api/verify/"+hash
             };
            sgMail.send(msg);
            console.log(msg.text);
        }catch(err){
          console.log(err,"ERROR");
        }
      
        
    }
}




