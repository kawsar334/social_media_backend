const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Use bcryptjs
const jwt = require("jsonwebtoken");

// Register user 
const Register = async (req, res, next) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists", success: false });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                ...req.body,
                password: hashedPassword,
            });

            await user.save();
            res.status(201).json({ message: "User registered successfully", success: true });
        }
    } catch (err) {
        next(err);
    }
}

// Login user
const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        console.log(process.env.JWT_SECRET)
        res.status(200).json({ message: "User logged in successfully", success: true, token });
    } catch (err) {
        next(err);
    }
}

module.exports = { Register, Login };
