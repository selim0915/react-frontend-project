const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authData = {
  id: user.id,
  username: user.username,
  email: user.email
};

module.exports = () => {
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, user.email);
    });
  });

  passport.deserializeUser(function (id, cb) {
    process.nextTick(function () {
      cb(null, authData);
    });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'pwd'
      },
      function verify(username, password, cb) {
        db.get('SELECT * FROM users WHERE username = ?', [username], function (err, user) {
          if (err) {
            return cb(err);
          }
          if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
          }

          crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, user);
          });
        });
      }
    )
  );

  app.post(
    '/auth/login_process',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login'
    })
  );
  var crypto = require('crypto');
};
