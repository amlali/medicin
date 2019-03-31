var mongoose = require('mongoose'); 
var Cart = mongoose.Schema({
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },
    user                 : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items                : [{
        
        item             : { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
        quantity         : { type: Number},
        price            : { type: Number},

    }],
 
},{ usePushEach: true })

Cart.methods.addCard=function (data,userID) {
    this.user=userID
    this.items.push(data.item)
    this.createdAt=Data.now()
}
Cart.methods.updateItem=function (data) {
   this.items.map(e=>{
       if(e.item==data.item){
           e.quantity=data.quantity;
       }
   }) 
}
Cart.methods.deleteItem=function (data) {
    this.items = this.items.filter(e=>e.item!=data.item);

}

Cart.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Cart', Cart);