const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Shipping = require('../models/shipping');
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const passport = require('passport');
const crypto = require('crypto');
const Order = require('../models/order');
const Coupon = require('../models/coupon');
const Address = require('../models/address');
const bcrypt = require('bcrypt');
const csrf = require('csurf');
const nodemailer = require('nodemailer');
const cookie = require('cookie-parser');

router.use(csrf());


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* GET account page */
router.get('/account', isNotLogin, function (req, res, next) {
  //alert flash register//
  let successReset = req.flash('successReset');
  let NameError = req.flash('errorName');
  let registerEmailError = req.flash('errorEmail');
  let confirmError = req.flash('confirmError');
  let successLogin = req.flash('successLogin');
  //alert flash login//
  let loginEmailError = req.flash('loginError');
  let loginPasswordError = req.flash('loginError2');
  let isNotVerified = req.flash('isNotVerified');
  res.render('user/account', {
    successReset: successReset,
    NameError: NameError,
    registerEmailError: registerEmailError,
    confirmError: confirmError,
    successLogin: successLogin,
    loginEmailError: loginEmailError,
    loginPasswordError: loginPasswordError,
    token: req.csrfToken()
  });
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* auth with Google */
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/account'
  })
);


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* auth with Facebook */
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/account'
  })
);


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* auth register */
router.post(
  '/register', passport.authenticate('local-register', {
    failureRedirect: '/users/account',
    failureFlash: true // allow flash messages
  }), (req, res, next) => {
    const createToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
    const token = createToken(req.user.id);
    res.cookie('access-token', token);
    res.redirect('/');
  }
);



/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* auth login. */
router.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/users/account',
  failureFlash: true // allow flash messages
}), (req, res, next) => {
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }
  const token = createToken(req.user.id);
  if (req.user.role == 0) {
    console.log('it is work');
    res.cookie('access-token', token);
    res.redirect('/users/profile');
  } else {
    console.log('it is impossible');
    res.redirect('/users/admin');
  }
}
);


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/* Verify Email */
router.get('/:id/verifyEmail/:token', async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });
  let token = await Token.findOne({ userId: req.params.id, token: req.params.token });
  if (!user || !token) res.status(400).json({ message: 'invalid link' });

  user.isVerified = true;
  await user.save();
  await token.remove();
  res.redirect('/users/account');
});

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/* Forget password */
router.get('/forget_password', (req, res, next) => {
  let sendEMail = req.flash('sendEmail');
  let notExist = req.flash('notExist');
  res.render('user/forgetPassword', {
    sendEmail: sendEMail,
    notExist: notExist,
    token: req.csrfToken()
  });
});

/* Send email */
router.post('/sendEmail', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user || user.authType !== 'Local') {
    req.flash('notExist', "You entered an invalid email address. Please use another one");
    res.redirect('/users/forget_password');
  }

  let token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  console.log(token);

  let htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: sans-serif;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9f9f9;">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" width="600" style="border-radius: 5px; box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);">
                        <tr>
                            <td colspan="2" style="background-color: #ffffff; text-align: center; padding: 20px;">
                                <img src="https://res.cloudinary.com/drvgczmup/image/upload/v1689432499/Tarkeba%20Perfume/emailIcon_vrj7mw.png" alt="Tarkeba Perfume" width="90" style="display: block; margin: 0 auto;">
                                <h1 style="font-size: 24px; color: #333333; margin: 20px 0px; border-bottom: 1px solid #ccc;">Reset password</h1>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="background-color: #ffffff; padding: 20px; text-align: left; direction: ltr;">
                                <p style="font-size: 16px; color: #333333;">We received a request to reset your password. Click the button below</p>
                                <p style="font-size: 16px; color: #333333;">and you'll be on your way.</p>
                                <br>
                                <table cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                    <tr>
                                        <td style="border-radius: 4px; background-color: #4028df; text-align: center;" width="auto" height="40">
                                            <a href="http://localhost:3000/users/reset_password/${user._id}/${token.token}" style="color: #ffffff; font-size: 16px; text-decoration: none; display: inline-block; padding: 10px 30px;">Reset password</a>
                                        </td>
                                    </tr>
                                </table>
                                <br>
                                <p style="font-size: 16px; color: #333333;">If you have received this message by mistake, ignore this email.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
  </html>`;

  await sendEmail(req.body.email, 'Reset your Tarkeba password', htmlTemplate);

  req.flash('sendEmail', req.body.email);
  res.redirect('/users/forget_password');
});

/* Reset password page */
router.get('/reset_password/:id/:token', (req, res, next) => {
  let invalidLink = req.flash('invalidLink');
  let confirmError = req.flash('confirmError');
  res.render('user/resetPassword', {
    invalidLink: invalidLink,
    confirmError: confirmError,
    userId: req.params.id,
    token: req.params.token,
    csrf: req.csrfToken()
  });
});


/* Reset password */
router.post('/:id/:token', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!user || !token) {
    req.flash('invalidLink', 'Invalid link or expired.');
    return res.redirect('/users/reset_password/:userId/:token');
  }

  user.password = User().hashPassword(req.body.password);
  await user.save();
  await token.delete();
  req.flash('successReset', 'password reset successfully.');
  res.redirect('/users/account');

});

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* GET logout. */
router.get('/logout', isLogin, (req, res, next) => {
  req.logOut(() => {
    req.session.destroy();
    res.redirect('/');
  });
});

/* check if user is login */
function isLogin(req, res, next) {
  console.log(req.isAuthenticated());
  console.log(req.user);
  if (!req.isAuthenticated()) {
    res.redirect('/users/account');
    return;
  }
  next();
}

/* check if user is not login */
function isNotLogin(req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  next();
}

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/* GET Admin page */
router.get('/admin', function (req, res, next) {
  if (req.isAuthenticated() && req.user.role == 1) {
    res.render('user/admin')
  } else {
    res.sendStatus(403) // Forbidden
  }
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* GET profile page */
router.get('/profile', isLogin, async (req, res, next) => {
  let cart;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log('my cart: ' + cart);
    res.render('user/profile', {
      checkUser: true,
      checkProfile: true,
      token: req.csrfToken(),
      user: req.user,
      cart: cart
    });
  }
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Change username */
router.post('/changeName', async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email });
  user.username = req.body.newName;
  await User.updateOne({ _id: req.user._id }, { $set: user });
  res.redirect('/users/profile');
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Change password */
router.post('/changePassword', async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email });
  console.log(user);
  console.log('changing work');
  (async function hashing() {
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    console.log(isMatch);
    if (isMatch === true) {
      user.password = await bcrypt.hash(req.body.newPassword, 5);
      console.log(user.password);
      console.log(req.body.newPassword);
      await User.updateOne({ _id: req.user._id }, { $set: user });
    } else {
      console.log('password was incorrect.');
      req.flash('passwordErrors', 'Sorry, your password was incorrect.');
    }
    res.redirect('/users/profile');
  });
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Delete account */
router.post('/deleteAccount', (req, res, next) => {
  User.deleteOne({ _id: req.user._id }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      console.log(doc);
      res.redirect('/');
    }
  });
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/* Get addresses page */
router.get('/addresses', isLogin, async (req, res, next) => {
  let addresses = await Address.find({ user: req.user._id });
  res.render('user/addresses', {
    addresses: addresses
  });
});

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

router.get("/addAddress", isLogin, async (req, res, next) => {
  console.log(req.headers.referer);
  let cart,
    prevPage = req.headers.referer;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
  }

  console.log(cart);
  res.render("addAddress", {
    user: req.user,
    cart: cart,
    token: req.csrfToken(),
    checkUser: true,
    prevPage,
  });
});

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Add address */
router.post('/addAddress', async (req, res, next) => {
  console.log(req.headers.referer);
  let address = new Address({
    user: req.user._id,
    name: req.body.fullName,
    phone: "+20" + req.body.phone,
    government: req.body.government,
    city: req.body.city,
    street: `${req.body.street} / ${req.body.building} / ${req.body.floor}`
  });

  await address.save();

  if (req.body.prevPage.includes('/users/addresses')) {
    res.redirect('/users/addresses');
  } else {
    req.user.addressID = address._id;
    res.redirect('/checkout');
  }
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

router.get("/updateAddress/:id", isLogin, async (req, res, next) => {
  console.log(req.headers.referer);
  let cart,
    prevPage = req.headers.referer;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
  }

  let address = await Address.findOne({ _id: req.params.id });
  console.log(address);
  console.log(cart);
  res.render("addAddress", {
    user: req.user,
    cart: cart,
    token: req.csrfToken(),
    checkUser: true,
    prevPage,
    address
  });
});


/* Update address */
router.post('/updateAddress/:id', async (req, res, next) => {
  let address = await Address.findOne({ _id: req.params.id });
  address = {
    name: req.body.fullName,
    phone: "+20" + req.body.phone,
    government: req.body.government,
    city: req.body.city,
    street: `${req.body.street} / ${req.body.building} / ${req.body.floor}`
  };
  await Address.updateOne({ _id: req.params.id }, { $set: address });
  res.redirect('/users/addresses');
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Remove address */
router.get('/deleteAddress/:id', async (req, res, next) => {
  await Address.deleteOne({ _id: req.params.id });
  res.redirect('/users/profile');
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/* Get orders page */
router.get('/orders', isLogin, async (req, res, next) => {
  let orders = await Order.find({ user: req.user._id });
  res.render('user/orders', {
    orders: orders.reverse(),
    checkUser: req.isAuthenticated(),
    token: req.csrfToken()
  });
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

/* Get order page */
router.get('/orders/:id', isLogin, async (req, res, next) => {
  let order = await Order.find({ _id: req.params.id });
  console.log(order);
  let coupon = await Coupon.find({ code: order[0].coupon });
  let shippingCost = await Shipping.find({});
  res.render('user/order', {
    checkUser: req.isAuthenticated(),
    order: order,
    coupon: coupon[0],
    shippingCost: shippingCost[0].shippingPrice,
    token: req.csrfToken()
  });
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Return order */
router.post('/orders/returnOrder/:id', (req, res, next) => {
  Order.find({ _id: req.params.id }, async (err, order) => {
    console.log(req.body);
    let refund = 0, products = []; //make array of returned products and calculate the refund.
    let { returnedProducts, returnedQty } = req.body;
    if (typeof (returnedProducts) == 'string') returnedProducts = [returnedProducts];

    for (let i = 0; i < returnedProducts.length; i++) {
      //get the returned products from the order.
      let returnedProduct = order[0].cart.selectedProduct.find(product => returnedProducts[i] == product._id);
      products.push(returnedProduct);
      // get the index of product in the order.
      let index = order[0].cart.selectedProduct.indexOf(products[i]);
      //decrease the sold quantity.
      order[0].cart.selectedProduct[index].quantity -= returnedQty[index];
      //delete product from the order 
      if (order[0].cart.selectedProduct[index].quantity == 0) order[0].cart.selectedProduct.splice(index, 1);
      // number of returned amount of the product.
      products[i].returned = returnedQty[index];
      refund += products[i].price * returnedQty[index];
      // update the number of products sold in DB.
      let product = await Product.find({ _id: products[i]._id });
      product[0].sold -= returnedQty[index]; // calculate the refund.
      await Product.updateOne({ _id: products[i]._id }, { $set: product[0] });
    };

    let shippingCost = await Shipping.find({});

    order[0].shippingFee += shippingCost[0].shippingPrice;
    order[0].orderPrice += shippingCost[0].shippingPrice - refund;
    order[0].returnedOrder = {
      products: products,
      refund: refund
    };

    console.log(order);

    await Order.updateOne({ _id: req.params.id }, { $set: order[0] });
    res.redirect('/users/orders/' + req.params.id);
  });
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Cancel order */
router.post('/orders/cancelOrder/:id', async (req, res, next) => {
  await Order.deleteOne({ _id: req.params.id });
  res.redirect('/users/orders');
});


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


module.exports = router;