var mongoose = require('mongoose'); 
var Stock = mongoose.Schema({
    name                 : { type: String},
    description          : { type: String},
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },
    price                : { type: Number},
    image                : { type: mongoose.Schema.Types.Mixed},
    expireDate           : { type: Date},
    availability         : { type: Boolean, default:true},
    vendor               : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantatiy            : { type: Number},
    category             : { type: String},

},{ usePushEach: true })


Stock.pre('save', function() {
	this.updatedAt = new Date();
});
Stock.methods.addItem = function(obj){

    this.name             =    obj.name            
    this.description      =    obj.description   
    this.price            =    obj.price          
    this.image            =    obj.image     
    this.expireDate       =    obj.expireDate      
    this.vendor           =    obj.vendor
    this.quantatiy        =    obj.quantatiy 
    this.category         =    obj.category
},

Stock.methods.useItem = function(obj){

    this.quantatiy       -=  obj.quantatiy 
    if(this.quantatiy<=0) this.availability=false;
}
Stock.methods.updatequantatiy=function(obj){
    this.quantatiy       +=  obj.quantatiy 
    this.availability     = true;
}




User.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Stock', Stock);