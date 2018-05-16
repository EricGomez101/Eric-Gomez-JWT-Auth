const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');
const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = function(server) {
  // sanity check route
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });


  const localStrategy = new LocalStrategy(function(username, password, done){
    User.findOne({username}).then(user => {
      if(!user) {
        done(null, false);
      } else {
        user.validatePassword(password)
        .then(isValid => {
          const {_id, username} = user;
          return done(null, _id, username);
        })
        .catch(err => {
          return done(err);
        })
      }
    })
    .catch(err => {
      return done(err);
    })
  })

  passport.use(localStrategy);

  const authenticate = passport.authenticate('local', {sessions: false});

  server.use('/api/users', userRoutes);
  server.use('/api/auth', authRoutes);
};
