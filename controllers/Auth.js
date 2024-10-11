

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


// REGISTRATION
const register = async (req, res, next) => {
    const { email, password,  } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(200).json({ message: "user already Exist  please Login ", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword){
            return res.status(200).json({ message: "invalid user information!", success: false });

        }
        const user = new User({ 
            ...req.body,
             password: hashedPassword,
            });
        const saveUser = await user.save();
        // await User.updateMany({ role:"admin" }, { $push: { notifications: { name: saveUser.username, message: "has created an account !" } } })
        res.status(201).json({ message: "User registered successfully.", success: true, saveUser });
    } catch (err) {
        next(err);
    }
}


//LOGIN  
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: false, message: "You are not registered", })
        } else {
            const hashedPassword = await bcrypt.compare(password, user.password);
            if (!hashedPassword) {
                return res.status(200).json({ success: false, message: "invalid password or Email !", })
            } else {
                const token = await jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRETE, { expiresIn: "1d" });
                const { password, ...others } = user._doc;
                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'Strict' }).json({
                    message: "Login successfully ",
                    success: true,
                    token,
                }) 
            } 
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
}


module.exports = { register, login };














// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: "example@gmail.com",
//         pass: "password"
//     }
// })

// // REGISTRATION
// const register = async (req, res, next) => {
//     const { username, email, password, avatar, isAdmin, role, seenNotification, notifications } = req.body;
//     try {
//         const userExist = await User.findOne({ email });
//         if (userExist) {
//             return res.status(200).json({ message: "user already Exist  please Login ", success: false });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword, avatar, isAdmin, role, seenNotification, notifications });
//         const saveUser = await user.save();


//         await User.updateMany({ isAdmin: true }, { $push: { notifications: { name: saveUser.username, message: "has created an account !" } } });
//         // send welcome email
//         const mailOptions = {
//             from: "example@gmail.com",
//             to: saveUser.email,
//             subject: 'welcome to our Service',
//             text: `Hi ${saveUser.name}`
//         };
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("error Sending mail:", error)
//             } else {
//                 console.log(info.response);
//             }
//         })
//         res.status(201).json({ message: "User registered successfully.", success: true });
//     } catch (err) {
//         next(err);
//     }
// }