var users              = require('./routes/user');
module.exports = function (app) {
    app.use(users);
}