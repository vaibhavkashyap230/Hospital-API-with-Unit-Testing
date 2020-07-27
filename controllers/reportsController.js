//require Report's DB & Doctor's DB
const reportsDb = require('../models/reportsSchema');
const doctorDb = require('../models/doctorsSchema');

module.exports.reportsStatus = (req,res,next)=>{

    doctorDb.findOne({email:req.user.email},(err,doctor)=>{

        if(err)
        {
            console.log(`Error in finding doctor from request : ${err}`);
            return;
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
    const status = url.substring(i+1,l);

    reportsDb.find({status:status},(err,reports)=>{

        return res.status(200).json({reports});
    });
}