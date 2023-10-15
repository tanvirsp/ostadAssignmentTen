const  mongoose=require('mongoose');

const studentSchema = mongoose.Schema({
    email:{
        type:String, 
        unique:true,  
        trim: true,
        required: [true, "Please add a email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial",
          ],
    },
    firstName: String,
    lastName:String,
    mobile:String,
    password:{type: String, trim: true,},
    address: String,
    roll: String,
    class: String
},{timestamps: true,versionKey:false});


const StudentsModel=mongoose.model('students', studentSchema);
module.exports=StudentsModel