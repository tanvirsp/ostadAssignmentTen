const mongoose = require('mongoose');
const workSchema = mongoose.Schema({
    title :String,
    classNote: String,
    description: String,
    status: {type: String, default: "pending"},
    email: String
},{timestamps: true,versionKey:false} );


const WorksModel=mongoose.model('works', workSchema);
module.exports= WorksModel