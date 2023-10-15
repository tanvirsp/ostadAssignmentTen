const jwt = require("jsonwebtoken");
const StudentsModel = require("../Models/StudentsModel");
const SendEmailUtility = require("../Utility/SendEmailUtility");
const OTPModel = require("../Models/OTPModel");


exports.registration = async( req, res) =>{
    try {
        const data = req.body;
        const result = await StudentsModel.create(data);
        res.status(200).json({status:"success", data:result})
    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};



exports.login = async( req, res) =>{
    try {

        const data = req.body;
        const result = await StudentsModel.find(data).count();
        if(result === 1){
            // Create Token
            const token = jwt.sign({email: data.email}, process.env.ACCESS_TOKEN,  { expiresIn: '1d' });
            res.status(200).json({status:"success", data: token})

        } else {
            res.status(400).json({status:"fail", data:"No User Found"})
        }




        
    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};



exports.allStudents = async( req, res) =>{
    try {
        const result = await StudentsModel.find({});
        res.status(200).json({status:"success", data:result})
    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};




exports.studentById = async( req, res) =>{
    try {
        const id = req.params.id;
        const result = await StudentsModel.find({_id: id});
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};



exports.updateStudent = async( req, res) =>{
    try {
        const id = req.params.id;
        const data = req.body;


        const result = await StudentsModel.updateOne({_id: id}, data);
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};


exports.deleteStudent = async( req, res) =>{
    try {
        const id = req.params.id;

        const result = await StudentsModel.deleteOne({_id: id});
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};







exports.recoverVerifyEmail=async (req,res)=>{
    const email = req.params.email;
    const OTPCode = Math.floor(100000 + Math.random() * 900000);
    const EmailText="Your Verification Code is ="+ OTPCode
    const EmailSubject="Task manager verification code"

    const result= await StudentsModel.find({email:email}).count();
    if(result===1){
        // Verification Email
       await SendEmailUtility(email, EmailText, EmailSubject);
       await OTPModel.create({email:email, otp:OTPCode})
       res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})

    }
    else{
        res.status(200).json({status:"fail",data:"No User Found"})
    }

};



exports.recoverVerifyOTP=async (req,res)=>{
    const email = req.params.email;
    const OTPCode = req.params.otp;
    const status= 0;
    const statusUpdate=1;

    const result= await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    
    if(result===1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status}, {status:statusUpdate})
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }

};



exports.recoverResetPass=async (req,res)=>{

    const {email, OTPCode, newPassword  } = req.body;

    const statusUpdate= 1;

    const result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result===1){
        await StudentsModel.updateOne({email: email}, {password:newPassword})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }
}



