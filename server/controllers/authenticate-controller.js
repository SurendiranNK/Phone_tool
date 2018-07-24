var connection = require('./../config');
var bcrypt = require('bcrypt');

module.exports.authenticate=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    console.log(username);

if (username == "admin") {

    connection.query('SELECT admin_login.*, test_devices.* FROM admin_login LEFT JOIN test_devices ON admin_login.admin_id = test_devices.admin_id WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
		  console.log(error);
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
         if(results.length >0){
            bcrypt.compare(password, results[0].password, function(err, ress) {
              console.log(ress);
                if(!ress){
                    res.json({
                      status:false,                  
                      message:"Email and password does not match"
                    });
                }else{                    
                    res.json({

                      login:results,
                        status:true,
                        message:"Successfully Login"
                    })
                }
            });         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"



          });
        }
      }
    });
}
else
{


 connection.query('SELECT technician_details.*, test_devices.test_device_id, test_devices.suite_title, test_devices.device_id, test_devices.admin_id, test_devices.client_id, test_devices.only_manual, test_devices.all_tests, test_devices.automated_tests, test_devices.manual_tests, test_devices.test_names, test_devices.suite_enabled FROM technician_details left JOIN test_devices ON technician_details.technician_id = test_devices.technician_id WHERE username =?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
         if(results.length >0){
            bcrypt.compare(password, results[0].password, function(err, ress) {
              console.log(ress);
                if(!ress){
                    res.json({
                      status:false,                  
                      message:"Email and password does not match"
                    });
                }else{                    
                    res.json({

                      login:results,
                        status:true,
                        message:"Successfully Login"
                    })
                }
            });         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });







}







}



module.exports.authenticate123=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    console.log(username);
    //var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));



    connection.query('SELECT * FROM Login WHERE username=?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{

console.log(results);
bcrypt.compare(password, results[0].password, function(err, res) {
    // res === true

    console.log(res);
});



         if(results.length >0){
           
                                  
                    res.json({
                        status:true,
                        message:"Successfully register"
                    })
                }
                     
        
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}
