const config = require("../config");

//superadmin is created with these defaults 
var adminDefaults = { 
	username: process.env.ADMIN_USERNAME, 
	password: process.env.ADMIN_PASSWORD
}; 

//who can register for whome
var regArch = {
	//admin can register for supervisor and rider
	admin: ['vendor','admin'],
}


var roles = {
	user: {
		name:'user',
		rank: 0, 
		env: {
			production:{
				maxTicketUsagePerHour: 600,
				maxLogins:2,
				ticketValidationInDays:365
			},
			development: {
				maxTicketUsagePerHour: 600,
				maxLogins:2,
				ticketValidationInDays:365
			},
			test: {
				maxTicketUsagePerHour: 600,
				maxLogins:2,
				ticketValidationInDays:365
			},
			staging: {
				maxTicketUsagePerHour: 600,
				maxLogins:6,
				ticketValidationInDays:365
			}
		}
	},



	admin: {
		name: 'admin',
		rank: 8,
		env: {
			production:{
				maxTicketUsagePerHour: 100,
				maxLogins:1,
				ticketValidationInDays:3
			},
			development: {
				maxTicketUsagePerHour: 100,
				maxLogins:1,
				ticketValidationInDays:3
			},
			test: {
				maxTicketUsagePerHour: 100,
				maxLogins:1,
				ticketValidationInDays:3
			},
			staging: {
				maxTicketUsagePerHour: 100,
				maxLogins:1,
				ticketValidationInDays:3
			}
		}
	},

	vendor:{
		name: 'vendor',
		rank: 7,
		env: {
			production:{
				maxTicketUsagePerHour: 500,
				maxLogins:1,
				ticketValidationInDays:3
			},
			development: {
				maxTicketUsagePerHour: 500,
				maxLogins:1,
				ticketValidationInDays:3
			},
			test: {
				maxTicketUsagePerHour: 500,
				maxLogins:1,
				ticketValidationInDays:3
			},
			staging: {
				maxTicketUsagePerHour: 500,
				maxLogins:1,
				ticketValidationInDays:3
			}
		}
	}
};

//return all roles
function rolesList(roles){
	function rolesList(roles){
		var rolesList = [roles.admin.name, roles.user.name, roles.vendor.name];
		return rolesList; 
	}
}

function getRole(role){
    if(roles.includes(role)) {
        return roles[role]
    }
  }
function getMaxUse(role){
return roles[role].maxTicketUsagePerHour
}
function getEnvFor(inrole){
	if(!roles[inrole].env){
		console.log(">>>>>>>>> unable to get env for role " + inrole);
		return roles.user.env[config.currentEnv]
	}
	return roles[inrole].env[config.currentEnv];
}

module.exports = {
	list: rolesList(roles),
	raw: roles,
	defaults: adminDefaults,
	regArch: regArch,
    getEnvFor: getEnvFor,
    getRole,
    getMaxUse
}