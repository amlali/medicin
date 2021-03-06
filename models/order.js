var mongoose = require('mongoose'); 
let uuid     =require('uuid/v4')
var Order = mongoose.Schema({
    code                 : { type: String},
    state                : { type: String},
    canceled             : { type: Boolean, default:false},
    canCanceled          : { type: Boolean, default:true},
    address              : { type: String},
    items                : [{
        
        item             : { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
        quantity         : { type: Number}
    }],
    canceledBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user                 : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },
    canceledAt           : { type: Date, default: Date.now },
    totalPrice           : { type: Number},
    selectedVendors      : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    contactedVendors     : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    forwardedTo          : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    forwardedAt          : { type: Date, default: Date.now },
    acceptedBy           : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    acceptedAt           : { type: Date, default: Date.now },
    accepted             : { type: Boolean, default:false},
    loc                  : {
        type: [Number],  
        index: '2d'      
    },



},{ usePushEach: true })

Order.methods.newOrder=function(order){

    this.code =uuid()
    this.user=order._id
    this.itmes.push(order.item);
    this.createdAt=Date.now()
    this.address=order.address

}
Order.methods.updateOrder=function(items){
  
}
Order.methods.calculatePrice=function(){

}
Order.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Order', Order);