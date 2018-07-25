
var User = require('../models/user');

module.exports = {
    postUserCredential : function(req, res, next){
        if (req.body.signEmail && req.body.signPassword) {
            var userData = {
              email: req.body.signEmail,
              username: req.body.signEmail,
              password: req.body.signPassword,
              passwordConf: req.body.signPassword,
            }
            //use schema.create to insert data into the db
            User.create(userData, function (err, user) {
              if (err) {
                return next(err)
              } else {
                return res.redirect('/profile');
              }
            });
          }
        else if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
              if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
              } 
              else {
                req.session.userId = user._id;
                console.log(__dirname);
                return res.redirect('/subjectChoose');
              }
            });
          } 
          else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
          }

    }
}