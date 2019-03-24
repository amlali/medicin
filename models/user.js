var mongoose = require('mongoose');
let bcrypt = require('bcryptjs') 
let Roles  =require('../static-archi/roles')  
var User = mongoose.Schema({
    email                : { type: String},
    phone                : { type: String},
    otherPhones          :[{ type: String}],
    otherEmails          :[{ type: String}],
    username             : { type: String},
    password             : { type: String},
    vendor               : { type: String},
    address              : { type: String}, 
    role                 : { type: String, default:Roles.raw.user.name},
    createdAt            : { type: Date, default: Date.now },
    updatedAt            : { type: Date, default: Date.now },



},{ usePushEach: true })
User.methods.createUser=function(object){
  this.email=object.email
  this.name=object.name
  this.phone=object.phone
  this.password=this.generateHash(object.password)

}
User.methods.registerAdmin=function(object){
    this.email=object.email
    this.name=object.name
    this.password=this.generateHash(object.password)
    this.role=Roles.raw.admin.name
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

User.pre('save', function() {
	this.updatedAt = new Date();
});

module.exports = mongoose.model('User', User);