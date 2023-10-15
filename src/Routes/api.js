const express = require('express');
const router = express.Router()

const AuthVerifyMiddleware = require('../Middleware/AuthVerifyMiddleware');

const StudentsController = require("../Controllers/StudentsController");
const WorksController = require("../Controllers/WorksController");




//Student Router
router.post("/registration", StudentsController.registration );
router.post("/login", StudentsController.login );

//Student Password Rest Router
router.get("/recoverVerifyEmail/:email", StudentsController.recoverVerifyEmail);
router.get("/recoverVerifyOTP/:email/:otp",StudentsController.recoverVerifyOTP);
router.post("/recoverResetPass", StudentsController.recoverResetPass);


router.get("/allStudents", AuthVerifyMiddleware, StudentsController.allStudents );
router.get("/studentById/:id", AuthVerifyMiddleware, StudentsController.studentById );
router.post("/updateStudent/:id", AuthVerifyMiddleware, StudentsController.updateStudent );
router.delete("/deleteStudent/:id", AuthVerifyMiddleware, StudentsController.deleteStudent );


//Works Router
router.post("/addWork", AuthVerifyMiddleware, WorksController.addWork );
router.get("/viewWorkById/:id", AuthVerifyMiddleware, WorksController.workById );
router.get("/viewMyWorks", AuthVerifyMiddleware, WorksController.viewMyWorks);
router.post("/updateWork/:id", AuthVerifyMiddleware, WorksController.updateWork );
router.delete("/deleteWork/:id", AuthVerifyMiddleware, WorksController.deleteWork );


//OTP Router


module.exports = router;