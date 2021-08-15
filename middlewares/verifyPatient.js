const jwt = require("jsonwebtoken");

const verifyPatient = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(403).json("You are not authorized to access this route");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded || decoded.role!='patient'){
        return res.status(403).json("You are not authorized to access this token");
    }

    console.log(decoded)
    req.id = decoded.user;
    req.email = decoded.email;
    req.role = decoded.role;
    next()
}

module.exports = {
    verifyPatient
}