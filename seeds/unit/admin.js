var User = require('../../models/user');
let Roles =require("../../static-archi/roles")
module.exports = function(){
    console.log('inside admin seed');

    User.findOne({role:Roles.raw.admin.name}).exec(function(err, user){
        if(err) { console.log(err)}        
        if(!user){
            if(!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD){
                return false;
            }
            var user = new User;
            user.registerStaff({
                email: process.env.ADMIN_EMAIL, 
                password: process.env.ADMIN_PASSWORD,
            },Roles.raw.admin.name);
            user.save()
            console.log('admin added');
        } else {
            console.log('already exist')    
        }
    });
}