const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const secret = 'this is what i shared yesterday';

router.post('/register', function(req, res) {
  console.log('posting', req.body);
  User.create(req.body)
    .then(user => {
      const token = makeToken(user);
      res.status(201).json({ user, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {

})

function makeToken(user) {
  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };

  const options = {
    expiresIn: "24h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
