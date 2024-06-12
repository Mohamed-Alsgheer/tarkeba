const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const Address = require("../models/address");
const Question = require("../models/question");
const Feedback = require("../models/feedback");
const Coupon = require("../models/coupon");
const Category = require("../models/category");
const Policy = require("../models/policies");
const AboutUs = require("../models/aboutUs");
const Shipping = require("../models/shipping");
const ImgSlider = require("../models/imagesSlider");
const customProduct = require("../models/customProduct");
const upload = require('../utils/multer');
const cloudinary = require("../utils/cloudinary");
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const country = require('country-state-city').State;
const egyptStates = country.getStatesOfCountry("EG");
const { file } = require("googleapis/build/src/apis/file");



const firstDayOfPreviousMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
const lastDayOfPreviousMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
function lastMonthsDataFrom(arr) {
    return arr.filter(data => new Date(data.createdAt) <= lastDayOfPreviousMonth && new Date(data.createdAt) >= firstDayOfPreviousMonth);
}

function thisMonthsDataFrom(arr) {
    return arr.filter(data => new Date(data.createdAt) > lastDayOfPreviousMonth);
}

/* Dashboard */
router.get('/', async (req, res, next) => {
    // users details
    let users = await User.find();
    let usersLastMonth = lastMonthsDataFrom(users).length;
    let usersThisMonth = thisMonthsDataFrom(users).length;
    usersLastMonth = usersLastMonth || 1; // to avoid division by zero.
    let usersPercentage = ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;

    // orders details
    let orders = await Order.find();
    let ordersLastMonth = lastMonthsDataFrom(orders);
    let ordersThisMonth = thisMonthsDataFrom(orders);
    let numOfOrdersLastMonth = ordersLastMonth.length || 1; // to avoid division by zero.
    let ordersPercentage = ((ordersThisMonth.length - numOfOrdersLastMonth) / numOfOrdersLastMonth) * 100;

    // income details
    let incomeThisMonth = 0, incomeLastMonth = 0;
    // collect the total amounts paid in orders for the last month.
    ordersThisMonth.forEach(order => incomeThisMonth += parseInt(order.orderPrice));
    // collect the total amounts paid in orders for this month.
    ordersLastMonth.forEach(order => incomeLastMonth += parseInt(order.orderPrice));

    incomeLastMonth = incomeLastMonth || 1; // to avoid division by zero.
    let incomePercentage = ((incomeThisMonth - incomeLastMonth) / incomeLastMonth) * 100;
    console.log(incomeLastMonth);
    console.log(incomeThisMonth);

    res.render("./admin/dashboard", {
        newUsers: usersThisMonth,
        usersPerc: usersPercentage.toFixed(),
        orders: orders.slice(0, 5),
        newOrders: ordersThisMonth.length,
        ordersPerc: ordersPercentage.toFixed(),
        currentIncome: incomeThisMonth,
        incomePerc: incomePercentage.toFixed()
    });
});

router.post('/', async (req, res, next) => {
    let orders = await Order.find();
    let products = await Product.find();
    res.json([orders, products]);
});


/* Customers */
router.get('/users/customers', async (req, res, next) => {
    let customers = await User.find({ role: 'Customer' });
    res.render("./admin/customers/customersList", { customers });
});


router.get('/usersData', async (req, res, next) => {
    let customers = await User.find({ role: 'Customer' });
    res.json(customers);
});


router.post('/admin/deleteUser/:id', async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id });
    res.redirect('back');
});


router.get('/users/staff', async (req, res, next) => {
    let staff = await User.find({ role: { $ne: 'Customer' } });
    res.render("./admin/customers/staffList", { staff });
});


router.get('/staffsData', async (req, res, next) => {
    let staffs = await User.find({ role: { $ne: 'Customer' } });
    res.json(staffs);
});


router.post('/users/addStaff', passport.authenticate('local-register', {
    failureRedirect: '/admin/users/staff',
    failureFlash: true // allow flash messages
}), (req, res, next) => {
    res.redirect('/admin/users/staff');
});

router.get('/users/userDetails/:id', async (req, res, next) => {
    let user = await User.findOne({ _id: req.params.id });
    let userAddresses = await Address.find({ user: req.params.id });
    let userOrders = await Order.find({ user: req.params.id });
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let ordersValue = userOrders.map(order => order.orderPrice).reduce((acc, curr) => acc + curr, 0);
    let numOfOrders = userOrders.length
    let avgOrderValue = (ordersValue / numOfOrders) || 0;
    let showRole = user.role !== 'Customer';
    console.log(user);
    res.render("./admin/customers/userDetails", { user, userAddresses, userOrders, avgOrderValue, ordersValue, numOfOrders, showRole });
});

router.post('/users/updateUser/:id', async (req, res, next) => {
    let user = await User.findOne({ _id: req.params.id });
    user.role = req.body.role;
    console.log(req.body.role, user);
    await User.updateOne({ _id: req.params.id }, { $set: user });
    res.redirect('/admin/users/staff');
});

/* Orders */
router.get('/orders', async (req, res, next) => {
    let orders = await Order.find();

    res.render("./admin/orders/ordersList", {
        orders: orders,
    });
});


router.post('/orders', async (req, res, next) => {
    let orders = await Order.find();
    res.json(orders);
});


router.post('/deleteOrders', async (req, res, next) => {
    await Order.deleteMany();
    res.redirect('/admin/orders/ordersList');
});


router.get('/order/:id', (req, res, next) => {
    let orderID = req.params.id;
    Order.find({ _id: orderID }, (error, order) => {
        console.log(order);
        User.find({ _id: order[0].user }, (error, user) => {
            console.log(user);
            res.render("./admin/orders/orderDetails", {
                order: order[0],
                user: user[0],
            });
        });
    });
});


router.post('/editOrder', (req, res, next) => {
    Order.findOne({ _id: req.body.id }, async (error, order) => {
        console.log(order);
        order.status = req.body.status;
        order.note = req.body.note;
        if (req.body.status == 'delivered') order.isPaid = true;
        await order.save();
        res.redirect("/admin/orders");
    });
});


/* Products */
router.get('/productList', async (req, res, next) => {
    let products = await Product.find();
    res.render("./admin/catalog/productsList", {
        products: products
    });
});



router.post('/deleteProduct', async (req, res, next) => {
    let product = await Product.find({ _id: req.body.deleteBtn });
    await Category.updateMany({ name: { $in: product[0].categories } }, { $inc: { items: -1 } });
    const destroyer = async (publicId) => await cloudinary.destroys(publicId);
    const folderDestroyer = async (folder) => await cloudinary.destroyFolder(folder);
    for (let i = 0; i < product[0].images.length; i++) {
        await destroyer(product[0].images[i].public_id);
    }
    await folderDestroyer(product[0].name);
    await Product.deleteOne({ _id: req.body.deleteBtn });
    res.redirect('/admin/productList');
});



router.get('/productsData', async (req, res, next) => {
    let products = await Product.find({});
    res.json(products);
});


router.get('/product', async (req, res, next) => {
    let categories = await Category.find();
    res.render("./admin/catalog/product", {
        categories: categories
    });
});


router.get('/product/:id', async (req, res, next) => {
    let product = await Product.findOne({ _id: req.params.id });
    let categories = await Category.find();
    console.log(product);
    res.render("./admin/catalog/product", {
        product, categories
    });
});


router.post('/createProduct', upload.array("images"), async (req, res, next) => {
    let {
        name, price, salePrice, categories, stock,
        classifications, size, origin, fragrance,
        visibility, publishDate, description,
        productType, altText, orderOfImg, pageTitle, metaDesc
    } = req.body;

    Product.findOne({ name }, async (error, product) => {
        if (error) console.log(error);
        if (product) {
            req.flash('existProduct', 'there is product have the same name.');
            res.redirect("/admin/product");
        } else {
            console.log(req.body);
            console.log(req.files);
            const uploader = async (path) => await cloudinary.uploads(path, name);
            let imagesResponse = [];

            if (!Array.isArray(orderOfImg)) orderOfImg = [orderOfImg];
            if (!Array.isArray(altText)) altText = [altText];


            for (let i = 0; i < req.files.length; i++) {
                let { path } = req.files[i];
                let newPath = await uploader(path);
                imagesResponse.push(newPath);
                imagesResponse[i].order = orderOfImg[i];
                imagesResponse[i].altText = altText[i];
                fs.unlinkSync(path);
            }

            if (Array.isArray(classifications)) {
                classifications = classifications.map(classify => JSON.parse(classify));
            } else if (classifications !== undefined) {
                classifications = [JSON.parse(classifications)];
            } else {
                classifications = [];
            }

            if (classifications !== undefined) {
                categories = [categories];
            } else if (!Array.isArray(categories)) {
                categories = [];
            }
            await Category.updateMany({ name: { $in: categories } }, { $inc: { items: 1 } });
            console.log(imagesResponse);

            let discount = 0;
            if (salePrice !== '0') {
                discount = (price - salePrice) / price * 100;
            }

            let newProduct = new Product({
                name, stock,
                visibility, size, origin,
                fragrance, productType,
                metaDesc, publishDate, pageTitle,
                categories,
                details: classifications,
                desc: description,
                images: imagesResponse,
                pricing: { price, salePrice, discount }
            });

            await newProduct.save();
            res.redirect("/admin/productList");
        }
    });
});



router.post('/updateProduct/:id', upload.array("images"), async (req, res, next) => {
    let {
        name, price, salePrice, categories, stock,
        classifications, size, origin, fragrance,
        visibility, publishDate, description, deletedImages,
        productType, altText, orderOfImg, pageTitle, metaDesc
    } = req.body;

    Product.findOne({ name }, async (error, product) => {
        // try {
        if (error) console.log(error);
        if (!Array.isArray(orderOfImg)) orderOfImg = [orderOfImg];
        if (!Array.isArray(altText)) altText = [altText];
        if (!Array.isArray(deletedImages) && deletedImages !== undefined) {
            deletedImages = [deletedImages];
        } else {
            deletedImages = [];
        }
        const uploader = async (path) => await cloudinary.uploads(path, name);
        const destroyer = async (publicId) => await cloudinary.destroys(publicId);
        console.log(deletedImages);
        for (let i = 0; i < deletedImages.length; i++) {
            let test = await destroyer(deletedImages[i]);
            console.log(test);
            product.images = product.images.filter(img => img.public_id !== deletedImages[i]);
        }
        let imagesResponse = [];

        for (let i = req.files.length - 1; i >= 0; i--) {
            let { path } = file;
            let newPath = await uploader(path);
            imagesResponse.push(newPath);
            imagesResponse[i].order = orderOfImg[i];
            imagesResponse[i].altText = altText[i];
            product.images.push(...imagesResponse);
            imagesResponse = [];
            fs.unlinkSync(path);
        }
        console.log(imagesResponse);
        console.log(product);
        console.log(product.categories);
        console.log(categories);


        await Category.updateMany({ name: { $in: product.categories } }, { $inc: { items: -1 } });

        if (typeof categories === 'string') categories = [categories];
        if (!Array.isArray(categories)) categories = [];

        await Category.updateMany({ name: { $in: categories } }, { $inc: { items: 1 } });

        console.log(classifications);
        if (Array.isArray(classifications)) {
            classifications = classifications.map(classify => JSON.parse(classify));
        } else if (classifications !== undefined) {
            classifications = [JSON.parse(classifications)];
        } else {
            classifications = [];
        }
        console.log(classifications);
        console.log(imagesResponse);

        let discount = 0;
        if (salePrice !== '0') {
            discount = ((price - salePrice) / price * 100).toFixed();
        }

        console.log(categories);

        product = {
            name, stock,
            visibility, size, origin,
            fragrance, productType,
            metaDesc, publishDate, pageTitle,
            desc: description, categories,
            details: classifications,
            pricing: { price, salePrice, discount }
        };
        await Product.updateOne({ _id: req.params.id }, { $set: product });
        res.redirect("/admin/productList");
        // } catch (err) {
        //     console.log(err);
        // }
    });
});



/* Categories */
router.get('/category', (req, res, next) => {
    let existCategory = req.flash('existCategory');
    let notUniqueSlug = req.flash('notUniqueSlug');
    res.render('./admin/catalog/category', { existCategory, notUniqueSlug });
});


router.get('/category/:id', async (req, res, next) => {
    let category = await Category.findOne({ _id: req.params.id });
    let allCategories = await Category.find();
    console.log(allCategories);
    res.render('./admin/catalog/category', {
        category: category,
        categories: allCategories
    });
});



router.post('/updateCategory/:id', upload.array("image"), async (req, res, next) => {
    Category.findOne({ _id: req.params.id }, async (error, category) => {
        if (error) console.log(error);
        try {
            const uploader = async (path) => await cloudinary.uploads(path, 'Categories');
            const destroyer = async (publicId) => await cloudinary.destroys(publicId);
            //let test = await destroyer(deletedImages);
            //console.log(test);
            category.image = {};
            console.log(req.files);
            if (req.files.length !== 0) {
                let { path } = req.files[0];
                let newPath = await uploader(path);
                console.log(newPath);
                category.image = newPath;
                fs.unlinkSync(path);
            }

            await Product.updateMany({ categories: category.name }, { $set: { 'categories.$': req.body.name } });


            category.pageTitle = req.body.title;
            category.metaDesc = req.body.metaDesc;
            category.name = req.body.name;
            category.slug = req.body.slug;
            category.parent = req.body.parentCategory;
            category.visibility = req.body.visibility;
            category.publishDate = req.body.postDate || "";
            await Category.updateOne({ _id: req.params.id }, { $set: category });
            res.redirect("/admin/categoriesList");
        } catch (err) {
            console.log(err);
        }
    });
});



router.get('/categoriesData', async (req, res, next) => {
    let categories = await Category.find({});
    res.json(categories);
});



router.post('/createCategory', upload.array("image"), async (req, res, next) => {
    Category.findOne({ name: req.body.name }, async (error, category) => {
        let notUniqueSlug = await Category.findOne({ slug: req.body.slug });
        console.log(notUniqueSlug);
        if (error) console.log(error);
        if (category) {
            req.flash('existCategory', 'There is category have the same name.');
            res.redirect("/admin/category");
        } else if (notUniqueSlug) {
            req.flash('notUniqueSlug', 'There is category have the same slug.');
            res.redirect("/admin/category");
        } else {
            console.log(req.body);
            const uploader = async (path) => await cloudinary.uploads(path, 'Categories');
            let path, newPath;
            if (req.files.length !== 0) {
                path = req.files[0].path;
                newPath = await uploader(path);
            }
            let newCategory = new Category({
                pageTitle: req.body.title,
                metaDesc: req.body.metaDesc,
                name: req.body.name,
                slug: req.body.slug,
                parent: req.body.parentCategory,
                visibility: req.body.visibility,
                image: newPath || {},
                publishDate: req.body.postDate || ""
            });
            await newCategory.save();
            if (req.files.length !== 0) fs.unlinkSync(path);
            res.redirect("/admin/categoriesList");
        }
    });
});



router.post('/deleteCategory/:id', async (req, res, next) => {
    try {
        let category = await Category.find({ _id: req.params.id });
        const destroyer = async (publicId) => await cloudinary.destroys(publicId);
        console.log(category.image);
        if (category.image !== {} && category.image !== undefined) await destroyer(category[0].image.public_id);
        await Category.deleteOne({ _id: req.params.id });
        res.redirect('/admin/categoriesList');
    } catch (err) {
        console.log(err);
    }
});



router.get('/categoriesList', async (req, res, next) => {
    let categories = await Category.find();
    res.render('./admin/catalog/categoriesList', {
        categories: categories
    });
});



/* Coupons */
router.get('/couponsList', async (req, res, next) => {
    let coupons = await Coupon.find();
    res.render("./admin/marketing/couponsList", {
        coupons: coupons
    });
});



router.get('/couponsData', async (req, res, next) => {
    let coupons = await Coupon.find({});
    res.json(coupons);
});



router.get('/coupon', async (req, res, next) => {
    const existCoupon = req.flash('existCoupon');
    res.render("./admin/marketing/coupon", {
        existCoupon: existCoupon
    });
});



router.get('/coupon/:id', async (req, res, next) => {
    let coupon = await Coupon.findOne({ _id: req.params.id });
    res.render("./admin/marketing/coupon", {
        coupon: coupon
    });
});



router.post('/createCoupon', async (req, res, next) => {
    Coupon.findOne({ code: req.body.code }, async (error, coupon) => {
        if (error) console.log(error);
        if (coupon) {
            req.flash('existCoupon', 'this coupon is already exist.');
            res.redirect("/admin/coupon");
        } else {
            let newCoupon = new Coupon({
                code: req.body.code,
                type: req.body.couponType,
                status: Date.now() >= new Date(req.body.startDate) ? "Enabled" : "Planned",
                discountValue: req.body.discountValue ? req.body.discountValue : "_",
                usageLimit: req.body.usageLimit || "unlimited",
                newUsers: req.body.newUsers ? true : false,
                startDate: req.body.startDate,
                endDate: req.body.endDate ? req.body.endDate : "_"
            });
            await newCoupon.save();
            res.redirect("/admin/couponsList");
        }
    });
});



router.post("/updateCoupon/:id", async (req, res, next) => {
    Coupon.findOne({ _id: req.params.id }, async (error, coupon) => {
        if (error) console.log(error);
        coupon.code = req.body.code;
        coupon.type = req.body.couponType;
        coupon.status = Date.now() >= new Date(req.body.startDate) ? "Enabled" : "Planned";
        coupon.discountValue = req.body.discountValue ? req.body.discountValue : "_";
        coupon.usageLimit = req.body.usageLimit ? req.body.usageLimit : "unlimited";
        coupon.newUsers = req.body.newUsers ? true : false;
        coupon.startDate = req.body.startDate;
        coupon.endDate = req.body.endDate ? req.body.endDate : "_";
        await Coupon.updateOne({ _id: req.params.id }, { $set: coupon });
    });
    res.redirect("/admin/couponsList");
});



router.post('/deleteCoupon', async (req, res, next) => {
    await Coupon.deleteOne({ _id: req.body.deleteBtn });
    res.redirect('/admin/couponsList');
});



/* Reviews */
router.get('/reviews', async (req, res, next) => {
    let products = await Product.find();
    products = products.filter(product => product.reviews.length !== 0);
    res.render("./admin/inbox/reviews", { products });
});


router.get('/reviewsData', async (req, res, next) => {
    let products = await Product.find();
    products = products.filter(product => product.reviews.length !== 0);
    res.json(products);
})


/* Feedback */
router.get('/feedback', async (req, res, next) => {
    Feedback.find({}, (error, doc) => {
        res.render("./admin/inbox/feedback", {
            feedback: doc
        });
    });
});


/* Questions */
router.get('/questions', async (req, res, next) => {
    let questions = await Question.find();
    res.render("./admin/questions", {
        questions: questions
    });
});

router.get('/questionsData', async (req, res, next) => {
    let questions = await Question.find();
    res.json(questions);
});

router.post('/createQuestion', async (req, res, next) => {
    let newQuestion = new Question({
        question: req.body.question,
        answer: req.body.answer
    });
    await newQuestion.save();
});

router.post('/updateQuestion/:id', async (req, res, next) => {
    Question.findOne({ _id: req.params.id }, async (error, doc) => {
        doc.question = req.body.question;
        doc.answer = req.body.answer;
        await Question.updateOne({ _id: req.params.id }, { $set: doc });
    });
});

router.post('/deleteQuestion/:id', async (req, res, next) => {
    await Question.deleteOne({ _id: req.params.id });
    res.redirect('/admin/productList');
});


/* Shipping */
router.get('/shipping', async (req, res, next) => {
    Shipping.findOne({ _id: '63d2c7b228b68e2f484c359f' }, async (error, doc) => {
        res.render("./admin/shipping", {
            states: egyptStates,
            deliveryPlaces: doc.deliveryPlaces,
            shippingPrice: doc.shippingPrice,
        });
    });
});



router.post('/updateShippingData', async (req, res, next) => {
    Shipping.findOne({ _id: '63d2c7b228b68e2f484c359f' }, async (error, doc) => {
        console.log("test500", req.body.deliveryPlaces);
        doc.shippingPrice = parseInt(req.body.shippingPrice);
        doc.deliveryPlaces = req.body.deliveryPlaces;
        await Shipping.updateOne({ _id: '63d2c7b228b68e2f484c359f' }, { $set: doc });
        res.redirect('/admin/');
    });
});



router.get('/imgSliderControl', async (req, res, next) => {
    let slides = await ImgSlider.find({});
    res.render('./admin/imgSliderControl', {
        slides: slides
    });
});



router.post('/saveImgSlider', upload.array("uploadImg"), async (req, res, next) => {
    let { objectFit, order, linkStatus, link, btnValue, fontColor, btnColor, x, y } = req.body;
    console.log(req.body);
    console.log(req.files);
    const uploader = async (path) => await cloudinary.uploads(path, 'Images slider');

    let { path } = req.files[0];
    let newPath = await uploader(path);

    let slide = new ImgSlider({
        img: newPath,
        objectFit,
        order,
        linkStatus,
        link,
        btnValue,
        btnColor,
        fontColor,
        coordinates: { x, y }
    });
    await slide.save();
    fs.unlinkSync(path);
    res.redirect('/admin/imgSliderControl');
});

router.post('/editImgSlider', upload.array("uploadImg"), (req, res, next) => {
    let { slide, objectFit, order, linkStatus, link, btnValue, fontColor, btnColor, x, y } = req.body;
    ImgSlider.findOne({ public_id: slide }, async (error, slide) => {
        console.log(req.body);
        console.log(req.files);
        if (req.files[0]) {
            const uploader = async (path) => await cloudinary.uploads(path, 'Images slider');
            let { path } = req.files[0];
            let newPath = await uploader(path);
            slide.img = newPath;
            fs.unlinkSync(path);
        }

        slide = {
            objectFit,
            order,
            linkStatus,
            link,
            btnValue,
            btnColor,
            fontColor,
            coordinates: { x, y }
        };
        await ImgSlider.updateOne({ public_id: slide.public_id }, { $set: slide });
        res.redirect('/admin/imgSliderControl');
    });
});


router.post('/deleteImgSlider', upload.none(), async (req, res, next) => {
    let slide = await ImgSlider.findOne({ _id: req.body.slide });
    console.log(slide);
    const destroyer = async (publicId) => await cloudinary.destroys(publicId);
    await destroyer(slide.img.public_id);
    await ImgSlider.deleteOne({ _id: req.body.slide });
    res.redirect('/admin/imgSliderControl');
});


/* Policies */
router.get('/policies', async (req, res, next) => {
    let policies = await Policy.find({});
    res.render('./admin/policies', {
        privacy: policies.find((policy) => policy.policyType == 'privacy'),
        return: policies.find((policy) => policy.policyType == 'returns'),
        shipping: policies.find((policy) => policy.policyType == 'shipping'),
        terms: policies.find((policy) => policy.policyType == 'terms')
    });
});


router.post('/editPolicies', async (req, res, next) => {
    let { policyType, privacy, returns, shipping, terms } = req.body
    Policy.findOne({ policyType: policyType }, async (error, policy) => {
        if (policyType == 'privacy') {
            policy.text = privacy;
        } else if (policyType == 'returns') {
            policy.text = returns;
        } else if (policyType == 'shipping') {
            policy.text = shipping;
        } else {
            policy.text = terms;
        }
        await Policy.updateOne({ policyType: policyType }, { $set: policy });
    });
    res.redirect('/admin/policies');
});


/* Custom perfume */
router.get('/customPerfume', async (req, res, next) => {
    let customPerfume = await customProduct.findOne({ _id: '64e23058d54e491974ad7f17' });
    res.render('./admin/customPerfume', {
        customPerfume
    });
});

router.post('/updateCustomPerfume', upload.array("images"), async (req, res, next) => {
    let {
        price, salePrice, description, altText, selectedImages,
        deletedImages, size, orderOfImg, pageTitle, metaDesc
    } = req.body;

    let customPerfume = await customProduct.findOne({ _id: '64e23058d54e491974ad7f17' });

    console.log(req.body);
    console.log(req.files);
    if (!Array.isArray(orderOfImg)) orderOfImg = [orderOfImg];
    if (!Array.isArray(altText)) altText = [altText];
    if (!Array.isArray(selectedImages)) selectedImages = [selectedImages];
    if (!Array.isArray(deletedImages) && deletedImages !== undefined) {
        deletedImages = [deletedImages];
    } else {
        deletedImages = [];
    }

    const uploader = async (path) => await cloudinary.uploads(path, "Custom perfume");
    const destroyer = async (publicId) => await cloudinary.destroys(publicId);
    console.log(deletedImages);
    for (let i = 0; i < deletedImages.length; i++) {
        let test = await destroyer(deletedImages[i]);
        console.log(test);
        customPerfume.images = customPerfume.images.filter(img => img.public_id !== deletedImages[i]);
    }
    let imagesResponse = [];

    for (let i = 0; i < req.files.length; i++) {
        let { path } = req.files[i];
        let newPath = await uploader(path);
        customPerfume.images.push(newPath);
        fs.unlinkSync(path);
    }

    for (let i = 0; i < customPerfume.images.length; i++) {
        customPerfume.images[i].order = orderOfImg[i];
        customPerfume.images[i].altText = altText[i];
    }

    for (let i = 0; i < customPerfume.images.length; i++) {
        for (let j = 0; j < selectedImages.length; j++) {
            if (customPerfume.images[i].order == selectedImages[j]) {
                customPerfume.images[i].selected = true;
            }
        }
    }
    customPerfume.images.sort((a, b) => a.order - b.order);
    console.log(customPerfume.images);

    let discount = 0;
    if (salePrice !== '0') {
        discount = (price - salePrice) / price * 100;
    }

    let whiteSpaceRegex = /\s*,\s*/g;
    size = size.replace(whiteSpaceRegex, ',').split(',');

    customPerfume = {
        images: customPerfume.images,
        metaDesc, pageTitle, size,
        desc: description,
        pricing: { price, salePrice, discount }
    };

    await customProduct.updateOne({ _id: '64e23058d54e491974ad7f17' }, { $set: customPerfume });
    res.redirect("/admin/customPerfume");
});


/* About Us */
router.get('/about', async (req, res, next) => {
    let about = await AboutUs.find({});
    res.render('./admin/about', {
        about: about[0]
    });
});

router.post('/editAbout', async (req, res, next) => {
    let text = { text: req.body.text };
    await AboutUs.updateOne({ _id: '63ea45d50494f21900811fa4' }, { $set: text });
    res.redirect('/admin/about');
});



module.exports = router;