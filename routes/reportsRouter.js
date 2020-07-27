//require Express and Router
const express = require('express');
const doctorsRouter = express.Router();

//require passport & jwt
const passport = require('passport');
const jwt = require('../config/passport-jwt-strategy');

// importing relevant controller
const controller = require('../controllers/reportsController');

// sending to relevant controller
doctorsRouter.use('/status',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    return controller.reportsStatus(req,res,next);
});

//exporting router to index
module.exports = doctorsRouter;