import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js";
import dotenv from 'dotenv'
dotenv.config();

// this will be used for password encyption and decryption
const SECRET_KEY = process.env.SECRET_KEY;

// for registration
export const userRegister = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkUserExist = await User.findOne({ email });
        if (email == "" || password == "" || userName == "") {
            return res.json({
                success: false,
                message: "All fields are required !",
            });
        } else if (checkUserExist) {
            return res.json({
                success: false,
                message: "Email Already Exists! Please Enter Other Email",
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = User.create({
            userName,
            email,
            password: hashPassword,
        });
        res.status(200).json({
            success: true,
            message: "User Registration Successful",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

// for login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUserExist = await User.findOne({ email });
        console.log("User LogIn Info ", checkUserExist);

        if (email == "" || password == "") {
            return res.json({
                success: false,
                message: "All fields are required !",
            });
        }
        if (!checkUserExist)
            return res.json({
                success: false,
                message: "User does'not exist! Please register first ",
            });

        const checkPassword = await bcrypt.compare(
            password,
            checkUserExist.password
        );
        if (!checkPassword)
            return res.json({
                success: false,
                message: "Incorrect Password! Please try again ",
            });

        let token;
        try {
            token = jwt.sign( // this will create a token with expire time 60 minutes
                {
                    id: checkUserExist._id,
                    role: checkUserExist.role,
                    email: checkUserExist.email,
                    userName:checkUserExist.userName,
                },
                SECRET_KEY,
                { expiresIn: "60m" }
            );
        } catch (error) {
            // console.error("JWT Token Generation Error:", error.message);
            return res.json({ success: false, message: "Token generation failed" });
        }

        // res.cookie("UserToken", token, { httpOnly: true, secure: true }).json({
        //     success: true,
        //     message: "Logged-In Successfully",
        //     user: {
        //         email: checkUserExist.email,
        //         role: checkUserExist.role,
        //         id: checkUserExist._id,
        //         userName:checkUserExist.userName,
        //     },
        // });


        // sending cookie and token for frontend

        res.status(200).json({
            success:true,
            message:"login successfully",
            token,
            user: {
                        email: checkUserExist.email,
                        role: checkUserExist.role,
                        id: checkUserExist._id,
                        userName:checkUserExist.userName,
                    },

        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};



// for logout 

export const logoutUser = (req,res)=>{
    res.clearCookie('UserToken').json({// deleting cookie "UserToken"
        success:true,
        message:'Logged Out Successfully! ',
    })
}

// middleware for authentication

// export const userAuthMiddleware = async(req, res, next)=>{
//     const token = req.cookies.UserToken;
//     if(!token) return res.status(401).json({
//         success:false,
//         message:'Unauthorized User! '
//     })

//     try {
//         const decodedPass = jwt.verify(token,SECRET_KEY);
//         req.user = decodedPass;
//         next()
//     } catch (error) {
//         res.status(401).json({
//             success:false,
//             message:"Unauthorized User! "
//         })
//     }
// }
export const userAuthMiddleware = async(req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.status(401).json({
        success:false,
        message:'Unauthorized User! '
    })

    try {
        const decodedPass = jwt.verify(token,SECRET_KEY);
        req.user = decodedPass;
        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"Unauthorized User! "
        })
    }
}
