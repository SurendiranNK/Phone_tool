var connection = require('./../config');
var bcrypt = require('bcrypt');


module.exports.client_details=function(req,res){
  
    
    connection.query('SELECT * FROM client_details', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            Client:results,
              status:true,    
            message:"success"
          });
        
      }
    });
}






module.exports.client_register=function(req,res){
  var name=req.body.name;
  var phone=req.body.phone;
  var address=req.body.address;
  var address_line_2=req.body.address_line_2;
  var city=req.body.city;
  var country=req.body.country;

  var state=req.body.state;
  var zipcode=req.body.zipcode;
var notes=req.body.notes;
var  client_enabled=req.body.client_enabled;
var compare_Name='name';


    connection.query('SELECT * FROM client_details WHERE name=?',[name], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query1234'
            });
      }else{

console.log(results);

if(results.length >0){

        this.compare_Name='exist_name';
          res.json({

            
             status:false,
             message:'Already client name is existed'

           
          });

}
else{


    connection.query('INSERT INTO client_details(name,phone,address,address_line_2,city,country,state,zipcode,notes,client_enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',[name,phone,address,address_line_2,city,country,state,zipcode,notes, client_enabled], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"clite successfully register"
          });
        
      }
    });



}
         
        
      }
    });
   
}



module.exports.edit_client=function(req,res){
  var name=req.body.name;
  var phone=req.body.phone;
  var address=req.body.address;
  var address_line_2=req.body.address_line_2;
  var city=req.body.city;
  var country=req.body.country;

  var state=req.body.state;
  var zipcode=req.body.zipcode;
var notes=req.body.notes;
var  client_enabled=req.body.client_enabled;

var client_id =req.body.client_id;



    connection.query('UPDATE client_details SET name =?, phone =?, address =?, address_line_2 =?, city =?, country =?, state =?, zipcode =?, notes =?, client_enabled =? WHERE client_id = ?',[name, phone, address, address_line_2,city, country, state, zipcode, notes, client_enabled, client_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"clite details successfully updated"
          });
        
      }
    });



}
         
     


