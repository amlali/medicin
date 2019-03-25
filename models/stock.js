var mongoose = require('mongoose'); 
var Stock = mongoose.Schema({

    description          : { type: String},
    price                : { type: Number},
    image                : { type: mongoose.Schema.Types.Mixed},
    itemName             : { type: String},
    expireDate           : { type: Date },
    quantity             : { type: Number},
    updatedAt            : { type: Date, default: Date.now },
    createdAt            : { type: Date, default: Date.now },
    availability         : { type: Boolean, default:true},
    vendor               : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category             : { type: String}

},{ usePushEach: true })


Stock.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Stock', Stock);