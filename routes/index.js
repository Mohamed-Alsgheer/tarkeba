const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const translate = require("translate-google");
const Products = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Coupon = require("../models/coupon");
const customProduct = require("../models/customProduct");
const Shipping = require("../models/shipping");
const Question = require("../models/question");
const Feedback = require("../models/feedback");
const Policy = require("../models/policies");
const AboutUs = require("../models/aboutUs");
const ImgSlider = require("../models/imagesSlider");
const Address = require("../models/address");
const Category = require("../models/category");

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

/* check if user is login */
function isLogin(req, res, next) {
  console.log(req.isAuthenticated());
  console.log(req.user);
  if (!req.isAuthenticated()) {
    res.redirect("/users/account");
    return;
  }
  next();
}

/* GET home page. */
router.get("/", async (req, res, next) => {
  console.log(req.user);
  req.session.hello = "hello";
  console.log(req.session.hello);
  const successMessage = req.flash("success");
  let cart;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
  }
  let imgSlider = await ImgSlider.find();
  //console.log(imgSlider);
  Products.find({}, async (error, doc) => {
    if (error) console.log(error);
    //console.log('your products:');
    //console.log(doc);
    let categories = await Category.find({ parent: "None" });
    let menProductsLink = await Category.findById({
      _id: "64a58b456c327f36e46e5ebc",
    });
    let menProducts = doc.filter((item) => item.fragrance == "For Men");
    let womenProducts = doc.filter((item) => item.fragrance == "For Women");
    let womenProductsLink = await Category.findById({
      _id: "64a58b6b6c327f36e46e5ec2",
    });
    let sortedProduct = doc
      .filter((product) => product.sold != 0)
      .sort((a, b) => {
        if (a.sold > b.sold) return -1;
        if (a.sold < b.sold) return 1;
        return 0;
      });
    console.log(menProductsLink);
    let bestSelling = sortedProduct.splice(0, 4);
    res.render("./layouts/tarkeba", {
      men: menProducts.splice(0, 4),
      women: womenProducts.splice(0, 4),
      bestSelling: bestSelling,
      checkUser: req.isAuthenticated(),
      cart: cart,
      success: successMessage,
      slides: imgSlider,
      categories,
      menProductsLink: menProductsLink.slug,
      womenProductsLink: womenProductsLink.slug,
    });
  });
});

/* GET Q&A page */
router.get("/FAQs", async (req, res, next) => {
  let cart,
    questions = await Question.find({});
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
  }

  res.render("./FAQ", {
    checkUser: req.isAuthenticated(),
    cart: cart,
    questions: questions,
  });
});

/* GET product page */
router.get("/product-page/:id/:name", async (req, res, next) => {
  const alreadyReviewed = req.flash("alreadyReviewed");
  const addReview = req.flash("addReview");
  let cart;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }

  let product = await Products.findById({ _id: req.params.id });
  console.log(product);

  res.render("./product", {
    checkUser: req.isAuthenticated(),
    cart: cart,
    productInfo: product,
    alreadyReviewed: alreadyReviewed,
    addReview: addReview,
  });
});

/* review product */
router.post("/review/:id", (req, res, next) => {
  Products.findById({ _id: req.params.id }, async (error, product) => {
    if (error) {
      console.log(error);
    } else {
      const { rating, comment } = req.body;
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        req.flash("alreadyReviewed", "Product already Reviewed.");
        res.redirect("/product-page/:id/:name");
      } else {
        const dateNow = new Date();
        const review = {
          name: req.body.customerName,
          rating: Number(rating),
          comment: comment,
          user: req.user._id,
          date: `${dateNow.getDate()}/${dateNow.getMonth() + 1
            }/${dateNow.getFullYear()}`,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.overallRating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
        await product.save();
        req.flash("addReview", "Reviewed added.");
        res.redirect(`/product-page/${product._id}/${product.name}`);
      }
    }
  });
});

router.get("/about", async (req, res, next) => {
  let about = await AboutUs.find({}),
    cart;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }
  res.render("./about", {
    checkUser: req.isAuthenticated(),
    cart: cart,
    about: about[0],
  });
});

router.get("/terms", async (req, res, next) => {
  let policies = await Policy.find({}),
    cart;
  let terms = policies.find((policy) => policy.policyType == "terms");
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }
  res.render("./terms", {
    checkUser: req.isAuthenticated(),
    cart: cart,
    terms: terms,
  });
});

router.get("/shipping-returns", async (req, res, next) => {
  let policies = await Policy.find({}),
    cart;
  let returns = policies.find((policy) => policy.policyType == "returns");
  let shipping = policies.find((policy) => policy.policyType == "shipping");
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }
  res.render("./returns", {
    checkUser: req.isAuthenticated(),
    cart: cart,
    returns: returns,
    shipping: shipping,
  });
});

router.get("/privacy-policy", async (req, res, next) => {
  let policies = await Policy.find({}),
    cart;
  let privacy = await policies.find((policy) => policy.policyType == "privacy");
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }
  res.render("./privacy", {
    checkUser: req.isAuthenticated(),
    cart: cart,
    privacy: privacy,
  });
});

router.get("/feedback", async (req, res, next) => {
  let cart;
  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }
  res.render("./feedback", {
    checkUser: req.isAuthenticated(),
    cart: cart,
  });
});

router.post("/sendFeedback", async (req, res, next) => {
  let { name, email, feedback } = req.body;
  let newFeedback = new Feedback({
    name: name,
    email: email,
    feedback: feedback,
    date: `${dateNow.getDate()}/${dateNow.getMonth() + 1
      }/${dateNow.getFullYear()}`,
  });
  await newFeedback.save();
  res.redirect("/feedback");
});

router.get("/custom", async (req, res, next) => {
  let customPerfume = await customProduct.findOne({ _id: '64e23058d54e491974ad7f17' });
  let cart;

  if (req.isAuthenticated()) {
    cart = await Cart.findOne({ _id: req.user._id });
    console.log("my cart: " + cart);
  }

  res.render("./createProduct", {
    checkUser: req.isAuthenticated(),
    cart, customPerfume
  });
});

router.post("/create", async (req, res, next) => {
  const cartID = req.user._id;
  const productPrice = 100 * parseInt(req.body.quantity);
  const newProduct = {
    name: req.body.productName,
    link: req.body.productLink,
    img: req.body.bottleColor,
    price: 100,
    quantity: parseInt(req.body.quantity),
    total: productPrice,
  };

  let userCart = await Cart.findById(cartID);

  if (!userCart) {
    const newCart = new Cart({
      _id: cartID,
      totalQuantity: parseInt(req.body.quantity),
      totalPrice: productPrice,
      selectedProduct: [newProduct],
    });

    await newCart.save();
  } else {
    userCart.selectedProduct.push(newProduct);
    userCart.totalQuantity = userCart.totalQuantity + parseInt(req.body.quantity);
    userCart.totalPrice = userCart.totalPrice + productPrice;
    await Cart.updateOne({ _id: cartID }, { $set: userCart });
  }
  res.redirect('back');
});

/* Add to cart */
router.post("/addToCart/:id", isLogin, async (req, res, next) => {
  Products.findById(req.params.id, async (error, product) => {
    if (error) console.log(error);
    let { quantity } = req.body;
    console.log(quantity);
    quantity = quantity || 1;
    console.log("its exist......");
    console.log(quantity);
    const cartID = req.user._id;
    const productPrice = product.pricing.price * quantity;
    const newProduct = {
      _id: req.params.id,
      name: product.name,
      img: product.images[0].url,
      size: product.size,
      fragrance: product.fragrance,
      price: product.pricing.price,
      stock: product.stock,
      quantity: quantity,
      total: productPrice,
    };

    let userCart = await Cart.findById(cartID);

    if (!userCart) {
      const newCart = new Cart({
        _id: cartID,
        totalQuantity: parseInt(quantity),
        totalPrice: productPrice,
        selectedProduct: [newProduct],
      });

      await newCart.save();
    } else {
      // Check if the product is in the cart or not
      let index = -1;
      for (let i = 0; i < userCart.selectedProduct.length; i++) {
        if (req.params.id === userCart.selectedProduct[i]._id) {
          index = i;
          break;
        }
      }

      if (index >= 0) {
        // Add the same product
        userCart.selectedProduct[index].quantity += parseInt(quantity);
        userCart.selectedProduct[index].total += productPrice;
      } else {
        // Add new product
        userCart.selectedProduct.push(newProduct);
      }

      userCart.totalQuantity += parseInt(quantity);
      userCart.totalPrice += productPrice;
      await Cart.updateOne({ _id: cartID }, { $set: userCart });
    }
  });
  res.redirect('back');
});

/*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/

/*

route for search                   /search/...          // show products that i search for            // Done ✅
route for specific category        /category/...        // show products that have specific category  // Done ✅
route for all categories           /categories          // show all categories                        // Done ✅
route for most product seller      /most-seller         // show best seller products                  // Done ✅

*/

/* Categories */
router.get("/categories/:slug", async (req, res, next) => {
  let { slug } = req.params;
  let parentCategory = await Category.find({ slug });
  let subCategories =
    parentCategory.length !== 0
      ? await Category.find({ parent: parentCategory[0].name })
      : await Category.find();
  let findObject =
    slug === "search"
      ? {}
      : slug === "best-seller"
        ? { sold: { $gte: 1 } }
        : { categories: { $in: parentCategory[0].name } };
  let products = await Products.find(findObject);

  let productsPrices = products.map(
    (product) => product.pricing.salePrice || product.pricing.price
  );
  let productsSizes = products.map((product) => parseInt(product.size));
  let maxPriceProduct = Math.max(...productsPrices),
    maxSizeProduct = Math.max(...productsSizes);
  let productsTypes = products
    .map((product) => product.productType)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  let {
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    sortType,
    fragrance,
    origins,
    type,
    category,
    search_query,
  } = req.query;
  let search = search_query || "";
  let minPriceSelected = minPrice || 0;
  let maxPriceSelected = maxPrice || maxPriceProduct;
  let minSizeSelected = minSize || 0;
  let maxSizeSelected = maxSize || maxSizeProduct;
  let sort = sortType || "overallRating";
  let fragranceSearch = fragrance || "all";
  let originSearch = origins || "all";
  let typeSearch = type || "all";
  let categorySearch = category || "all";
  let fragranceOptions = ["For Men", "For Women", "For Kids", "Unisex"];
  let originsOptions = ["western", "oriental", "mix"];

  fragranceSearch === "all"
    ? (fragranceSearch = [...fragranceOptions])
    : typeof fragranceSearch === "string"
      ? (fragranceSearch = fragrance.split(","))
      : fragrance;
  originSearch === "all"
    ? (originSearch = [...originsOptions])
    : typeof originSearch === "string"
      ? (originSearch = origins.split(","))
      : origins;
  typeSearch === "all"
    ? (typeSearch = [...productsTypes])
    : (typeSearch = type.split(",") ? typeof typeSearch === "string" : type);
  categorySearch === "all"
    ? (categorySearch = [...subCategories])
    : (categorySearch = category.split(",")
      ? typeof categorySearch === "string"
      : category);
  sort === sortType ? (sort = sortType.split(",")) : (sort = [sort]);
  let sortBy = {};
  if (slug === "best-seller") sort = ["sold"];
  console.log(sort);
  if (sort[1]) {
    sortBy[sort[0]] = parseInt(sort[1]);
  } else {
    sortBy[sort[0]] = -1;
  }

  let offeredProducts = await Products.find(findObject)
    .where("name")
    .regex(new RegExp(search, "i"))
    .where("fragrance")
    .in([...fragranceSearch])
    .where("origin")
    .in([...originSearch])
    .where("productType")
    .in([...typeSearch])
    .where("categories")
    .in([...categorySearch.map((category) => category.name)])
    .where("pricing.price")
    .gte(minPriceSelected)
    .lte(maxPriceSelected)
    .sort(sortBy);
  offeredProducts.filter(
    (product) =>
      parseInt(product.size) >= minSizeSelected &&
      parseInt(product.size) >= maxSizeSelected
  );
  console.log(minSizeSelected, maxSizeSelected);
  console.log(minPriceSelected, maxPriceSelected);
  console.log(fragranceSearch, originSearch, typeSearch, sortBy);
  console.log(categorySearch.map((category) => category.name));
  console.log(offeredProducts);
  console.log(parentCategory);
  res.render("./productList", {
    slug,
    offeredProducts,
    productsTypes,
    subCategories,
    maxPriceProduct,
    maxSizeProduct,
    search,
    pageTitle:
      parentCategory.length !== 0 ? parentCategory[0].pageTitle : "Best Seller",
  });
});

/*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/ /*/*/

/* GET cart page. */
router.get("/cart", isLogin, (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/login");
  } else {
    const userCart = req.user.cart;
    console.log(req.params);
    console.log(req.user.cart);
    if (!req.user.cart) {
      //هغيرها بعدين
      res.render("cart", {
        userCart: req.user.cart,
        checkUser: true,
        totalProducts: 0,
      });
      return;
    }
  }
  res.render("cart", {
    userCart: req.user.cart,
    checkUser: true,
    totalPrice: parseInt(req.user.cart.totalPrice),
    totalProducts: req.user.cart.totalQuantity,
  });
});

/* change product qty +1 */
router.get("/increasProduct/:index", (req, res, next) => {
  console.log(req.params.index);
  const index = req.params.index;
  const cartUser = req.user.cart;
  const totalPrice = cartUser.selectedProduct[index].price;
  //change product quantity & total//
  cartUser.selectedProduct[index].quantity =
    cartUser.selectedProduct[index].quantity + 1;
  cartUser.selectedProduct[index].total =
    cartUser.selectedProduct[index].total + totalPrice;
  //change cart cost & quantity//
  cartUser.totalQuantity = cartUser.totalQuantity + 1;
  cartUser.totalPrice = cartUser.totalPrice + totalPrice;
  //save cart changes in database//
  Cart.updateOne({ _id: cartUser.id }, { $set: cartUser }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      console.log(doc);
      res.redirect('back');
    }
  });
});

/* change product qty -1 */
router.get("/decreasProduct/:index", (req, res, next) => {
  console.log(req.params.index);
  const index = req.params.index;
  const cartUser = req.user.cart;
  const totalPrice = cartUser.selectedProduct[index].price;
  //change product quantity & total//
  cartUser.selectedProduct[index].quantity =
    cartUser.selectedProduct[index].quantity - 1;
  cartUser.selectedProduct[index].total =
    cartUser.selectedProduct[index].total - totalPrice;
  //change cart cost & quantity//
  cartUser.totalQuantity = cartUser.totalQuantity - 1;
  cartUser.totalPrice = cartUser.totalPrice - totalPrice;
  //save cart changes in database//
  Cart.updateOne({ _id: cartUser.id }, { $set: cartUser }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      console.log(doc);
      res.redirect('back');
    }
  });
});

/* delete product */
router.post("/deleteProduct/:index", async (req, res, next) => {
  const productIndex = req.params.index;
  const userCart = req.user.cart;
  console.log(userCart);
  if (userCart.selectedProduct.length > 1) {
    userCart.totalPrice -= userCart.selectedProduct[productIndex].total;
    userCart.totalQuantity -= userCart.selectedProduct[productIndex].quantity;
    userCart.selectedProduct.splice(productIndex, 1);

    await Cart.updateOne({ _id: userCart.id }, { $set: userCart });
  } else {
    await Cart.deleteOne({ _id: userCart.id });
  }
  res.redirect('back');
});

/* Get select address page */
router.get("/selectAddress", (req, res, next) => {
  const selectError = req.flash("chooseAddress");
  Address.find({ user: req.user._id }, (err, address) => {
    if (err) {
      console.log(err);
    } else {
      if (req.user.cart) {
        totalProducts = req.user.cart.totalQuantity;
      } else {
        totalProducts = 0;
      }

      res.render("selectAddress", {
        checkUser: true,
        checkProfile: true,
        address: address,
        totalProducts: totalProducts,
        selectError: selectError,
      });
    }
  });
});

router.post("/selectAddress", isLogin, (req, res, next) => {
  req.user.addressID = req.body.addressID;
  res.redirect("/checkout");
});



router.get("/checkout", (req, res, next) => {
  Address.find(
    { _id: localStorage.getItem("addressID") },
    async (err, address) => {
      if (err) console.log(err);
      let shippingCost = await Shipping.find({});
      console.log(address);
      const userCart = req.user.cart;
      res.render("checkout", {
        checkUser: true,
        user: req.user,
        userCart: userCart,
        deliveryAddress: address,
        totalPrice: req.user.cart.totalPrice + shippingCost[0].shippingPrice,
        shippingCost: shippingCost[0].shippingPrice,
      });
    }
  );
});

router.get("/coupons", async (req, res, next) => {
  let coupons = await Coupon.find();
  res.json(coupons);
});

router.post("/checkout", async (req, res, next) => {
  let userAddress = Address.findOne({ _id: req.user.addressID });
  // console.log(address);
  // console.log(req.body.PaymentMethod);
  // console.log(address[0].name);

  let shippingPrice = await Shipping.find();
  console.log(shippingPrice);
  //let coupon = Coupon.find({code: req.body.coupon});
  let order = new Order({
    user: req.user._id,
    name: userAddress.name,
    cart: req.user.cart,
    phone: userAddress.phone,
    shippingAddress: {
      name: userAddress.name,
      city: userAddress.city,
      government: userAddress.government,
      street: userAddress.street,
    },
    shippingFee: req.body.shippingCost,
    paymentMethod: req.body.paymentMethod,
    status: "Pending", //Delivered //Pending //Processing //Cancel //Returned
    orderPrice: req.body.totalCost,
    coupon: req.body.coupon,
  });

  for (let i = 0; i < req.user.cart.selectedProduct.length; i++) {
    let product = await Products.find({
      _id: req.user.cart.selectedProduct[i]._id,
    });
    product[0].sold += req.user.cart.selectedProduct[i].quantity;
    await Products.updateOne(
      { _id: req.user.cart.selectedProduct[i]._id },
      { $set: product[0] }
    );
  }
  /*
  await Order.deleteMany();
  */

  await order.save();
  await Cart.deleteOne({ _id: req.user.cart.id });
  req.flash("success", "Products purchased successfully!!");
  res.redirect("/");
});

module.exports = router;
