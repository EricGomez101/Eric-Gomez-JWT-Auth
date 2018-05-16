const router = require('express').Router();
const passport = require('passport');
const User = require('./User');
const protected = passport.authenticate('jwt', {session: false});


router.get('/', protected, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
