import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);  //verify token from header and secret key from .env
        req.user = decode; //when user hit it comes in token then we verify
                          // and convert into json object now information is stored in req.user object so that next middleware can access it normally
       
        next();

    } catch (error) {
        console.log(error, "require sign in middleware error");

    }
}


//admin vendor access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized access"
            })
        }
        else {
            next();
        }

    } catch (error) {
        console.log("admin middleware error", error);
        res.status(401).send({
            success: false,
            message: "Error in admin middlware", 
        })

    }
}