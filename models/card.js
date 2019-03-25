var mongoose = require('mongoose'); 
var Card = mongoose.Schema({
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },
    quantity             : { type: Number},
    user                 : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    item                 : { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }
},{ usePushEach: true })

Card.methods.addCard=function (data,userID) {
    this.user=userID
    this.item=data.item
    this.quantity=data.quantity
    this.createdAt=Data.now()
  
}
Card.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Card', Card);