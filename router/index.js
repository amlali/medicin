var users              = require('./routes/user');
module.exports = function (app) {
    let namespace='/api'
    
    app.use(namespace,users);
}