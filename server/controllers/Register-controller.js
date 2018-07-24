
var connection = require('./../config');
var bcrypt = require('bcrypt');


module.exports.authenticate1234=function(req,res){
  
    
    connection.query('SELECT * FROM login', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            data:results,
              status:false,    
            message:"Successfully"
          });
        
      }
    });
}