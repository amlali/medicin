var express        = require('express');
var router         = express.Router();
let Roles          = require('../../static-archi/roles')
let stockCTR       =require('../../controller/stock')
console.log("##########################");

router.post('/upload',stockCTR.upload())
module.exports=router