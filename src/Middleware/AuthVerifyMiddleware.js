const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{

    const token = req.headers.token;
    
    if(!token){
        return res.status(401).json("Access denied");
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded){
            if (err) {
                return res.status(403).send(err);
            }
            req.headers.email = decoded.email;
            
            next()
        } )
    }


}