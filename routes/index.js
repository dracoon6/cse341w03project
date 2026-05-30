const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
  res.send(req.session.user !== undefined 
    ? `Logged in as ${req.session.user.displayName || req.session.user.username} <br><br><button onclick="location.href='/logout'">Logout</button> <button onclick="location.href='/api-docs'">swagger</button>` 
    : "Logged Out <br><br><button onclick=\"location.href='/login'\">Login</button> <button onclick=\"location.href='/api-docs'\">swagger</button>");
});

router.use('/employees', require('./employees'));
router.use('/departments', require('./departments'));

router.get('/login', passport.authenticate('github', (req, res) => {}));

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: true
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

module.exports = router;