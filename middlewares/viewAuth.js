const jwt = require("jsonwebtoken");

const viewAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(403).json("You are not authorized to access this route");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(403).json("You are not authorized to access this token");
    }

    console.log(decoded)
    if(decoded.role==='doctor'){
        req.email = decoded.email;
    }else{
        req.id = req.query.doctor;
    }
    console.log("id",req.id)
    next()
}

module.exports = {
    viewAuth
}