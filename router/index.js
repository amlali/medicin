var users              = require('./routes/user');
var cards              = require('./routes/cart');

module.exports = function (app) {
    var nameSpace = '/api';
    
    app.use(nameSpace,users);
    app.use(nameSpace,cards);
}