let Validation                = require('../static-archi/validation');
let Card                      = require('../models/cart');
let Stock                      = require('../models/stock');

let uCheck                    = require('ucheck');

module.exports={
    addToCard:function(){
        return function(req,res,next){
          let x=[
              {
                    param:'item',
                    label:'Item',
                    required: true,
                    type: 'string',
                    regex: Validation.regex.mongoId
              },
              {
                param: 'quantity',
                label:'Quantity',
                required: true,
                type: 'number',
                length: { min: 1 , max: 50},
                regex: Validation.regex.number
             }
          ]
                     
            let ucheck = new uCheck.validate(req).scenario(x);
        
            if(ucheck.hasErrors()){
                return res.status(400).send({error: ucheck.getErrors()});  
            } else {
                Card.find({user:req.ticket.user._id}).exec(function(err,card){
                    if(err)console.log(err)
                    if(!card){
                       let newCard=new Card
                       Stock.find({_id:req.body.item}).exec(function(err,item){
                        if(err)console.log(err);
                          if(item){
                              if(item.quantity>=req.body.quantity){
                                newCard.addToCard(req.body,req.ticket.user._id)
                                newCard.save()
                              }else{
                                return res.status(400).send({error:"item is not availabe"})
                              }
                           
                          }else{
                            return res.status(400).send({error:"item not exists in the stock"})
                          }
                       })
                       
                    }else{
                        Stock.find({_id:req.body.item}).exec(function(err,item){
                            if(err)console.log(err);
                              if(item){
                                if(item.quantity>=req.body.quantity){     
                                    card.addToCard(req.body,req.ticket.user._id)
                                    card.save()
                                  }else{
                                    return res.status(400).send({error:"item is not availabe"})
                                  }
                              }else{
                                return res.status(400).send({error:"item not exists in the stock"})
                              }    
                           })
                    }
                    return res.status(200).send({message:"added to card successfully"})
                })
            }






        }

    }
}