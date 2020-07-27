//require Patient's DB && Report's DB
const patientsDb = require('../models/patientsSchema');
const reportDb = require('../models/reportsSchema');
const doctorDb = require('../models/doctorsSchema');

//for patient's registration
module.exports.registerPatient = (req,res,next)=>{

    doctorDb.findOne({email:req.user.email},(err,doctor)=>{

        if(err)
        {
            console.log(`Error in finding doctor from request : ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(doctor==null)
            return res.status(422).json({
                'status': 'Unauthorized Request'
            });
    });
    patientsDb.findOne({phone:req.body.phone},(err,check)=>{

        if(err)
        {
            console.log(`Error in checking if already exists. ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(check==null)
        {
            patientsDb.create(req.body);
            return res.status(200).json({
                'status': 'Patient Registered'
            });
        }
        
        return res.status(200).json(check);
    });
}

//for patient's login/search
module.exports.patientSearch = (req,res,next)=>{

    doctorDb.findOne({email:req.user.email},(err,doctor)=>{

        if(err)
        {
            console.log(`Error in finding doctor from request : ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(doctor==null)
            return res.status(422).json({
                'status': 'Unauthorized Request'
            });
    });

    patientsDb.findOne(req.body,(error,patient)=>{

        if(error)
        {
            console.log(`Error in finding patient ${error}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(patient==null)
        {
            return res.status(402).json(
                {
                    'status':'User-name not found'
                }
            );
        }

        return res.status(200).json({
            patient:patient
        });
    });
}

//for creating report
module.exports.createReport = (req,res,next)=>{

    doctorDb.findOne({email:req.user.email},(err,doctor)=>{

        if(err)
        {
            console.log(`Error in finding doctor from request : ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(doctor==null)
            return res.status(422).json({
                'status': 'Unauthorized Request'
            });
    });

    patientsDb.findOne({phone:req.body.phone},(err,user)=>{

        if(err)
        {
            console.log(`Error in finding user to create report ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(user==null)
        {
            return res.status(404).json({
                'status': 'No patient with this phone number.'
            });
        }

        let entry = {user:user._id,name:user.name,status:req.body.status,date:new Date(),doctor:req.user._id};
        reportDb.create(entry,(err,report)=>{

            if(err)
            {
                console.log(`Error in creating report ${err}`);
                return res.status(500).json({
                    'status':'Internal Server Error'
                });
            }

            return res.status(200).json({
                status: 'Report Created',
                report: report
            });
        });

    });
}

//for searching all reports of a patient
module.exports.searchReports = (req,res,next)=>{

    doctorDb.findOne({email:req.user.email},(err,doctor)=>{

        if(err)
        {
            console.log(`Error in finding doctor from request : ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        if(doctor==null)
            return res.status(422).json({
                'status': 'Unauthorized Request'
            });
    });

    const url = req.originalUrl.toString();
    let l = req.originalUrl.toString().length;
    let i=0;
    for(;i<l;i++)
    {
        if(url.charAt(i)=='=')
            break;
    }
    const phone = url.substring(i+1,l);

    patientsDb.findOne({phone:phone},(err,patient)=>{

        if(err)
        {
            console.log(`Error in finding user for all reports ${err}`);
            return res.status(500).json({
                'status':'Internal Server Error'
            });
        }

        reportDb.find({user:patient._id},(err,reports)=>{
        
            if(err)
            {
                console.log(`Error in finding reports of user ${err}`);
                return res.status(500).json({
                    'status':'Internal Server Error'
                });
            }

            return res.status(200).json({reports});
        });
    });
}