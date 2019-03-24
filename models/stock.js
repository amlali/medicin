var mongoose = require('mongoose'); 
var Stock = mongoose.Schema({

    Item              : { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    quantity          : { type: Number},
    updatedAt         : { type: Date, default: Date.now },
    createdAt         : { type: Date, default: Date.now },
    availability      : { type: Boolean, default:true},
    vendor            : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

},{ usePushEach: true })


Stock.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Stock', Stock);