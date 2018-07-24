var connection = require('./../config');
var bcrypt = require('bcrypt');


module.exports.technician_details=function(req,res){
  
    
    connection.query('SELECT * FROM `technician_details', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);



        
          res.json({

            Technician:results,
              status:true,    
            message:"Successfully"
          });
        
      }
    });
}




module.exports.technician_register=function(req,res){
  


var username = req.body.username;
var fullname = req.body.fullname;
var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

var roles =req.body.roles;
var login_access = req.body.login_access;

    connection.query('SELECT * FROM technician_details WHERE username=?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query1234'
            });
      }else{

console.log(results);

if(results.length >0){

        
          res.json({

            
             status:false,
             message:'Already technician name is existed'

           
          });

}
else{


    connection.query('INSERT INTO technician_details (username, fullname, password, roles, login_access) VALUES (?, ?, ?, ?,?)',[username,fullname,hash,roles,login_access]
, function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"technician successfully register"
          });
        
      }
    });



}
         
        
      }
    });

}







module.exports.edit_technician=function(req,res){

var username = req.body.username;
var fullname = req.body.fullname;
var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

var roles =req.body.roles;
var login_access = req.body.login_access;

var technician_id=req.body.technician_id


    connection.query('SELECT * FROM technician_details WHERE username=? and technician_id !=?',[username, technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query1234'
            });
      }else{

console.log(results.length);

if(results.length>0){

        
          res.json({

            
             status:false,
             message:'Already technician name is existed'

           
          });

}
else{


    connection.query('UPDATE technician_details SET username =?, fullname =?, password =?, roles =?, login_access =? WHERE technician_id = ?',[username, fullname, hash, roles, login_access, technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"technician successfully register"
          });
        
      }
    });



}
         
        
      }
    });

}















