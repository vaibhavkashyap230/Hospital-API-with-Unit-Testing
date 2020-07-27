//require express & create Router
const express = require('express');
const patientRouter = express.Router();

//require passport & jwt
const passport = require('passport');
const jwt = require('../config/passport-jwt-strategy');

//import controller
controller = require('../controllers/patientController');

//sending to relevant container

//for registering user
patientRouter.use('/register',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    return controller.registerPatient(req,res,next);
});

//for searching user
patientRouter.use('/search',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    return controller.patientSearch(req,res,next);
});

//for creating report
patientRouter.use('/createReports',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    return controller.createReport(req,res,next);
});

//for searching all reports
patientRouter.use('/searchReports',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    return controller.searchReports(req,res,next);
});

//for all other routes
patientRouter.use((req,res,next)=>{

    return res.status(404).json({
        'status': 'Kahan aa gaye bhai?'
    });
});

//exporting router to the index file
module.exports = patientRouter;