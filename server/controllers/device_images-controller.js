var connection = require('./../config');



module.exports.device_images_details=function(req,res){
  
    
    connection.query('SELECT * FROM device_images', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            device_images_details:results,
              status:true,    
            message:"Successfully"
          });
        
      }
    });
}