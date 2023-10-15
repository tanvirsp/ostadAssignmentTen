const  mongoose=require('mongoose');
const OTPSchema=mongoose.Schema({
    email:String,
    otp: String,
    status:{type:Number, default:0},
    
},{timestamps: true,versionKey:false});

const OTPModel=mongoose.model('otps',OTPSchema);
module.exports=OTPModel

