import User from "../models/User.js";
import bcryptjs from "bcryptjs";

const Register = async(req,res)=>{
    try {
        const {name, email, password} = req.body;

        // Add console.log to debug the request body
        // console.log("Request body:", req.body);

        if(!name ||!email ||!password){
            return res.status(400).json({
                success: false, 
                msg: "Please fill all fields",
                receivedData: {name, email, password} // Show what data was received
            });
        }

        const ExistUser = await User.findOne({email});

        if(ExistUser){
            return res.status(400).json({success:false, msg: "User already exists"});
        }
        
        const hashedPassword = await bcryptjs.hash(password,10);
        const user = new User({name, email, password:hashedPassword});
        await user.save();
        return res.status(201).json({success:true, msg: "User registered successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, msg: "Internal Server Error"});
    }
}

const Login = async(req, res) => {
    try {
        const {email, password}= req.body;
        
        if(!email ||!password){
            return res.status(400).json({success: false, msg: "Please fill all fields"});
        }
        const FindUser = await User.findOne({email})

        if(!FindUser){
            return res.status(404).json({success: false, msg: "User not found"});
        }
        const checkPass = await bcryptjs.compare(password, FindUser.password);
        
        if(!checkPass){
            return res.status(403).json({success: false, msg: "Wrong Password"});
        }
        return res.status(200).json({success: true, msg: "Logged in successfully", Users: FindUser});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, msg: "Internal Server Error"});
    }
}

export {Register,Login}