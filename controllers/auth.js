const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Doctor/Profile");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                error: "Please enter all required fields"
            })
        }

        //find the user account
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                error: "Wrong email or password"
            })
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(401).json({
                error: "Wrong email or password"
            })
        };

        // log in
        // jwt token
        const token = jwt.sign({
            email: email,
            user: existingUser._id,
            role: existingUser.role
        }, process.env.JWT_SECRET);

        // cokkie
        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true
        }).send();
    } catch (error) {
        return res.status(500).json("Something went wrong! Please try again")
    }
}

const registerController = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;
    try {
        
        if (password.length < 6) {
            return res.status(400).send("Please enter a password of atleast 6 characters")
        }


        const findUser = await User.find({ email });
        console.log(findUser)
        if (findUser.length > 0) {
            return res.status(400).send("Email already exists")
        }

        // hashing salts
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await new User({ firstname, lastname, email, password: passwordHash, role });
        const savedUser = await newUser.save()
        
        if(role==="doctor"){
            const userProfile = await new Profile({firstname:firstname, lastname:lastname, email:email});
            const info = await userProfile.save()
            console.log(info)
        }

        console.log(savedUser)

        // jwt token
        const token = jwt.sign({
            email: email,
            user: savedUser._id,
            role: role
        }, process.env.JWT_SECRET);
        console.log(token)

        // cokkie
        res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true
        }).send();

    } catch (error) {
        return res.status(500).json({
            error: "Something went wrong! Please try again"
        })
    }
}


const logoutController = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).send();
    } catch (error) {
        return res.status(500).json("Something went wrong! Please try again");
    }
}

const isLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).send("You are not authorized")
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).send("You are not authorized")
        }
        res.status(200).json({
            email:decoded.email,
            id: decoded.user,
            role: decoded.role
        });
    } catch (error) {
        return res.status(500).json("Something went wrong! Please try again");
    }
}

module.exports = {
    loginController,
    registerController,
    logoutController,
    isLoggedIn
}