var connection = require('./../config');

module.exports.previous_reports=function(req,res){
  
    var report_technician_id=req.body.report_device_id;
    connection.query('SELECT results FROM test_reports WHERE report_device_id=?',[report_technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{
console.log(results);
          res.json({
            previous_reports:results,
              status:true,    
            message:"Success"
          });
      }
    });
}