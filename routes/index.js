var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/signin-helpers')
var routeHelper = require('../helpers/route-helper');
const { response } = require('express');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/signin', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/home')
  }
  else {
    error = req.session.error
    res.render('login', { error })
    req.session.error = false
  }
})
router.get('/signup', (req, res) => {
  reas = req.session.reas
  res.render('signup', { reas })
  req.session.reas = false
})
router.get('/home', (req, res) => {
  let user = req.session.user
  if (req.session.loggedin) {

    res.render('user/home', { homev: true, user })
  }
  else {
    res.redirect('/signin')
  }
})
router.post('/signup', (req, res) => {
  userHelper.doSignUp(req.body).then((response) => {
    console.log(response)
    req.session.reas = response.reason
    if (response.status) {
      res.redirect('/signup')
    }
    else { res.redirect('/signin') }

  })
})
router.post('/signin', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedin = true
      req.session.user = response.user
      res.redirect('/home');
    }
    else {
      req.session.error = response.reason
      res.redirect('/signin')

    }
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/signin')
})
router.get('/routes', (req, res) => {
  let user = req.session.user
  if (req.session.loggedin) {
    routeHelper.doRouteDisplay().then((products) => {
      console.log(products)
      res.render('user/routes/routes', { homev: true, user,products })
    })
  }
  else {
    res.redirect('/signin')
  }
})
router.post('/routes', (req, res) => {
  routeHelper.doRouteCreate(req.body)
  res.redirect('/routes')
})
module.exports = router;
