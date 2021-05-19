var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/signin-helpers')
var routeHelper = require('../helpers/route-helper');
var productHelper = require('../helpers/product-helper');
var customerHelper=require('../helpers/customer-helper')
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
      res.render('user/routes/routes', { homev: true, products ,user})
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
router.get('/products', (req, res) => {
  let user = req.session.user
  if (req.session.loggedin) {
    productHelper.doProductDisplay().then((products) => {
      res.render('user/product/product', { homev: true ,products,user})
    })
  }
  else {
    res.redirect('/signin')
  }
})
router.post('/products', (req, res) => {
  productHelper.doProductCreate(req.body)
  res.redirect('/products')
})
router.get('/customers', (req, res) => {
  if (req.session.loggedin) {
    let user = req.session.user
    productHelper.doProductDisplay().then((products) => {
    routeHelper.doRouteDisplay().then((routes)=>{
    console.log(products)
    customerHelper.doCustomerDisplay().then((customers)=>{
      res.render('user/customer/customer', { homev: true,customers,products,routes,user})
    })
  })
})
  }
  else {
    res.redirect('/signin')
  }
})
router.post('/customers', (req, res) => {
  customerHelper.doCustomerCreate(req.body)
  res.redirect('/customers')
})
router.get('/delete-product/:id',(req,res)=>{
  let productId=req.params.id
  productHelper.deleteProduct(productId).then(()=>{
    res.redirect('/products')

  })
})
router.get('/delete-customer/:id',(req,res)=>{
  let customerId=req.params.id
  customerHelper.doDeleteCustomer(customerId).then(()=>{
    res.redirect('/customers')

  })
})
router.get('/delete-route/:id',(req,res)=>{
  let routeId=req.params.id
  routeHelper.doDeleteRoute(routeId).then(()=>{
    res.redirect('/routes')

  })
})
router.get('/edit-product/:id',(req,res)=>{
  let user = req.session.user
  let productId=req.params.id
  productHelper.editproduct(productId).then((product)=>{
    console.log(product)
    res.render('user/product/edit-product',{product,homev: true,user})
  })
})
router.post('/edit-products/:id',(req,res)=>{
  productHelper.updateProduct(req.params.id,req.body)
  res.redirect('/products')
})
router.get('/edit-route/:id',(req,res)=>{
  let user = req.session.user
  let routeId=req.params.id
  routeHelper.doEditRoute(routeId).then((route)=>{
    res.render('user/routes/edit-route',{route,homev: true,user})
  })
})
router.post('/edit-route/:id',(req,res)=>{
  routeHelper.doUpdateRoute(req.params.id,req.body)
  res.redirect('/routes')
})
router.get('/edit-customer/:id',(req,res)=>{
  let user = req.session.user
  let custId=req.params.id
  productHelper.doProductDisplay().then((products) => {
    routeHelper.doRouteDisplay().then((routes)=>{
  customerHelper.doEditCustomer(custId).then((customer)=>{
    res.render('user/customer/edit-customer',{customer,homev: true,user,products,routes})
  })
})
})
})
router.post('/edit-customer/:id',(req,res)=>{
  customerHelper.doUpdateCustomer(req.params.id,req.body)
  res.redirect('/customers')
})
router.get('/bills', (req, res) => {
  if (req.session.loggedin) {
    let user = req.session.user
    productHelper.doProductDisplay().then((products) => {
    routeHelper.doRouteDisplay().then((routes)=>{
    console.log(products)
    customerHelper.doCustomerDisplay().then((customers)=>{
      res.render('user/bills/bills', { homev: true,customers,products,routes,user})
    })
  })
})
  }
  else {
    res.redirect('/signin')
  }
})
router.get('/payments', (req, res) => {
  if (req.session.loggedin) {
    let user = req.session.user
    productHelper.doProductDisplay().then((products) => {
    routeHelper.doRouteDisplay().then((routes)=>{
    console.log(products)
    customerHelper.doCustomerDisplay().then((customers)=>{
      res.render('user/payments/payments', { homev: true,customers,products,routes,user})
    })
  })
})
  }
  else {
    res.redirect('/signin')
  }
})
module.exports = router;
