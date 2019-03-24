var mongoose = require('mongoose'); 
var Item = mongoose.Schema({
    description          : { type: String},
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },
    price                : { type: Number},
    image                : { type: mongoose.Schema.Types.Mixed},
    name                 : { type: String},
    expireDate           : { type: Date },

},{ usePushEach: true })

Item.methods.newItem=function (item) {
    this.name=item.name
    this.price=item.price
    this.image=item.image
    this.description=item.description
    this.expireDate=item.expireDate
    this.createdAt=Date.now()
}
Item.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Item', Item);