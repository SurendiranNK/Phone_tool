var connection = require('./../config');



module.exports.site_details=function(req,res){
  
    
    connection.query('SELECT * FROM `site_details', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            Site:results,
              status:true,    
            message:"Successfully"
          });
        
      }
    });
}



module.exports.site_register=function(req,res){
  var name=req.body.name;
  var phone=req.body.phone;
  var address=req.body.address;
  var address_line_2=req.body.address_line_2;
  var city=req.body.city;
  var country=req.body.country;

  var state=req.body.state;
  var zipcode=req.body.zipcode;
var notes=req.body.notes;
var site_enabled=req.body.site_enabled;
var compare_Name='name';


    connection.query('SELECT * FROM site_details WHERE name=?',[name], function (error, results, fields) {
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
             message:'Already site name is existed'

           
          });

}
else{


    connection.query('INSERT INTO site_details(name,phone,address,address_line_2,city,country,state,zipcode,notes,site_enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',[name,phone,address,address_line_2,city,country,state,zipcode,notes,site_enabled], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"site successfully register"
          });
        
      }
    });



}
         
        
      }
    });
    
   
}

module.exports.edit_site=function(req,res){
  var name=req.body.name;
  var phone=req.body.phone;
  var address=req.body.address;
  var address_line_2=req.body.address_line_2;
  var city=req.body.city;
  var country=req.body.country;

  var state=req.body.state;
  var zipcode=req.body.zipcode;
var notes=req.body.notes;
var  site_enabled=req.body.site_enabled;

var site_id =req.body.site_id;



    connection.query('UPDATE site_details SET name =?, phone =?, address =?, address_line_2 =?, city =?, country =?, state =?, zipcode =?, notes =?, site_enabled =? WHERE site_id = ?',[name, phone, address, address_line_2,city, country, state, zipcode, notes, site_enabled, site_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);

        
          res.json({

            
              status:true,    
            message:"site details successfully updated"
          });
        
      }
    });



}







