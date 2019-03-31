var express        = require('express');
var router         = express.Router();
let Roles          = require('../../static-archi/roles')
let userCtrl       = require('../../controller/user')
let Secure         = require('../../security')

router.route('/create/user').post(userCtrl.register())
router.route('/create/admin').post(Secure.secure(['admin']),userCtrl.registerStaff(Roles.raw.admin.name))
router.route('/create/vendor').post(Secure.secure(['admin']),userCtrl.registerStaff(Roles.raw.vendor.name))
router.route('/access').post(userCtrl.access())
router.route('/verify/:code').get(userCtrl.emailVerification())
router.route('/reset/password').post(Secure.secure(['admin','user','vendor']),userCtrl.resetPassword())
router.route('/forget/password').post(userCtrl.forgetPassword())
router.route('/profile').get(Secure.secure(['admin','user','vendor']),userCtrl.getProfile())
router.route('/update/profile').post(Secure.secure(['admin','user','vendor']),userCtrl.updateProfile())

module.exports=router