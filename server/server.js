'use strict';
        let app = require('express')();
        let bodyParser = require('body-parser');
        let http = require('http').Server(app);
        let io = require('socket.io')(http);

//        let io = require('socket.io')(3000);
        var authenticateController = require('./controllers/authenticate-controller');
        var RegisterController = require('./controllers/Register-controller');
        var editpasswordController = require('./controllers/edit_password-controller');
        var clientdetailsController = require('./controllers/client_details-controller');
        var techniciandetailsController = require('./controllers/technicians_details-controller');
        var sitedetailsController = require('./controllers/site_details-controller');
        var testsuitesController = require('./controllers/testsuites-controller');
        var deviceimagesController = require('./controllers/device_images-controller');
        var previousReportsController = require('./controllers/previous_report-controller');
        var fs = require('fs');
        var adb = require('adbkit');
        var client = adb.createClient();
        var Promise = require('bluebird');
        var readline = require('readline');
        var nodeCmd = require('node-cmd');
        const util = require('util');

        var connection = require('./config');



		   const sqlite3 = require('sqlite3').verbose();
      // open the database
      let db = new sqlite3.Database('./Phonetool.sqlite');

        //application constants
        var AUTO_REPORT_FILE = "results_auto.json";
        var MANUAL_REPORT_FILE = "results_manual.json";
        var deviceCon = [];
        var deviceFileMap = {};

        app.use(bodyParser.urlencoded({
        extended: true
        }));

//        app.configure(function(){
//          app.use(app().bodyParser());
//        });
        app.use(bodyParser.json());
        app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
        var apk = 'Clara3scr.apk';
        nodeCmd.get('adb devices', (err, data, stderr) => console.log(data+err+stderr));
//
//    http.setTimeout(30000, function(socket) {
//            console.log('timeout on server');
//            socket.write("FILE_NOT_FOUND");
//            socket.destroy();
//         });
//
        app.get('/devicesList', (req, res) => {
        var _deviceCon = [];
        var devicesDetailArr = [];
                console.log('indevicelist');
                client.listDevices()
                .then(function(devices) {
                return Promise.filter(devices, function(device) {
                if (_deviceCon.indexOf(device.id) === -1) {
                    console.log("Device Id : "+device.id);
                    _deviceCon.push(device.id);
                }
                return client.getProperties(device.id)
                        .then(function(features) {
                        let deviceDetail = {};
                                deviceDetail["model"] = features["ro.product.model"];
                                deviceDetail["manufacturer"] = features["ro.product.manufacturer"];
                                deviceDetail["serialNo"] = features["ro.boot.serialno"];
                                deviceDetail["model"] = features["ro.product.model"];
                                deviceDetail["osName"] = features["ro.com.google.clientidbase.yt"];
                                deviceDetail["version"] = features["ro.com.google.gmsversion"];
                                devicesDetailArr.push(deviceDetail);
                                console.log(deviceDetail);
                                check_serialno(deviceDetail);
                                client.shell(device.id, "dumpsys iphonesubinfo", function(err, output) {
                                if (err) {
                                   console.log(err);
                                }
                                var readStream = output;
                                        readStream
                                        .on('data', function (data) {
                                        var subscriberInfo = data.toString();
                                                var arr = subscriberInfo.split(' ');
                                                var lastIndex = arr.length - 1;
                                                deviceDetail["imei"] = arr[lastIndex];
                                        })
                                        .on('error', function (err)  { console.error('Error', err); res = 'DEVICE_OFFLINE'})
                                        .on('end', function ()     { console.log('All done1!'); devicesDetailArr.push(deviceDetail); });
                                })
                        })
                })
                })
                .then(function() {
                res.json(devicesDetailArr);
                deviceCon = _deviceCon;
                prepareFileMap();
                })
                .catch(function(err) {
                console.error('Something went wrong:', err.stack)
                })
        });
//device_details api to insert details
function check_serialno(deviceDetail)
{
  db.all("SELECT * FROM device_details WHERE sr_no=?",[deviceDetail["serialNo"]], function(err, rows){
    console.log("rows.length : "+rows.length);
        if (rows.length>0)
          {}
        else{
             insertdevice_detail(deviceDetail);
           }
        });
}
function insertdevice_detail(deviceDetail){
  db.all("insert into device_details(model,manufacturer,device_name,os_name,os_version, sr_no,admin_id,technician_id) values('"+
            deviceDetail["model"]+"','"+deviceDetail["manufacturer"]+"','"+deviceDetail["model"]+"','"+
            deviceDetail["osName"]+"','"+deviceDetail["version"]+"','"+deviceDetail["serialNo"]+"',1,1)"),function(err, rows)
            {
               if (err){
               }
           }
}

        function prepareFileMap(){
            console.log("Connected devices "+deviceCon);
            for(var id of deviceCon) {
                var fileName = "";//default file read
                //check for auto test suit result
                client.stat(id,'/storage/emulated/0/'+AUTO_REPORT_FILE)
                    .then(function(res){
                        fileName = AUTO_REPORT_FILE;
                        deviceFileMap[id]=fileName;
                        console.log("auto test report file available");
                    })
                    .catch(function(err){
                        console.log("Checking file stat auto err : "+err)
                    });

                //check for manual test suit result
                client.stat(id,'/storage/emulated/0/'+MANUAL_REPORT_FILE)
                    .then(function(res){
                        fileName = MANUAL_REPORT_FILE;
                        deviceFileMap[id]=fileName;
                        console.log("manual test report file available");
                    }).catch(function(err){
                        console.log("Checking file stat manu err : "+err)
                    });
            }
            console.log(deviceFileMap);
        }

        setTimeout(prepareFileMap,10000);

        /* functionality report json file pull*/

        app.get('/testreport', (req, res) => {
            var errors = true;
            var deviceId = req.query.sNo;
            console.log("pull file for device id "+deviceId);
            var fName = deviceFileMap[deviceId];
            console.log(fName);
            if(fName == ""){
                   console.log("file not present on device");
                   res.send('FILE_NOT_FOUND');
            } else {
                return client.pull(req.query.sNo, '/storage/emulated/0/'+fName)
                    .then(function(transfer) {
                        transfer.pipe(res);
                var str="";
                transfer.on('data', function(data){
                           str+=data;
                        });
                transfer.on("end", function(){
                         savejson(deviceId,str);
                });
                    }).catch(function(err) {
                        console.error('Something went wrong:', err.stack);
                       res.send('FILE_NOT_FOUND');
                })
            }
        });

        app.post('/saveData',(req,res)=>{
            const body = req.body.Body;
            console.log("BODY : "+body);
        });


        //save report to db function
        function savejson(sr_no,json_data){
          //var deviceDetails = getdevice_details(sr_no);
           getdevice_details(sr_no,function(deviceDetails){
              console.log("device details Object "+JSON.stringify(deviceDetails));
              console.log("json save object "+json_data);
                db.all('insert into test_reports(report_device_id,report_date,status) values(' + deviceDetails[0].device_id + ',datetime (\'now\'),\'' + json_data + '\')', function (error, results, fields) {
                      if (error) {
                           console.log(error);
                      }else{
                           console.log(results);
                      }
                  });
           });
    }

function getdevice_details(sr_no,callback)
{
  db.all("select * from device_details where sr_no='"+sr_no+"'", function(error, results, fields){
      if (error)
      {
          console.log("error here"+error);
      }
      else{
          callback(results);
       }
  });
}

  /* functionality report json file pull*/
        app.get('/install', (req, res) => {
                console.log('installing APK');
                var status = false;
                client.listDevices()
                .then(function(devices) {
                return Promise.map(devices, function(device) {
                  return client.install(device.id, apk)
                  .then(function() {
                  status = true;
                          res = 'INSTALL_SUCESS';
                          console.log(res +" "+status);
                  })
                  .catch(function(err) {
                  res = 'INSTALL_FAIL';
                          console.log(res + " " +status + err);
                  })
                })
            })

        });

        // socket program to autorun app on devices
        app.get('/autorunapk', (req, res) => {
        console.log('autorun app in phone');
                client.listDevices()
                .then(function(devices) {
                    return Promise.map(devices, function(device) {
                        return client.shell(device.id, 'am start -n com.hardware.test/.MainActivity')
                                // Use the readAll() utility to read all the content without
                                // having to deal with the events. `output` will be a Buffer
                                // containing all the output.
                                .then(adb.util.readAll)
                                .then(function(output) {
                                res = 'START_SUCESS';
                                        console.log('[%s] %s', device.id, output.toString().trim())
                                }).catch(function(err) {
                                res = 'START_FAIL';
                                console.error('Something went wrong:', err.stack)
                        })
                    })
                })
                .then(function() {
                res = 'START_SUCESS';
                console.log('Done.')
                })
                .catch(function(err) {
                res = 'START_FAIL';
                    console.error('Something went wrong:', err.stack)
                });
                res.end();
        });

        //show previous reports from db
        app.get('/getprereport', (req, res) => {
            db.all('select tr.*,d.* from  test_reports tr  left join device_details d on  tr.report_device_id = d.device_id',function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                      //console.log("Result Device Report : "+JSON.stringify(results));
                        res.send(results);
                    }
                });

        });

        app.get('/getreadymap', (req, res) => {
         res.json(Object.keys(deviceFileMap));
        });
        //on usb connection install apk
        /*client.trackDevices()
            .then(function(tracker) {
                console.log('add works events');
                tracker.on('add', function(device) {
                    console.log('add Tracker on ' + device.id);
                        //first transfer the APK and install it
                    var status = false;
                    client.listDevices()
                        .then(function(devices) {
                        return Promise.map(devices, function(device) {
                            return client.install(device.id, apk)
                        })
                        })
                        .then(function() {
                        status = true;
                                console.log("Install Status : "+status);
                        })
                        .catch(function(err) {
                            console.log("Install Status Catch : "+status + err);
                        })
                })
        })
        .catch(function(err) {
            console.error('Something went wrong:', err.stack)
        });*/

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");

db.run("CREATE TABLE IF NOT EXISTS admin_Login (admin_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , username VARCHAR NOT NULL  UNIQUE , password VARCHAR NOT NULL , user_type VARCHAR NOT NULL)");



db.run("CREATE  TABLE  IF NOT EXISTS client_details (client_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , name VARCHAR, phone VARCHAR, address VARCHAR, address_line_2 VARCHAR, city VARCHAR, state VARCHAR, country VARCHAR, zipcode VARCHAR, notes VARCHAR, client_enabled VARCHAR)");

 //db.run("DROP TABLE admin_Login");

db.run("CREATE  TABLE  IF NOT EXISTS technician_details (technician_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , fullname VARCHAR, username VARCHAR, password VARCHAR, roles VARCHAR, Login_access VARCHAR, user_type VARCHAR)");
db.run("CREATE  TABLE  IF NOT EXISTS site_details (site_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , name VARCHAR, phone VARCHAR, address VARCHAR, address_line_2 VARCHAR, city VARCHAR, state VARCHAR, country VARCHAR, zipcode VARCHAR, notes VARCHAR, site_enabled VARCHAR)");



db.run("CREATE  TABLE IF NOT EXISTS test_devices (test_device_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , suite_title VARCHAR, device_id INTEGER DEFAULT 0, admin_id INTEGER DEFAULT 0, client_id INTEGER DEFAULT 0, technician_id INTEGER DEFAULT 0, only_manual VARCHAR DEFAULT 0, all_tests VARCHAR DEFAULT 0, automated_tests VARCHAR DEFAULT 0, manual_tests VARCHAR DEFAULT 0, test_names VARCHAR DEFAULT 0, suite_enabled VARCHAR)");


db.run("CREATE  TABLE  IF NOT EXISTS device_images (device_image_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , device_name VARCHAR, os_type VARCHAR, os_version VARCHAR, image_name VARCHAR, image_enabled VARCHAR, device_id INTEGER, admin_id INTEGER, technician_id INTEGER)");
db.run("CREATE  TABLE  IF NOT EXISTS test_reports (report_id INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , report_client_id INTEGER, report_technician_id INTEGER, report_device_id INTEGER, report_date DATETIME, report_time DATETIME, status VARCHAR)");

 db.run("CREATE TABLE IF NOT EXISTS device_details(device_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE , model VARCHAR, manufacturer VARCHAR,device_name VARCHAR, os_name VARCHAR, os_version VARCHAR,sr_no VARCHAR,admin_id INTEGER, technician_id INTEGER)");

 db.all("SELECT * FROM admin_Login ", function(err, rows){
     if (rows.length>0)
       {
           console.log(rows.length);
       }
     else{
          db.run("INSERT INTO admin_Login (admin_id, username, password, user_type) VALUES ('1', 'admin','1234567','admin')" );
      }
 });

db.run("CREATE TABLE IF NOT EXISTS login(username TEXT, password TEXT)");

//db.run("INSERT INTO login (username, password) VALUES (?, ?)", "sai", "123456");
db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();



    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);


});


// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);


//       console.log(row);
//   });
// });




//Login api details


app.post('/login', function(req, res){
var username =req.body.username;
  var password =req.body.password;
console.log(username);
console.log(password);

if (username =="admin") {

  db.all('SELECT * FROM admin_Login WHERE username=? AND password=?',[username,password], function(err, rows){
        if (err){
            // console.err(err);
            res.status(500);
        }
        else {


console.log(rows.length);

if (rows.length == 0) {

res.json({



                        status:false,
                        message:"Email and password does not match"
                    })
 console.log(rows);
}
else
{
  res.json({


                        login:rows,
                        status:true,
                        message:"Successfully Login"
                    })
 console.log(rows);
}




                }





        res.end();
    });

}
else
{


  db.all('SELECT * FROM technician_details WHERE username=? AND password=?',[username,password], function(err, rows){
        if (err){
            // console.err(err);
            res.status(500);
        }
        else {


console.log(rows.length);

if (rows.length == 0) {

res.json({



                        status:false,
                        message:"Email and password does not match testing"
                    })
 console.log(rows);
}
else
{
  res.json({


                        login:rows,
                        status:true,
                        message:"Successfully Login"
                    })
 console.log(rows);
}




                }





        res.end();
    });



}



});












//Edit password api details


app.post('/editpassword', function(req, res){

  var technician_id = req.body.technician_id;
   var admin_id = req.body.admin_id;
    var password = req.body.password;

    console.log(req.body.admin_id);
    console.log(req.body.technician_id);
	console.log(password);

if (req.body.admin_id == undefined) {

  db.all('UPDATE technician_details SET password = ? WHERE technician_id = ?',[password,technician_id], function(err, rows){
        if (err){
           res.json({    status:false,
            message:"there are some error with query"
             })
        }
        else {



  res.json({


                       status:true,
             message:"Venkatesh Password Successfully changed "
                    })






                }





        res.end();
    });

}
else
{


  db.all('UPDATE admin_login SET password = ? WHERE admin_id = ?',[password,admin_id], function(err, rows){
        if (err){

             res.json({    status:false,
            message:"there are some error with query"
             })
        }
        else {



  res.json({

                       status:true,
             message:"Password Successfully changed "
                    })






                }





        res.end();
    });



}



});









//client register api




app.post('/client_register', function(req, res){


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


    db.all('SELECT * FROM client_details WHERE name=?',[name], function (error, results, fields) {
      if (error) {

        console.log(error);
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


    db.all('INSERT INTO client_details(name,phone,address,address_line_2,city,country,state,zipcode,notes,client_enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',[name,phone,address,address_line_2,city,country,state,zipcode,notes, client_enabled], function (error, results, fields) {
      if (error) {

          console.log(error);
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




});









//client_details edit api




app.post('/edit_client', function(req, res){


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

var client_id=req.body.client_id;

var compare_Name='name';


     db.all('UPDATE client_details SET name =?, phone =?, address =?, address_line_2 =?, city =?, country =?, state =?, zipcode =?, notes =?, client_enabled =? WHERE client_id = ?',[name, phone, address, address_line_2,city, country, state, zipcode, notes, client_enabled, client_id], function (error, results, fields) {
      if (error) {

          console.log(error);
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




});







//client_details edit api


app.get('/client_details', function(req, res){

 db.all('SELECT * FROM client_details', function (error, results, fields) {
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


});





//technician register api


app.post('/technician_register', function(req, res){


var username = req.body.username;
var fullname = req.body.fullname;
//var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

var hash = req.body.password;

var roles =req.body.roles;
var login_access = req.body.login_access;
var user_type ="technician"

    db.all('SELECT * FROM technician_details WHERE username=?',[username], function (error, results, fields) {
      if (error) {

         console.log(error);
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


   db.all('INSERT INTO technician_details (username, fullname, password, roles, login_access, user_type) VALUES (?, ?, ?, ?,?,?)',[username,fullname,hash,roles,login_access,user_type]
, function (error, results, fields) {
      if (error) {

        console.log(error);
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







  });








//technician edit api


app.post('/edit_technician', function(req, res){



var username = req.body.username;
var fullname = req.body.fullname;
//var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

var hash =req.body.password;

var roles =req.body.roles;
var login_access = req.body.login_access;

var technician_id=req.body.technician_id;
var user_type="technician";


    db.all('SELECT * FROM technician_details WHERE username=? and technician_id !=?',[username, technician_id], function (error, results, fields) {
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


    db.all('UPDATE technician_details SET username =?, fullname =?, password =?, roles =?, login_access =?,user_type=? WHERE technician_id = ?',[username, fullname, hash, roles, login_access,user_type, technician_id], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            });
      }else{

console.log(results);


          res.json({


              status:true,
            message:"technician successfully updated"
          });

      }
    });



}


      }
    });





});






//client_details edit api


app.get('/technician_details', function(req, res){

 db.all('SELECT * FROM technician_details', function (error, results, fields) {
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


});



//site register api

app.post('/site_register', function(req, res){

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


    db.all('SELECT * FROM site_details WHERE name=?',[name], function (error, results, fields) {
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


    db.all('INSERT INTO site_details(name,phone,address,address_line_2,city,country,state,zipcode,notes,site_enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',[name,phone,address,address_line_2,city,country,state,zipcode,notes,site_enabled], function (error, results, fields) {
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




});







//site register api

app.post('/edit_site', function(req, res){


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



    db.all('UPDATE site_details SET name =?, phone =?, address =?, address_line_2 =?, city =?, country =?, state =?, zipcode =?, notes =?, site_enabled =? WHERE site_id = ?',[name, phone, address, address_line_2,city, country, state, zipcode, notes, site_enabled, site_id], function (error, results, fields) {
      if (error) {
console.log(error);

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





});





//site details api

app.get('/site_details', function(req, res){


    db.all('SELECT * FROM site_details', function (error, results, fields) {
      if (error) {

        console.log(error);
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


});





//testsuite register api


app.post('/testsuites_register', function(req, res){



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
    db.all('INSERT INTO test_devices(only_manual,automated_tests,suite_enabled,all_tests,manual_tests,test_names,suite_title,technician_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, technician_id], function (error, results, fields) {
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
    db.all('UPDATE test_devices SET only_manual = ?, automated_tests = ?, suite_enabled= ?, all_tests = ?,manual_tests = ?,test_names = ?, suite_title = ?,technician_id = ? WHERE test_device_id = ?',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, technician_id, test_device_id], function (error, results, fields) {
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

    db.all('INSERT INTO test_devices(only_manual,automated_tests,suite_enabled,all_tests,manual_tests,test_names,suite_title,admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, admin_id], function (error, results, fields) {
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
    db.all('UPDATE test_devices SET only_manual = ?, automated_tests = ?, suite_enabled= ?, all_tests = ?,manual_tests = ?,test_names = ?, suite_title = ?,admin_id = ? WHERE test_device_id = ?',[only_manual, automated_tests, suite_enabled, all_tests, manual_tests, test_names, suite_title, admin_id, test_device_id], function (error, results, fields) {
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




});




//TESTSUITE DETAIL API


app.post('/testsuites_details', function(req, res){


var admin_id =req.body.admin_id;
   var technician_id= req.body.technician_id;

   if (req.body.admin_id == undefined) {


 db.all('SELECT * FROM test_devices WHERE technician_id =?',[technician_id], function (error, results, fields) {
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

 db.all('SELECT * FROM test_devices WHERE admin_id=?',[admin_id] , function (error, results, fields) {
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


});










//device images register api


app.post('/device_images_register', function(req, res){


//message = '';

      var post  = req.body;
      var device_name= post.device_name;
      var os_type= post.os_type;
      var os_version= post.os_version;
      // var filters= post.filters;
      var image_enabled= post.image_enabled;
      var admin_id=post.admin_id;
      var technician_id=post.technician_id;

var crypto                          = require('crypto');
        var seed                            = crypto.randomBytes(5);
        var uniqueSHA1String                = crypto
                                               .createHash('sha1')
                                                .update(seed)
                                                 .digest('hex');


if (post.admin_id == undefined) {
if (!req.files)
       {
        //return res.status(400).send('No files were uploaded.');
res.json({


              status:false,
            message:"No file is uploaded"
          });
return;
}
    var file = req.files.image_name;

    console.log(file);
    var img_name=file.name;

       if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

              file.mv('server/public/images/'+file.name, function(err) {

                if (err)

console.log(err);


                  return res.status(500).send(err);


              //var sql = "INSERT INTO 'device_images'('device_name','os_type','os_version','filters' ,'image_name','image_enabled','admin_id') VALUES ('"+device_name+"','"+os_type+"','"+os_version+"','"+filters+"','"+img_name+"','"+image_enabled+"','"+admin_id+"')";


               db.all('INSERT INTO device_images(device_name,os_type,os_version,image_name,image_enabled,technician_id) VALUES (?,?,?,?,?,?)',[device_name,os_type,os_version,img_name,image_enabled,technician_id], function(err, result) {
                   //res.redirect('profile/'+result.insertId);


 res.json({


              status:true,
            message:"device successfully register"
          });


                });
             });
          } else {

            res.json({


              status:false,
             message:"This format is not allowed , please upload file with '.png','.gif','.jpg'"
          });
          }

}
else
{





    if (!req.files)
       {
        //return res.status(400).send('No files were uploaded.');
res.json({


              status:false,
            message:"No file is uploaded"
          });
return;
}

    var file = req.files.image_name;

    console.log(file);
    var img_name=new Date()+file.name;

       if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

              file.mv('server/public/images/'+new Date()+file.name, function(err) {

                if (err)
                  console.log(err);
console.log("venkatesh");


                 // return res.status(500).send(err);


              //var sql = "INSERT INTO 'device_images'('device_name','os_type','os_version','filters' ,'image_name','image_enabled','admin_id') VALUES ('"+device_name+"','"+os_type+"','"+os_version+"','"+filters+"','"+img_name+"','"+image_enabled+"','"+admin_id+"')";


               db.all('INSERT INTO device_images(device_name,os_type,os_version,image_name,image_enabled,admin_id) VALUES (?,?,?,?,?,?)',[device_name,os_type,os_version,img_name,image_enabled,admin_id], function(err, result) {
                   //res.redirect('profile/'+result.insertId);


 res.json({


              status:true,
            message:"device successfully register"
          });


                });
             });
          } else {

            res.json({


              status:false,
             message:"This format is not allowed , please upload file with '.png','.gif','.jpg'"
          });
          }
}






});





//device images edit api


app.post('/device_images_edit', function(req, res){

 //message = '';

      var post  = req.body;
      var device_name= post.device_name;
      var os_type= post.os_type;
      var os_version= post.os_version;
      //var filters= post.filters;
      var image_enabled= post.image_enabled;
      var admin_id=post.admin_id;
      var technician_id=post.technician_id;
      var device_image_id=post.device_image_id;


if (!req.files)
{
        //return res.status(400).send('No files were uploaded.');
db.all('UPDATE device_images SET device_name =?, os_type =?, os_version =?,image_enabled=? WHERE device_image_id = ?',[device_name, os_type, os_version, image_enabled,device_image_id], function(err, result) {
                   //res.redirect('profile/'+result.insertId);


 res.json({


              status:true,
            message:"Successfully"
          });


                });
return;
}

    var file = req.files.image_name;

    console.log(file);
    var img_name=file.name;

       if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

              file.mv('server/public/images/'+file.name, function(err) {

                if (err)




                  return res.status(500).send(err);


              //var sql = "INSERT INTO 'device_images'('device_name','os_type','os_version','filters' ,'image_name','image_enabled','admin_id') VALUES ('"+device_name+"','"+os_type+"','"+os_version+"','"+filters+"','"+img_name+"','"+image_enabled+"','"+admin_id+"')";


               db.all('UPDATE device_images SET device_name =?, os_type =?, os_version =?, image_name =?,image_enabled=? WHERE device_image_id = ?',[device_name, os_type, os_version, img_name, image_enabled,device_image_id], function(err, result) {
                   //res.redirect('profile/'+result.insertId);


 res.json({


              status:true,
            message:"Successfully"
          });


                });
             });
          } else {

            res.json({


              status:false,
             message:"This format is not allowed , please upload file with '.png','.gif','.jpg'"
          });
          }




  });




//site details api

app.get('/device_images_details', function(req, res){


    db.all('SELECT * FROM device_images', function (error, results, fields) {
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



});

















        /* route to handle login */
        app.post('/api/authenticate', authenticateController.authenticate);
        app.post('/api/authenticate', authenticateController.authenticate);
        app.post('/api/authenticate123', authenticateController.authenticate123);
        app.get('/api/authenticate1234', RegisterController.authenticate1234);
        app.post('/api/editpassword', editpasswordController.editpassword);
        app.get('/api/client_details', clientdetailsController.client_details);
        app.get('/api/technician_details', techniciandetailsController.technician_details);
        app.get('/api/site_details', sitedetailsController.site_details);
        app.post('/api/site_register', sitedetailsController.site_register);
        app.post('/api/client_register', clientdetailsController.client_register);
        app.post('/api/technician_register', techniciandetailsController.technician_register);
        app.post('/api/edit_client', clientdetailsController.edit_client);
        app.post('/api/edit_site', sitedetailsController.edit_site);
        app.post('/api/edit_technician', techniciandetailsController.edit_technician);
        app.post('/api/testsuites_register', testsuitesController.testsuites_register);
        app.post('/api/testsuites_details', testsuitesController.testsuites_details);
        app.get('/api/device_images_details', deviceimagesController.device_images_details);
        app.post('/api/previous_reports', previousReportsController.previous_reports);
        http.listen(3000, () => {
        console.log('started on port 3000 ');
        });
