var mongoose = require('mongoose');
let bcrypt = require('bcryptjs') 
let Roles  =require('../static-archi/roles')  
var User = mongoose.Schema({
    email                : { type: String},
    mobileNumber         : { type: String},
    otherPhones          :[{ type: String}],
    otherEmails          :[{ type: String}],
    username             : { type: String},
    password             : { type: String},
    address              : { type: String}, 
    role                 : { type: String, default:Roles.raw.user.name},
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },
    emailVerified        : { type: Boolean, default: false},
    emailVerifiedAt      : { type: Date},
    branchName           : { type: String},
    loc                  : {
                            type: [Number],  // [<longitude>, <latitude>]
                            index: '2d'      // create the geospatial index
                        },
    
                        

                        
},{ usePushEach: true })
User.methods.createUser=function(obj){
  this.email=obj.email
  this.username=obj.username
  this.mobileNumber=obj.mobileNumber
  this.password=this.generateHash(obj.password)
}
User.methods.registerVendor=function(obj,role){
    this.email=obj.email
    this.username=obj.username
    this.password=this.generateHash(obj.password)
    this.role=role
    this.emailVerified=true
    this.emailVerifiedAt=Date.now()
    this.branchName=obj.branchName
    this.address=obj.address
    this.loc=obj.loc
}

User.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
User.methods.comparePass=function(password){
    if(!this.password) return false;
    return bcrypt.compareSync(password,this.password)
}
User.methods.updatePassword = function(newPassword){
	this.password = this.generateHash(newPassword);
}


User.methods.getTicketData = function(){
	var data = {};
    data._id = this._id;
    data.role = this.role;
	return data; 
}
User.methods.emailVerification=function(){
    this.emailVerified=true
    this.active=true
    this.emailVerifiedAt=Date.now()
}
User.methods.updatePass=function(newPassword){
    this.password=this.generateHash(newPassword)
}
User.methods.update=function(data){
    if(data.email){
        this.otherEmails.push(this.email)
        this.email=data.email
        this.emailVerified=false 
    }
    if(data.mobileNumber){
        this.mobileNumber=data.mobileNumber
    }
    if(data.username){
        this.username=data.username
    }
}
User.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('User', User);