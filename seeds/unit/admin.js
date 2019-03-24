var User = require('../../models/user');

module.exports = function(){
    console.log('inside admin seed');

    User.findOne({role: 'admin'}).exec(function(err, user){
        if(err) { console.log(err)}
        if(!user){
            if(!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD){
                return false;
            }
            var user = new User;
            user.registerAdmin({
                email: process.env.ADMIN_EMAIL, 
                password: process.env.ADMIN_PASSWORD,
            });
            user.save()
            console.log('admin added');
        } else {
            console.log('already exist')    
        }
    });
}