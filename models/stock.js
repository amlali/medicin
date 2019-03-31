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
    branchName           : { type: String},
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
    this.branchName       =    obj.branchName
    this.quantatiy        =    obj.quantatiy 
    this.category         =    obj.category
},

Stock.methods.usedItems = function(obj){

    this.quantatiy       -=  obj.quantatiy 
    if(this.quantatiy<=0) {
        this.availability=false
    };
}
Stock.methods.updateQuantatiy=function(obj){
    this.quantatiy       +=  obj.quantatiy 
    this.availability     = true;
}




Stock.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('Stock', Stock);