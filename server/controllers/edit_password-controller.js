var connection = require('./../config');
var bcrypt = require('bcrypt');


module.exports.editpassword=function(req,res){
   var technician_id = req.body.technician_id;
   var admin_id = req.body.admin_id;

    console.log(req.body.admin_id);
    console.log(req.body.technician_id);
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

if (req.body.admin_id == undefined) {



    connection.query('UPDATE technician_details SET password = ? WHERE technician_id = ?',[hash,technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{

console.log(results);
 
        
          res.json({
              status:true,    
             message:"Password Successfully changed "
          });
        }
      
    });




}
else{




    connection.query('UPDATE admin_login SET password = ? WHERE admin_id = ?',[hash,admin_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{

console.log(results);
 
        
          res.json({
              status:true,    
             message:"Password Successfully changed "
          });
        }
      
    });



}



}