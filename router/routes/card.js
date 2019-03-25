var express        = require('express');
var router         = express.Router();
let Roles          = require('../../static-archi/roles')
let cardCtrl       = require('../../controller/card')
let Secure         = require('../../security')

router.route('/add/card').post(Secure.secure(['user']),cardCtrl.addToCard())

module.exports=router
