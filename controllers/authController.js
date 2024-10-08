import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body; //comes from req.body and is an object we are destructuring it 

        //validations to check if all the fields are filled
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!address) {
            return res.send({ message: "Address is required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is required" })
        }

        //check user
        const exisitingUser = await userModel.findOne({ email });//i write it one time because email:email and also email is unique
        //if user already exist
        if (exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "Already registered please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
             name,
              email, 
              phone, 
              address, 
              password: hashedPassword,
              answer }).save();

        res.status(201).send({
            success: true,
            message: "User has been registered successfully",
            user //passing it to the user object remove while deploying Meesho project because sending password
        })
    } catch (error) {
        console.log("Error in hashing password error in register", error);
        res.status(500).send({
            success: false,
            message: "Error in registration in registerController in authController.js",
            error
        })

    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            console.log("email or password is missing");
            
            return res.status(404).send({
                success: false,
                message: "Invalid email or password  loginController in authController.js"
            })
        }
        console.log("login controller");
        
        //check user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered"
            })
        }
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password but password is incorrect "
            })
        }
        //generate token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "77d" });
        //send response
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: { name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role, },
            token
        })
    } catch (error) {
        console.log("Error login ", error);
        res.status(500).send({
            success: false,
            message: "Error in login in loginController",
            error
        })

    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email,answer,newPassword } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if (!answer) {
            return res.status(400).send({
                success: false,
                message: "Answer is required"
            })
        }
        if (!newPassword) {
            return res.status(400).send({
                success: false,
                message: "newPassword is required"
            })
        }

        const user = await userModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword);

        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

        
    } catch (error) {
        console.log("Error in forgot password ", error);
        res.status(500).send({
            success: false,
            message: "Error in forgot password in forgotPasswordController",
            error
        })
    }
}

export const testController= (req, res) => {
    res.send("Protected Route")
}

//update profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        if (password && password.length < 6) {
            return res.json({ error: "Password is required and should be min 6 characters long" })
        }
        const matchedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {
            name: name || user.name,
            password: matchedPassword || user.password,
            phone:phone || user.phone,
            address: address || user.address,
            email: email || user.email,
        },
            { new: true }
        );

        await user.save();
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error updating profile" });
    }
}

//orders
export const getOrdersController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        const orders = await orderModel
            .find({ buyer: user._id })
            .populate("products", "-photo")
            .populate("buyer", "name address");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error getting orders" });
    }
}

//all orders
export const getAllOrdersController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        const orders = await orderModel
            .find({ })
            .populate("products", "-photo")
            .populate("buyer", "name address")
            .sort({createdAt:-1})
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error getting orders" });
    }
}

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Fix: Pass orderId directly, not as an object
        const orders = await orderModel.findByIdAndUpdate(
            orderId,  // Pass orderId directly
            { status },
            { new: true }
        );
        
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error updating order status" });
    }
}
