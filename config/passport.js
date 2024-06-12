const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const localStrategy = require('passport-local').Strategy;
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const User = require('../models/user');
const Token = require('../models/token');
const Cart = require('../models/cart');


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Google auth */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/users/google/callback",
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    // check first if user already exists in our DB.
    //console.log(profile);
    User.findOne({ authID: profile.id }, (error, currentUser) => {
        if (currentUser) {
            //console.log(currentUser);
            done(null, currentUser)
        } else {
            const newUser = new User({
                authType: "Google",
                authID: profile.id,
                username: profile.displayName,
                email: profile.email,
                password: new User().hashPassword(process.env.GOOGLE_SECRET_PASSWORD),
                isVerified: true,
            });
            newUser.save((error, user) => {
                if (error) {
                    return done(error);
                }
                return done(null, user);
            });
        }
    });
}
));


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* Facebook auth */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/users/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
}, (accessToken, refreshToken, profile, done) => {
    // check first if user already exists in our DB.
    console.log(profile);
    User.findOne({ authID: profile.id }, (error, currentUser) => {
        if (currentUser) {
            done(null, currentUser)
        } else {
            const newUser = new User({
                authType: "Facebook",
                authID: profile.id,
                username: profile._json.name,
                password: new User().hashPassword(process.env.FACEBOOK_SECRET_PASSWORD),
                emailToken: crypto.randomBytes(64).toString('hex'),
                isVerified: true,
            });
            newUser.save((error, user) => {
                if (error) {
                    return done(error);
                }
                return done(null, user);
            });
        }
    });
}
));


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* local login */
passport.use('local-login', new localStrategy({
    usernameField: 'emailLog',
    passwordField: 'passwordLog',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (error, user) => {
        if (error) {
            return done(error);
        }

        if (!user) {
            return done(null, false, req.flash('loginError', 'This email not found.'));
        }

        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('loginError2', 'Sorry, your password was incorrent.'));
        }

        return done(null, user);
    });
}));


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* local register */
passport.use('local-register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    // if the user is already logged in:
    if (req.user) {
        // just pass back his data
        return done(null, req.user);
    }

    // we check if no other user has already taken this email
    User.findOne({ email: email }, async (error, user) => {
        if (error) {
            return done(error);
        }

        // check if a user found with this email
        if (user) {
            //fail the sign up
            console.log("this email already exist");
            return done(null, false, req.flash('errorEmail', 'this email already exist'));
        }

        console.log(req.body.verified);

        const newUser = new User({
            authType: "Local",
            username: req.body.username,
            email: email,
            password: new User().hashPassword(password),
            //isVerified: (!req.body.verified),
            phone: req.body.phone || '',
            role: req.body.role || 'Customer',
        });

        await newUser.save((error, user) => {
            if (error) return done(error);
            return done(null, user);
        });

        let verifyToken = new Token({
            userId: newUser._id,
            token: crypto.randomBytes(64).toString('hex')
        });

        await verifyToken.save();

        let link = `localhost:3000/users/${newUser._id}/verifyEmail/${verifyToken.token}`;
        let subject = 'Account Verification Required';
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
                            <h1 style="font-size: 24px; color: #333333; margin: 20px 0px; border-bottom: 1px solid #ccc;">Verify your email</h1>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="background-color: #ffffff; padding: 20px; text-align: left; direction: ltr;">
                            <p style="font-size: 16px; color: #333333;">Dear ${newUser.username},</p>
                            <p style="font-size: 16px; color: #333333;">We are reaching out to you regarding your account on Tarkeba Perfume site.</p>
                            <p style="font-size: 16px; color: #333333;">To ensure the security and integrity of our platform, we kindly request you to verify your account.</p>
                            <br>
                            <p style="font-size: 16px; color: #333333;">To complete the verification process, please click on the button below:</p>
                            <br>
                            <table cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="border-radius: 4px; background-color: #4028df; text-align: center;" width="auto" height="40">
                                        <a href="localhost:3000/users/${newUser._id}/verifyEmail/${verifyToken.token}" style="color: #ffffff; font-size: 16px; text-decoration: none; display: inline-block; padding: 10px 30px;">Verify</a>
                                    </td>
                                </tr>
                            </table>
                            <br>
                            <p style="font-size: 16px; color: #333333;">Please note that failure to verify your account within 1 hour may result in limited access to certain features or services. We highly recommend completing the verification process as soon as possible to avoid any inconvenience.</p>
                            <br>
                            <p style="font-size: 16px; color: #333333;">We appreciate your cooperation in this matter. We appreciate your continued support and look forward to serving you on our platform.</p>
                            <br>
                            <p style="font-size: 16px; color: #333333;">Best regards.</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="background-color: #ffffff; text-align: center; padding: 20px;">
                            <p style="font-size: 12px; color: #666666;">This email was sent to you as a registered user of Tarkeba Perfume site. If you received this email in error, please ignore it.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

        await sendEmail(newUser.email, subject, htmlTemplate);
        // // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'tarkebaperfume@gmail.com', // generated ethereal user
        //         pass: '@AM2004am11#', // generated ethereal password
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        // // send mail with defined transport object
        // let mailOptions = transporter.sendMail({
        //     from: 'tarkebaperfume@gmail.com', // sender address
        //     to: req.body.email, // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     html: `<b>Hello world?</b>
        //     <p>verify your email</p>
        //     <a href="http://${req.headers.host}/users/verifyEmail?token=${newUser.emailToken}"> click here </a>
        //     `, // html body
        // });

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if(error) {
        //         console.log('the error is ......' + error);
        //     } else {
        //         console.log('mail sent:' + info.response);
        //     }
        // });


    });
}));


/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


/* passport session setup */
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (error, user) => {
        Cart.findOne({ _id: id }, (error, cart) => {
            if (!cart) {
                return done(error, user);
            }
            user.cart = cart;
            return done(error, user);
        });
    });
});