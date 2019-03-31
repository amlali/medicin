require('dotenv').config()
var express          = require('express');
var app              = express();
var cors             = require('cors');
var mongoose         = require('mongoose');
let config           = require ('./config')
var bodyParser       = require('body-parser'); 
var seeds            = require('./seeds')
var redis            = require("redis");
var bluebird         = require('bluebird');
bluebird.promisifyAll(redis);
global.REDIS_CLIENT         = redis.createClient();

let port             = process.env.PORT || 3000
mongoose.Promise     = global.Promise;
mongoose.connect(config.dbURI,{ useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./router')(app);

seeds()
app.listen(port,function(){
    console.log(`server is running at port ${port}`);
    
})