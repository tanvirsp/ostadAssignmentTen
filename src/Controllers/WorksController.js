const WorksModel = require("../Models/WorksModel");

exports.addWork = async( req, res) =>{
    try {
        const data = req.body;
        data.email = req.headers.email
        
        const result = await WorksModel.create(data);
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};



exports.workById = async( req, res) =>{
    try {
        const id = req.params.id;
        
        const result = await WorksModel.find({_id: id});
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};



exports.viewMyWorks = async( req, res) =>{
    try {
        const myEmail = req. headers.email;
        
        const result = await WorksModel.find({email: myEmail});
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};







exports.updateWork = async( req, res) =>{
    try {
        const id = req.params.id;
        const data = req.body;
        
        const result = await WorksModel.updateOne({_id: id}, data );
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};



exports.deleteWork = async( req, res) =>{
    try {
        const id = req.params.id;
        const result = await WorksModel.deleteOne({_id: id} );
        res.status(200).json({status:"success", data:result})

    } catch (error) {
         res.status(200).json({status:"fail", data:error})
    }
};
