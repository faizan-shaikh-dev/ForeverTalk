import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs";

//Register User Logic
export const registerUser = async (req, res) =>{
    try {
        const {username, password} = req.body;

        const isUserExist = await User.findOne({username});

        if (isUserExist) {
            return res.status(400).json({
                message:"User already exist"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            passwordHash: hashPassword
        });

        return res.status(200).json({message:"User Register Successfully",
            user
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error"
        });
        
    }
}


//Login User Logic

export const loginUser = async (req, res) =>{
    try {
        const {username, password} = req.body;

        const isUser = await User.findOne({username});

        if (!isUser) {
            return res.status(404).json({message:"User not Found"});
        }
        
        const isPasswordMatch = await bcrypt.compare(password, isUser.passwordHash);

        if (!isPasswordMatch) {
            return res.status(401).json({message:"Invalid or Wrong Password"});
        }

        const token = jwt.sign(
            {
                userId : isUser._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"7d"
            },
        );

        return res.status(200).json({message:"User Login Successfully",
            token,
            userId: isUser._id,
            username: isUser.username
        });
    } catch (error) {
          console.error(error);
          return res.status(500).json({message:"Internal Server Error"});
                 
    }
};