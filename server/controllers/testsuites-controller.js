var connection = require('./../config');



module.exports.testsuites_register=function(req,res){
   var technician_id = req.body.technician_id;
   var admin_id = req.body.admin_id;
   var only_manual =req.body.only_manual;
   var automated_tests = req.body.automated_tests;
   var suite_enabled = req.body.suite_enabled;
   var all_tests = req.body.all_tests;
   var manual_tests = req.body.manual_tests;
   var test_names = req.body.test_names;
   var suite_title = req.body.suite_title;
var test_device_id = req.body.test_device_id;

    console.log(req.body.admin_id);
    console.log(req.body.technician_id);



if (req.body.admin_id == undefined) {

if (test_device_id == undefined) {

console.log(test_device_id);
    connection.query('INSERT INTO test_devices(only_manual,automated_tests,suite_enabled,all_tests,manual_tests,test_names,suite_title,technician_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"Testsuites successfully register"
          });
        
      }
    });



}
else

{




console.log(test_device_id);
    connection.query('UPDATE test_devices SET only_manual = ?, automated_tests = ?, suite_enabled= ?, all_tests = ?,manual_tests = ?,test_names = ?, suite_title = ?,technician_id = ? WHERE test_device_id = ?',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, technician_id, test_device_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"Testsuites successfully register"
          });
        
      }
    });






  
}


}
else{


if (test_device_id == undefined) {


console.log(test_device_id);

    connection.query('INSERT INTO test_devices(only_manual,automated_tests,suite_enabled,all_tests,manual_tests,test_names,suite_title,admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, admin_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"Testsuites successfully register"
          });
        
      }
    });


}
else

{


console.log(test_device_id);
    connection.query('UPDATE test_devices SET only_manual = ?, automated_tests = ?, suite_enabled= ?, all_tests = ?,manual_tests = ?,test_names = ?, suite_title = ?,admin_id = ? WHERE test_device_id = ?',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, admin_id, test_device_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"Testsuites successfully register"
          });
        
      }
    });




}
   

}


}






module.exports.testsuites_details=function(req,res){
   var admin_id =req.body.admin_id;
   var technician_id= req.body.technician_id;

   if (req.body.admin_id == undefined) {


 connection.query('SELECT * FROM test_devices WHERE technician_id =?',[technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            testsuitedata:results,
              status:true,    
            message:"Successfully"
          });
        
      }
    });


   }
   else
   {

 connection.query('SELECT * FROM test_devices WHERE admin_id=?',[admin_id] , function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            testsuitedata:results,
              status:true,    
            message:"Successfully"
          });
        
      }
    });

   }
    
   
}












