"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var material_1 = require("@angular/material");
var http_2 = require("@angular/http");
var app_service_1 = require("../Webservice/app.service");
var datashare_1 = require("../DataShare/datashare");
var SettingComponent = (function () {
    function SettingComponent(http, dialog, datashare, webservice) {
        this.http = http;
        this.dialog = dialog;
        this.datashare = datashare;
        this.webservice = webservice;
        this.edited = false;
        this.site = true;
        this.tabs = [
            { name: 'TEST SUITES' },
            { name: 'DEVICE IMAGES' },
            { name: 'CLIENTS' },
            { name: 'TECHNICIANS' },
            { name: 'SITES' },
            { name: 'ABOUT' }
        ];
        this.Testsuits = [
            { name: 'AllTests' },
            { name: 'All Manual Tests' },
            { name: 'All Automated Tests' }
        ];
        this.usertype = this.datashare.logindetails[0].user_type;
        if (this.usertype == "admin") {
            this.userid = this.datashare.logindetails[0].admin_id;
        }
        else {
            this.userid = this.datashare.logindetails[0].technician_id;
        }
    }
    SettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(this.datashare.Display_Clientdetails_API)
            .subscribe(function (data) {
            console.log(data.json().Client);
            _this.Client = data.json().Client;
            console.log(_this.Client);
        });
        this.http.get(this.datashare.Display_Techniciandetails_API)
            .subscribe(function (data) {
            console.log(data.json().Technician);
            _this.Technician = data.json().Technician;
            console.log(_this.Technician);
        });
        this.http.get(this.datashare.Display_Sitesdetails_API)
            .subscribe(function (data) {
            console.log(data.json().Site);
            _this.Site = data.json().Site;
        });
        this.Testsuites_webservice_call();
        this.Deviceimages_webservice_call();
    };
    SettingComponent.prototype.Testsuites_webservice_call = function () {
        var _this = this;
        var data1 = new http_2.URLSearchParams();
        if (this.usertype == "admin") {
            data1.append('admin_id', this.userid);
        }
        else {
            data1.append('technician_id', this.userid);
        }
        var body = data1.toString();
        console.log(body);
        this.webservice.getuser(body, this.datashare.Display_Testsuites_API).subscribe(function (data) {
            console.log(data.json());
            _this.datashare.edit_testsuites = data.json().status;
            _this.datashare.Edit_TestSuites_Detials = data.json().testsuitedata;
            (function (err) {
                alert("error getting");
            });
        });
    };
    SettingComponent.prototype.Deviceimages_webservice_call = function () {
        var _this = this;
        this.http.get(this.datashare.Display_Deviceimages_API)
            .subscribe(function (data) {
            _this.deviceimages_List = data.json().device_images_details;
            console.log(_this.deviceimages_List);
        });
        /*
      let data1 = new URLSearchParams();
        
        
      if(this.usertype == "admin")
      {
        
      data1.append('adminid',this.userid);
      
      }
      else
      {
        
      data1.append('technicianid',this.userid);
       
      }
      
      
      let body = data1.toString();
      
      console.log(body);
        this.webservice.getuser(body, this.datashare.Display_Deviceimages_API).subscribe(data =>{
      
       this.deviceimages_List=data.json().device_images_details;
       console.log(this.deviceimages_List);
      
      
        err =>
        {
      alert("error getting")
      
        }
      
      });
      */
    };
    SettingComponent.prototype.Edit_Client_Details = function ($event, client) {
        var _this = this;
        console.log(client);
        this.datashare.edit_client = "Edit";
        this.datashare.Edit_Client_Detials = client;
        var dialogRef = this.dialog.open(AddClientComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.http.get(_this.datashare.Display_Clientdetails_API)
                .subscribe(function (data) {
                console.log(data.json().Client);
                _this.Client = data.json().Client;
                console.log(_this.Client);
            });
        });
    };
    SettingComponent.prototype.Add_Client_Details = function () {
        var _this = this;
        this.datashare.edit_client = "Add";
        console.log("sample" + this.datashare.edit_client);
        var dialogRef = this.dialog.open(AddClientComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.http.get(_this.datashare.Display_Clientdetails_API)
                .subscribe(function (data) {
                console.log(data.json().Client);
                _this.Client = data.json().Client;
                console.log(_this.Client);
            });
        });
    };
    SettingComponent.prototype.Edit_Technican_Details = function ($event, technician) {
        var _this = this;
        console.log(technician);
        this.datashare.edit_tecnician = "Edit";
        this.datashare.Edit_technician_Detials = technician;
        var dialogRef = this.dialog.open(TechnicianComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.http.get(_this.datashare.Display_Techniciandetails_API)
                .subscribe(function (data) {
                console.log(data.json().Technician);
                _this.Technician = data.json().Technician;
                console.log(_this.Technician);
            });
        });
    };
    SettingComponent.prototype.TechnicianDialog = function () {
        var _this = this;
        this.datashare.edit_tecnician = "Add";
        var dialogRef = this.dialog.open(TechnicianComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.http.get(_this.datashare.Display_Techniciandetails_API)
                .subscribe(function (data) {
                console.log(data.json().Technician);
                _this.Technician = data.json().Technician;
                console.log(_this.Technician);
            });
        });
    };
    SettingComponent.prototype.Edit_Testsuites_Details = function () {
        var _this = this;
        var dialogRef = this.dialog.open(SuitesComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.Testsuites_webservice_call();
        });
    };
    SettingComponent.prototype.SuiteDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(SuitesComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.Testsuites_webservice_call();
        });
    };
    SettingComponent.prototype.Edit_device_images_Details = function ($event, deviceimages) {
        var _this = this;
        this.datashare.edit_deviceimage = "Edit";
        this.datashare.Edit_deviceimage_Detials = deviceimages;
        var dialogRef = this.dialog.open(DevicesImagesComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.Deviceimages_webservice_call();
        });
    };
    SettingComponent.prototype.DeviceimageDialog = function () {
        var _this = this;
        this.datashare.edit_deviceimage = "Add";
        var dialogRef = this.dialog.open(DevicesImagesComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.Deviceimages_webservice_call();
        });
    };
    SettingComponent.prototype.AboutDialog = function () {
        this.dialog.open(AboutComponent);
    };
    SettingComponent.prototype.Edit_Site_Details = function ($event, site) {
        var _this = this;
        console.log(site);
        this.datashare.edit_site = "Edit";
        this.datashare.Edit_Site_Detials = site;
        var dialogRef = this.dialog.open(SitesComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.http.get(_this.datashare.Display_Sitesdetails_API)
                .subscribe(function (data) {
                console.log(data.json().Site);
                _this.Site = data.json().Site;
            });
        });
    };
    SettingComponent.prototype.sitesDialog = function () {
        var _this = this;
        this.datashare.edit_site = "Add";
        var dialogRef = this.dialog.open(SitesComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            _this.http.get(_this.datashare.Display_Sitesdetails_API)
                .subscribe(function (data) {
                console.log(data.json().Site);
                _this.Site = data.json().Site;
            });
        });
    };
    return SettingComponent;
}());
SettingComponent = __decorate([
    core_1.Component({
        selector: 'setting-page',
        templateUrl: './app/Settings/setting.component.html',
        styleUrls: ['./app/Settings/setting.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, material_1.MdDialog, datashare_1.DataShare, app_service_1.WebServiceComponent])
], SettingComponent);
exports.SettingComponent = SettingComponent;
var AddClientComponent = AddClientComponent_1 = (function () {
    function AddClientComponent(dialogRef, webservice, datashare) {
        this.dialogRef = dialogRef;
        this.webservice = webservice;
        this.datashare = datashare;
        this.device = true;
        if (this.datashare.edit_client == "Edit") {
            console.log("edit client details" + this.datashare.edit_client);
            this.name = this.datashare.Edit_Client_Detials.name;
            this.phone = this.datashare.Edit_Client_Detials.phone;
            this.address1 = this.datashare.Edit_Client_Detials.address;
            this.address2 = this.datashare.Edit_Client_Detials.address_line_2;
            this.city = this.datashare.Edit_Client_Detials.city;
            this.state = this.datashare.Edit_Client_Detials.state;
            this.postalcode = this.datashare.Edit_Client_Detials.zipcode;
            this.country = this.datashare.Edit_Client_Detials.country;
            this.note = this.datashare.Edit_Client_Detials.notes;
            if (this.datashare.Edit_Client_Detials.client_enabled == 1) {
                this.client_enabled = "1";
                this.device = true;
            }
            else {
                this.client_enabled = "0";
                this.device = false;
            }
            this.client_id = this.datashare.Edit_Client_Detials.client_id;
            this.open_popup = this.datashare.edit_client;
        }
        else {
            this.name = "";
            this.phone = "";
            this.address1 = "";
            this.address2 = "";
            this.city = "";
            this.state = "";
            this.postalcode = "";
            this.country = "";
            this.note = "";
            console.log("testing" + this.datashare.edit_client);
        }
    }
    AddClientComponent.prototype.cancelClients = function () {
        this.dialogRef.close(AddClientComponent_1);
    };
    AddClientComponent.prototype.addClients = function () {
        if (this.device) {
            this.client_enabled = "1";
        }
        else {
            this.client_enabled = "0";
        }
        if (this.open_popup == "Edit") {
            this.url = this.datashare.Client_Edit_API;
        }
        else {
            this.url = this.datashare.Client_Register_API;
        }
        console.log("testing" + this.client_enabled);
        var data1 = new http_2.URLSearchParams();
        data1.append('name', this.name);
        data1.append('phone', this.phone);
        data1.append('address', this.address1);
        data1.append('address_line_2', this.address2);
        data1.append('city', this.city);
        data1.append('state', this.state);
        data1.append('zipcode', this.postalcode);
        data1.append('notes', this.note);
        data1.append('country', this.country);
        data1.append('client_enabled', this.client_enabled);
        if (this.open_popup == "Edit") {
            data1.append('client_id', this.client_id);
        }
        var body = data1.toString();
        console.log(body);
        this.webservice.getuser(body, this.url).subscribe(function (data) {
            if (data.json().status == false) {
                alert(data.json().message);
            }
            console.log(data.json());
            (function (err) {
                alert("error getting");
            });
        });
    };
    return AddClientComponent;
}());
AddClientComponent = AddClientComponent_1 = __decorate([
    core_1.Component({
        selector: 'dialog-result-example-dialog',
        templateUrl: './app/Settings/clients/add_clients.component.html',
        styleUrls: ['./app/Settings/clients/add_clients.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, app_service_1.WebServiceComponent, datashare_1.DataShare])
], AddClientComponent);
exports.AddClientComponent = AddClientComponent;
var TechnicianComponent = (function () {
    function TechnicianComponent(dialogRef, webservice, datashare) {
        this.dialogRef = dialogRef;
        this.webservice = webservice;
        this.datashare = datashare;
        this.role = "";
        this.technicians = false;
        this.suites = false;
        this.fulldevicelogs = false;
        this.deviceimages = false;
        this.clients = false;
        this.sites = false;
        this.usb = false;
        this.license = false;
        this.fullreport = false;
        this.poweroff = false;
        this.loginenabled = false;
        if (this.datashare.edit_tecnician == "Edit") {
            this.username = this.datashare.Edit_technician_Detials.username;
            this.name = this.datashare.Edit_technician_Detials.fullname;
            this.arraydata = this.datashare.Edit_technician_Detials.roles.split(",");
            console.log([this.arraydata[0].length]);
            this.technician_id = this.datashare.Edit_technician_Detials.technician_id;
            if (this.datashare.Edit_technician_Detials.login_access == "1") {
                this.loginenabled = true;
            }
            else {
                this.loginenabled = false;
            }
            for (var i = 0; i < 10; i++) {
                this.comparedata = this.arraydata[i];
                console.log(this.comparedata);
                if (this.comparedata == "Manages technicias") {
                    this.technicians = true;
                }
                if (this.comparedata == "Manages test suites") {
                    this.suites = true;
                }
                if (this.comparedata == "Canview full devicelogs") {
                    this.fulldevicelogs = true;
                }
                if (this.comparedata == "Manages deviceimages") {
                    this.deviceimages = true;
                }
                if (this.comparedata == "Manages clients") {
                    this.clients = true;
                }
                if (this.comparedata == "Manages sites") {
                    this.sites = true;
                }
                if (this.comparedata == "Manages USBhubs") {
                    this.usb = true;
                }
                if (this.comparedata == "Manages license importing") {
                    this.license = true;
                }
                if (this.comparedata == "Can viewfull report history") {
                    this.fullreport = true;
                }
                if (this.comparedata == "Can poweroff the system") {
                    this.poweroff = true;
                }
            }
            console.log("Role" + this.role);
        }
        else {
        }
    }
    TechnicianComponent.prototype.addTechnicians = function () {
        console.log(this.password);
        if (this.password == undefined) {
            alert("Please enter the password");
        }
        else {
            if (this.password == this.confirmpassword) {
                if (this.technicians) {
                    this.datatechnicians = "Manages technicias,";
                    this.role = this.role + this.datatechnicians;
                }
                if (this.suites) {
                    this.datasuites = "Manages test suites,";
                    this.role = this.role + this.datasuites;
                }
                if (this.fulldevicelogs) {
                    this.datafulldevicelogs = "Canview full devicelogs,";
                    this.role = this.role + this.datafulldevicelogs;
                }
                if (this.deviceimages) {
                    this.datadeviceimages = "Manages deviceimages,";
                    this.role = this.role + this.datadeviceimages;
                }
                if (this.clients) {
                    this.dataclients = "Manages clients,";
                    this.role = this.role + this.dataclients;
                }
                if (this.sites) {
                    this.datasites = "Manages sites,";
                    this.role = this.role + this.datasites;
                }
                if (this.usb) {
                    this.datausb = "Manages USBhubs,";
                    this.role = this.role + this.datausb;
                }
                if (this.license) {
                    this.datalicense = "Manages license importing,";
                    this.role = this.role + this.datalicense;
                }
                if (this.fullreport) {
                    this.datafullreport = "Can viewfull report history,";
                    this.role = this.role + this.datafullreport;
                }
                if (this.poweroff) {
                    this.datapoweroff = "Can poweroff the system,";
                    this.role = this.role + this.datapoweroff;
                }
                if (this.loginenabled) {
                    this.loginenabledstatus = "1";
                }
                else {
                    this.loginenabledstatus = "0";
                }
                var data1 = new http_2.URLSearchParams();
                data1.append('username', this.username);
                data1.append('password', this.password);
                data1.append('fullname', this.name);
                data1.append('roles', this.role);
                data1.append('login_access', this.loginenabledstatus);
                if (this.datashare.edit_tecnician == "Edit") {
                    data1.append('technician_id', this.technician_id);
                    this.url = this.datashare.Technician_Edit_API;
                }
                else {
                    this.url = this.datashare.Technician_Register_API;
                }
                var body = data1.toString();
                console.log(body);
                this.webservice.getuser(body, this.url).subscribe(function (data) {
                    console.log(data.json());
                    if (data.json().status == false) {
                        alert(data.json().message);
                    }
                    (function (err) {
                        alert("error getting");
                    });
                });
            }
            else {
                alert("your password and confirm password not matched");
            }
        }
    };
    return TechnicianComponent;
}());
TechnicianComponent = __decorate([
    core_1.Component({
        selector: 'dialog-add-technician',
        templateUrl: './app/Settings/technicians/add-technician.component.html',
        styleUrls: ['./app/Settings/technicians/add-technician.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, app_service_1.WebServiceComponent, datashare_1.DataShare])
], TechnicianComponent);
exports.TechnicianComponent = TechnicianComponent;
var SuitesComponent = (function () {
    function SuitesComponent(dialogRef, webservice, datashare) {
        this.dialogRef = dialogRef;
        this.webservice = webservice;
        this.datashare = datashare;
        this.testcases = "";
    }
    SuitesComponent.prototype.ngOnInit = function () {
        console.log(this.datashare.Edit_TestSuites_Detials.length);
        //if(this.datashare.edit_testsuites)
        if (this.datashare.Edit_TestSuites_Detials.length != 0) {
            console.log("#########################");
            if (this.datashare.Edit_TestSuites_Detials[0].only_manual == 1) {
                this.run_manualtest = true;
                this.data_run_manualtest = "1";
            }
            else {
                this.run_manualtest = false;
                this.data_run_manualtest = "0";
            }
            if (this.datashare.Edit_TestSuites_Detials[0].suite_enabled == 1) {
                this.suite_enabled = true;
                this.data_suite_enabled = "1";
            }
            else {
                this.suite_enabled = false;
                this.data_suite_enabled = "0";
            }
            if (this.datashare.Edit_TestSuites_Detials[0].all_tests == 1) {
                this.showAllAutomationTests();
                this.ShowAllManualTests();
                this.alltests = true;
                this.all_automated_tests = true;
                this.all_manual_tests = true;
            }
            if (this.datashare.Edit_TestSuites_Detials[0].automated_tests == 1) {
                this.showAllAutomationTests();
                this.all_automated_tests = true;
            }
            if (this.datashare.Edit_TestSuites_Detials[0].manual_tests == 1) {
                this.ShowAllManualTests();
                this.all_manual_tests = true;
            }
            //else
            //{
            if (this.datashare.Edit_TestSuites_Detials[0].test_names == " ") {
            }
            else {
                this.All_testSuties_Names_data = this.datashare.Edit_TestSuites_Detials[0].test_names.split(",");
                console.log([this.All_testSuties_Names_data.length]);
                this.All_testSuties_Names_count = this.All_testSuties_Names_data.length;
                console.log(this.All_testSuties_Names_count);
                for (var i = 0; i < this.All_testSuties_Names_count; i++) {
                    this.All_testSuties_Names = this.All_testSuties_Names_data[i];
                    if (this.All_testSuties_Names == "WiFi") {
                        this.AT_wifi = true;
                    }
                    if (this.All_testSuties_Names == "GPS") {
                        this.AT_Gps = true;
                    }
                    if (this.All_testSuties_Names == "Vibration Accelerometer") {
                        this.AT_Vibration_Accelerometer = true;
                    }
                    if (this.All_testSuties_Names == "Cellular") {
                        this.AT_Cellular = true;
                    }
                    if (this.All_testSuties_Names == "Blutooth") {
                        this.AT_Blutooth = true;
                    }
                    if (this.All_testSuties_Names == "Device is not jailbroken") {
                        this.AT_device_not_jailbroken = true;
                    }
                    if (this.All_testSuties_Names == "Battery Charge") {
                        this.AT_Battery_charge = true;
                    }
                    if (this.All_testSuties_Names == "Camera(back) Flashlight") {
                        this.AT_Camera_Back_Flashlight = true;
                    }
                    if (this.All_testSuties_Names == "Camera(front)-Read QR") {
                        this.AT_Camera_Front_Flashlight = true;
                    }
                    if (this.All_testSuties_Names == "Camera(back)-Read QR") {
                        this.AT_Camera_Back_ReadQR = true;
                    }
                    if (this.All_testSuties_Names == "Microphone Speaker") {
                        this.AT_Microphone_Speaker = true;
                    }
                    if (this.All_testSuties_Names == "USB Data") {
                        this.AT_Usb_Data = true;
                    }
                    if (this.All_testSuties_Names == "USB Power") {
                        this.AT_Usb_Power = true;
                    }
                    if (this.All_testSuties_Names == "AT_Usb_Power") {
                        this.AT_Usb_Data = true;
                    }
                    if (this.All_testSuties_Names == "IMEI Blacklist") {
                        this.AT_IMEI_Blacklist = true;
                    }
                    if (this.All_testSuties_Names == "SIM Card") {
                        this.AT_Simcard = true;
                    }
                    if (this.All_testSuties_Names == "Activation Lock") {
                        this.AT_Activation_Lock = true;
                    }
                    if (this.All_testSuties_Names == "Carrier Lock") {
                        this.AT_Carrier_Lock = true;
                    }
                    if (this.All_testSuties_Names == "Warranty") {
                        this.AT_Warranty = true;
                    }
                    if (this.All_testSuties_Names == "MT_Touchscreen(single touch)") {
                        this.MT_Touchscreen_singletouch = true;
                    }
                    if (this.All_testSuties_Names == "MT_Touchscreen(multi-touch)") {
                        this.MT_Touchscreen_multitouch = true;
                    }
                    if (this.All_testSuties_Names == "MT_Screen Brightness") {
                        this.MT_Screen_Brightness = true;
                    }
                    if (this.All_testSuties_Names == "MT_Dead pixels") {
                        this.MT_Dead_Pixels = true;
                    }
                    if (this.All_testSuties_Names == "MT_Fingerprint Reader") {
                        this.MT_Fingerprint = true;
                    }
                    if (this.All_testSuties_Names == "MT_Home Button") {
                        this.MT_Home_Button = true;
                    }
                    if (this.All_testSuties_Names == "MT_Volume Buttons") {
                        this.MT_Volume_Buttons = true;
                    }
                    if (this.All_testSuties_Names == "MT_Silent Mode Switch") {
                        this.MT_Silent_Mode = true;
                    }
                    if (this.All_testSuties_Names == "MT_Vibration") {
                        this.MT_Vibration = true;
                    }
                    if (this.All_testSuties_Names == "MT_Accelerometer") {
                        this.MT_Accelerometer = true;
                    }
                    if (this.All_testSuties_Names == "MT_Compass") {
                        this.MT_Compass = true;
                    }
                    if (this.All_testSuties_Names == "MT_Flashlight") {
                        this.MT_Flashlight = true;
                    }
                    if (this.All_testSuties_Names == "MT_Camera(front)") {
                        this.MT_Camera_front = true;
                    }
                    if (this.All_testSuties_Names == "MT_Camera(back)") {
                        this.MT_camera_back = true;
                    }
                    if (this.All_testSuties_Names == "MT_MicroPhone") {
                        this.MT_MicroPhone = true;
                    }
                    if (this.All_testSuties_Names == "MT_Speaker") {
                        this.MT_Speaker = true;
                    }
                    if (this.All_testSuties_Names == "MT_Headphone Jack") {
                        this.MT_Headphone = true;
                    }
                    if (this.All_testSuties_Names == "MT_USB Port") {
                        this.MT_USB_Port = true;
                    }
                    if (this.All_testSuties_Names == "MT_USB Power") {
                        this.MT_USB_Power = true;
                    }
                    if (this.All_testSuties_Names == "MT_Proximity Sensor") {
                        this.MT_Proximity_Sensor = true;
                    }
                    if (this.All_testSuties_Names == "MT_Phone Call") {
                        this.MT_Phone_Call = true;
                    }
                    if (this.All_testSuties_Names == "MT_Cosemetic Damage") {
                        this.MT_Cosemetic_Damage = true;
                    }
                    if (this.All_testSuties_Names == "MT_Heavy Damage") {
                        this.MT_Heavy_Damage = true;
                    }
                    if (this.All_testSuties_Names == "MT_Water Damage") {
                        this.MT_Water_Damage = true;
                    }
                    if (this.All_testSuties_Names == "MT_SIM Card") {
                        this.MT_Simcard = true;
                    }
                    if (this.All_testSuties_Names == "MT_Cellular") {
                        this.MT_Cellular = true;
                    }
                    if (this.All_testSuties_Names == "MT_Buletooth") {
                        this.MT_Buletooth = true;
                    }
                    if (this.All_testSuties_Names == "MT_WiFi") {
                        this.MT_wifi = true;
                    }
                    if (this.All_testSuties_Names == "MT_GPS") {
                        this.MT_Gps = true;
                    }
                    if (this.All_testSuties_Names == "MT_Activation Lock") {
                        this.MT_Activation_lock = true;
                    }
                    if (this.All_testSuties_Names == "MT_Carrier Lock") {
                        this.MT_Carrier_Lock = true;
                    }
                }
            }
            //}
        }
        else {
        }
    };
    SuitesComponent.prototype.Alltests = function () {
        console.log(this.alltests);
        if (this.alltests) {
            this.showAllAutomationTests();
            this.ShowAllManualTests();
            this.all_automated_tests = true;
            this.all_manual_tests = true;
        }
        else {
            this.HideAllAutomationTests();
            this.HideAllManualTests();
            this.all_automated_tests = false;
            this.all_manual_tests = false;
        }
    };
    SuitesComponent.prototype.All_automated_tests = function () {
        if (this.all_automated_tests) {
            this.showAllAutomationTests();
        }
        else {
            this.HideAllAutomationTests();
        }
        if (this.all_automated_tests && this.all_manual_tests) {
            this.alltests = true;
        }
        else {
            this.alltests = false;
        }
    };
    SuitesComponent.prototype.All_manual_tests = function () {
        if (this.all_manual_tests) {
            this.ShowAllManualTests();
        }
        else {
            this.HideAllManualTests();
        }
        if (this.all_automated_tests && this.all_manual_tests) {
            this.alltests = true;
        }
        else {
            this.alltests = false;
        }
    };
    SuitesComponent.prototype.All_automated_testscases = function () {
        if (this.AT_wifi &&
            this.AT_Cellular &&
            this.AT_Blutooth &&
            this.AT_Gps &&
            this.AT_device_not_jailbroken &&
            this.AT_Battery_charge &&
            this.AT_Vibration_Accelerometer &&
            this.AT_Camera_Back_Flashlight &&
            this.AT_Camera_Front_Flashlight &&
            this.AT_Camera_Back_ReadQR &&
            this.AT_Microphone_Speaker &&
            this.AT_Usb_Data &&
            this.AT_Usb_Power &&
            this.AT_IMEI_Blacklist &&
            this.AT_Simcard &&
            this.AT_Activation_Lock &&
            this.AT_Carrier_Lock &&
            this.AT_Warranty) {
            this.all_automated_tests = true;
        }
        else {
            this.all_automated_tests = false;
            this.alltests = false;
        }
        if (this.all_automated_tests && this.all_manual_tests) {
            this.alltests = true;
        }
        else {
            this.alltests = false;
        }
    };
    SuitesComponent.prototype.All_manual_testscases = function () {
        if (this.MT_Touchscreen_singletouch &&
            this.MT_Touchscreen_multitouch &&
            this.MT_Screen_Brightness &&
            this.MT_Dead_Pixels &&
            this.MT_Fingerprint &&
            this.MT_Home_Button &&
            this.MT_Volume_Buttons &&
            this.MT_Silent_Mode &&
            this.MT_Vibration &&
            this.MT_Accelerometer &&
            this.MT_Compass &&
            this.MT_Flashlight &&
            this.MT_Camera_front &&
            this.MT_camera_back &&
            this.MT_MicroPhone &&
            this.MT_Speaker &&
            this.MT_Headphone &&
            this.MT_USB_Port &&
            this.MT_USB_Power &&
            this.MT_Proximity_Sensor &&
            this.MT_Phone_Call &&
            this.MT_Cosemetic_Damage &&
            this.MT_Heavy_Damage &&
            this.MT_Water_Damage &&
            this.MT_Simcard &&
            this.MT_Cellular &&
            this.MT_Buletooth &&
            this.MT_wifi &&
            this.MT_Gps &&
            this.MT_Activation_lock &&
            this.MT_Carrier_Lock) {
            this.all_manual_tests = true;
        }
        else {
            this.all_manual_tests = false;
            this.alltests = false;
        }
        if (this.all_automated_tests && this.all_manual_tests) {
            this.alltests = true;
        }
        else {
            this.alltests = false;
        }
    };
    SuitesComponent.prototype.showAllAutomationTests = function () {
        this.AT_wifi = true;
        this.AT_Cellular = true;
        this.AT_Blutooth = true;
        this.AT_Gps = true;
        this.AT_device_not_jailbroken = true;
        this.AT_Battery_charge = true;
        this.AT_Vibration_Accelerometer = true;
        this.AT_Camera_Back_Flashlight = true;
        this.AT_Camera_Front_Flashlight = true;
        this.AT_Camera_Back_ReadQR = true;
        this.AT_Microphone_Speaker = true;
        this.AT_Usb_Data = true;
        this.AT_Usb_Power = true;
        this.AT_IMEI_Blacklist = true;
        this.AT_Simcard = true;
        this.AT_Activation_Lock = true;
        this.AT_Carrier_Lock = true;
        this.AT_Warranty = true;
    };
    SuitesComponent.prototype.HideAllAutomationTests = function () {
        this.AT_wifi = false;
        this.AT_Cellular = false;
        this.AT_Blutooth = false;
        this.AT_Gps = false;
        this.AT_device_not_jailbroken = false;
        this.AT_Battery_charge = false;
        this.AT_Vibration_Accelerometer = false;
        this.AT_Camera_Back_Flashlight = false;
        this.AT_Camera_Front_Flashlight = false;
        this.AT_Camera_Back_ReadQR = false;
        this.AT_Microphone_Speaker = false;
        this.AT_Usb_Data = false;
        this.AT_Usb_Power = false;
        this.AT_IMEI_Blacklist = false;
        this.AT_Simcard = false;
        this.AT_Activation_Lock = false;
        this.AT_Carrier_Lock = false;
        this.AT_Warranty = false;
    };
    SuitesComponent.prototype.ShowAllManualTests = function () {
        this.MT_Touchscreen_singletouch = true;
        this.MT_Touchscreen_multitouch = true;
        this.MT_Screen_Brightness = true;
        this.MT_Dead_Pixels = true;
        this.MT_Fingerprint = true;
        this.MT_Home_Button = true;
        this.MT_Volume_Buttons = true;
        this.MT_Silent_Mode = true;
        this.MT_Vibration = true;
        this.MT_Accelerometer = true;
        this.MT_Compass = true;
        this.MT_Flashlight = true;
        this.MT_Camera_front = true;
        this.MT_camera_back = true;
        this.MT_MicroPhone = true;
        this.MT_Speaker = true;
        this.MT_Headphone = true;
        this.MT_USB_Port = true;
        this.MT_USB_Power = true;
        this.MT_Proximity_Sensor = true;
        this.MT_Phone_Call = true;
        this.MT_Cosemetic_Damage = true;
        this.MT_Heavy_Damage = true;
        this.MT_Water_Damage = true;
        this.MT_Simcard = true;
        this.MT_Cellular = true;
        this.MT_Buletooth = true;
        this.MT_wifi = true;
        this.MT_Gps = true;
        this.MT_Activation_lock = true;
        this.MT_Carrier_Lock = true;
    };
    SuitesComponent.prototype.HideAllManualTests = function () {
        this.MT_Touchscreen_singletouch = false;
        this.MT_Touchscreen_multitouch = false;
        this.MT_Screen_Brightness = false;
        this.MT_Dead_Pixels = false;
        this.MT_Fingerprint = false;
        this.MT_Home_Button = false;
        this.MT_Volume_Buttons = false;
        this.MT_Silent_Mode = false;
        this.MT_Vibration = false;
        this.MT_Accelerometer = false;
        this.MT_Compass = false;
        this.MT_Flashlight = false;
        this.MT_Camera_front = false;
        this.MT_camera_back = false;
        this.MT_MicroPhone = false;
        this.MT_Speaker = false;
        this.MT_Headphone = false;
        this.MT_USB_Port = false;
        this.MT_USB_Power = false;
        this.MT_Proximity_Sensor = false;
        this.MT_Phone_Call = false;
        this.MT_Cosemetic_Damage = false;
        this.MT_Heavy_Damage = false;
        this.MT_Water_Damage = false;
        this.MT_Simcard = false;
        this.MT_Cellular = false;
        this.MT_Buletooth = false;
        this.MT_wifi = false;
        this.MT_Gps = false;
        this.MT_Activation_lock = false;
        this.MT_Carrier_Lock = false;
    };
    SuitesComponent.prototype.addTestSuites = function () {
        if (this.run_manualtest) {
            this.data_run_manualtest = "1";
        }
        else {
            this.data_run_manualtest = "0";
        }
        if (this.alltests) {
            this.data_alltests = "1";
        }
        else {
            this.data_alltests = "0";
        }
        if (this.all_automated_tests) {
            this.data_all_automated_tests = "1";
        }
        else {
            this.data_all_automated_tests = "0";
        }
        if (this.all_manual_tests) {
            this.data_all_manual_tests = "1";
        }
        else {
            this.data_all_manual_tests = "0";
        }
        if (this.suite_enabled) {
            this.data_suite_enabled = "1";
        }
        else {
            this.data_suite_enabled = "0";
        }
        if (this.datashare.logindetails[0].user_type == "admin") {
            this.userid = this.datashare.logindetails[0].admin_id;
        }
        else {
            this.userid = this.datashare.logindetails[0].technician_id;
        }
        if (this.AT_wifi) {
            this.testcases = this.testcases + "WiFi,";
        }
        if (this.AT_Cellular) {
            this.testcases = this.testcases + "Cellular,";
        }
        if (this.AT_Blutooth) {
            this.testcases = this.testcases + "Blutooth,";
        }
        if (this.AT_Gps) {
            this.testcases = this.testcases + "GPS,";
        }
        if (this.AT_device_not_jailbroken) {
            this.testcases = this.testcases + "Device is not jailbroken,";
        }
        if (this.AT_Battery_charge) {
            this.testcases = this.testcases + "Battery Charge,";
        }
        if (this.AT_Vibration_Accelerometer) {
            this.testcases = this.testcases + "Vibration+Accelerometer,";
        }
        if (this.AT_Camera_Back_Flashlight) {
            this.testcases = this.testcases + "Camera(back)+Flashlight,";
        }
        if (this.AT_Camera_Front_Flashlight) {
            this.testcases = this.testcases + "Camera(front)-Read QR,";
        }
        if (this.AT_Camera_Back_ReadQR) {
            this.testcases = this.testcases + "Camera(back)-Read QR,";
        }
        if (this.AT_Microphone_Speaker) {
            this.testcases = this.testcases + "Microphone+Speaker,";
        }
        if (this.AT_Usb_Data) {
            this.testcases = this.testcases + "USB Data,";
        }
        if (this.AT_Usb_Power) {
            this.testcases = this.testcases + "USB Power,";
        }
        if (this.AT_IMEI_Blacklist) {
            this.testcases = this.testcases + "IMEI Blacklist,";
        }
        if (this.AT_Simcard) {
            this.testcases = this.testcases + "SIM Card,";
        }
        if (this.AT_Activation_Lock) {
            this.testcases = this.testcases + "Activation Lock,";
        }
        if (this.AT_Carrier_Lock) {
            this.testcases = this.testcases + "Carrier Lock,";
        }
        if (this.AT_Warranty) {
            this.testcases = this.testcases + "Warranty,";
        }
        if (this.MT_Touchscreen_singletouch) {
            this.testcases = this.testcases + "MT_Touchscreen(single touch),";
        }
        if (this.MT_Touchscreen_multitouch) {
            this.testcases = this.testcases + "MT_Touchscreen(multi-touch),";
        }
        if (this.MT_Screen_Brightness) {
            this.testcases = this.testcases + "MT_Screen Brightness,";
        }
        if (this.MT_Dead_Pixels) {
            this.testcases = this.testcases + "MT_Dead pixels,";
        }
        if (this.MT_Fingerprint) {
            this.testcases = this.testcases + "MT_Fingerprint Reader,";
        }
        if (this.MT_Home_Button) {
            this.testcases = this.testcases + "MT_Home Button,";
        }
        if (this.MT_Volume_Buttons) {
            this.testcases = this.testcases + "MT_Volume Buttons,";
        }
        if (this.MT_Silent_Mode) {
            this.testcases = this.testcases + "MT_Silent Mode Switch,";
        }
        if (this.MT_Vibration) {
            this.testcases = this.testcases + "MT_Vibration,";
        }
        if (this.MT_Accelerometer) {
            this.testcases = this.testcases + "MT_Accelerometer,";
        }
        if (this.MT_Compass) {
            this.testcases = this.testcases + "MT_Compass,";
        }
        if (this.MT_Flashlight) {
            this.testcases = this.testcases + "MT_Flashlight,";
        }
        if (this.MT_Camera_front) {
            this.testcases = this.testcases + "MT_Camera(front),";
        }
        if (this.MT_camera_back) {
            this.testcases = this.testcases + "MT_Camera(back),";
        }
        if (this.MT_MicroPhone) {
            this.testcases = this.testcases + "MT_MicroPhone,";
        }
        if (this.MT_Speaker) {
            this.testcases = this.testcases + "MT_Speaker,";
        }
        if (this.MT_Headphone) {
            this.testcases = this.testcases + "MT_Headphone Jack,";
        }
        if (this.MT_USB_Port) {
            this.testcases = this.testcases + "MT_USB Port,";
        }
        if (this.MT_USB_Port) {
            this.testcases = this.testcases + "MT_USB Power,";
        }
        if (this.MT_Proximity_Sensor) {
            this.testcases = this.testcases + "MT_Proximity Sensor,";
        }
        if (this.MT_Phone_Call) {
            this.testcases = this.testcases + "MT_Phone Call,";
        }
        if (this.MT_Cosemetic_Damage) {
            this.testcases = this.testcases + "MT_Cosemetic Damage,";
        }
        if (this.MT_Heavy_Damage) {
            this.testcases = this.testcases + "MT_Heavy Damage,";
        }
        if (this.MT_Water_Damage) {
            this.testcases = this.testcases + "MT_Water Damage,";
        }
        if (this.MT_Simcard) {
            this.testcases = this.testcases + "MT_SIM Card,";
        }
        if (this.MT_Cellular) {
            this.testcases = this.testcases + "MT_Cellular,";
        }
        if (this.MT_Buletooth) {
            this.testcases = this.testcases + "MT_Buletooth,";
        }
        if (this.MT_wifi) {
            this.testcases = this.testcases + "MT_WiFi,";
        }
        if (this.MT_Gps) {
            this.testcases = this.testcases + "MT_GPS,";
        }
        if (this.MT_Activation_lock) {
            this.testcases = this.testcases + "MT_Activation Lock,";
        }
        if (this.MT_Carrier_Lock) {
            this.testcases = this.testcases + "MT_Carrier Lock";
        }
        var data1 = new http_2.URLSearchParams();
        data1.append('suite_title', this.suite_title);
        data1.append('only_manual', this.data_run_manualtest);
        data1.append('automated_tests', this.data_all_automated_tests);
        data1.append('all_tests', this.data_alltests);
        data1.append('manual_tests', this.data_all_manual_tests);
        data1.append('test_names', this.testcases);
        data1.append('suite_enabled', this.data_suite_enabled);
        if (this.datashare.Edit_TestSuites_Detials.length != 0) {
            data1.append('test_device_id', this.datashare.Edit_TestSuites_Detials[0].test_device_id);
        }
        else {
        }
        if (this.datashare.logindetails[0].user_type == "admin") {
            data1.append('admin_id', this.datashare.logindetails[0].admin_id);
        }
        else {
            data1.append('technician_id', this.datashare.logindetails[0].technician_id);
        }
        var body = data1.toString();
        console.log(body);
        this.webservice.getuser(body, this.datashare.Test_Suites_API).subscribe(function (data) {
            console.log(data.json());
            if (data.json().status == false) {
                alert(data.json().message);
            }
            else {
                alert(data.json().message);
            }
            (function (err) {
                alert("error getting");
            });
        });
    };
    return SuitesComponent;
}());
SuitesComponent = __decorate([
    core_1.Component({
        selector: 'dialog-add-suites',
        templateUrl: './app/Settings/testsuites/add-suites.component.html',
        styleUrls: ['./app/Settings/testsuites/add-suites.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, app_service_1.WebServiceComponent, datashare_1.DataShare])
], SuitesComponent);
exports.SuitesComponent = SuitesComponent;
var DevicesImagesComponent = (function () {
    function DevicesImagesComponent(dialogRef, webservice, datashare) {
        this.dialogRef = dialogRef;
        this.webservice = webservice;
        this.datashare = datashare;
        console.log(this.datashare.edit_deviceimage);
        if (this.datashare.edit_deviceimage == "Edit") {
            this.device_name = this.datashare.Edit_deviceimage_Detials.device_name;
            this.os_type = this.datashare.Edit_deviceimage_Detials.os_type;
            this.os_version = this.datashare.Edit_deviceimage_Detials.os_version;
            this.image_name = this.datashare.Edit_deviceimage_Detials.image_name;
            if (this.datashare.Edit_deviceimage_Detials.image_enabled == "1") {
                this.image_enabled = true;
            }
            else {
                this.image_enabled = false;
            }
        }
        else {
            /*
            this.device_name="";
            this.os_type="";
            this.os_version="";
            this.image_name="";
             this.image_enabled=false;
              */
        }
    }
    DevicesImagesComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
            console.log(this.file.name);
            this.image_name = this.file.name;
        }
        console.log(this.file.name);
        console.log(this.file);
    };
    DevicesImagesComponent.prototype.adddeviceimages = function () {
        if (this.image_enabled) {
            this.image_enabled_data = "1";
        }
        else {
            this.image_enabled_data = "0";
        }
        var formData = new FormData();
        formData.append('device_name', this.device_name);
        formData.append('os_type', this.os_type);
        formData.append('os_version', this.os_version);
        formData.append('image_enabled', this.image_enabled_data);
        formData.append('image_name', this.file);
        console.log(this.datashare.logindetails[0].user_type);
        console.log(this.datashare.logindetails[0].admin_id);
        if (this.datashare.logindetails[0].user_type == "admin") {
            formData.append('admin_id', this.datashare.logindetails[0].admin_id);
        }
        else {
            formData.append('technician_id', this.datashare.logindetails[0].technician_id);
        }
        if (this.datashare.edit_deviceimage == "Edit") {
            formData.append('device_image_id', this.datashare.Edit_deviceimage_Detials.device_image_id);
            this.url = this.datashare.Edit_Deviceimages_API;
        }
        else {
            this.url = this.datashare.Register_Deviceimages_API;
        }
        this.webservice.Uploadimages(formData, this.url).subscribe(function (data) {
            alert(data.json().message);
            console.log(data.json());
            (function (err) {
                alert("error getting");
            });
        });
    };
    return DevicesImagesComponent;
}());
DevicesImagesComponent = __decorate([
    core_1.Component({
        selector: 'dialog-add-deviceimages',
        templateUrl: './app/Settings/deviceimages/add-deviceimages.component.html',
        styleUrls: ['./app/Settings/deviceimages/add-deviceimages.component.css']
    })
    //export class DevicesImagesComponent {
    //constructor(public dialogRef: MdDialogRef<DevicesImagesComponent>) {}
    //}
    ,
    __metadata("design:paramtypes", [material_1.MdDialogRef, app_service_1.WebServiceComponent, datashare_1.DataShare])
], DevicesImagesComponent);
exports.DevicesImagesComponent = DevicesImagesComponent;
var SitesComponent = (function () {
    function SitesComponent(dialogRef, webservice, datashare) {
        this.dialogRef = dialogRef;
        this.webservice = webservice;
        this.datashare = datashare;
        this.device = true;
        if (this.datashare.edit_site == "Edit") {
            console.log("edit client details" + this.datashare.edit_client);
            this.name = this.datashare.Edit_Site_Detials.name;
            this.phone = this.datashare.Edit_Site_Detials.phone;
            this.address1 = this.datashare.Edit_Site_Detials.address;
            this.address2 = this.datashare.Edit_Site_Detials.address_line_2;
            this.city = this.datashare.Edit_Site_Detials.city;
            this.state = this.datashare.Edit_Site_Detials.state;
            this.postalcode = this.datashare.Edit_Site_Detials.zipcode;
            this.country = this.datashare.Edit_Site_Detials.country;
            this.note = this.datashare.Edit_Site_Detials.notes;
            if (this.datashare.Edit_Site_Detials.site_enabled == 1) {
                this.site_enabled = "1";
                this.device = true;
            }
            else {
                this.site_enabled = "0";
                this.device = false;
            }
            this.site_id = this.datashare.Edit_Site_Detials.site_id;
            this.open_popup = this.datashare.edit_site;
        }
        else {
            this.name = "";
            this.phone = "";
            this.address1 = "";
            this.address2 = "";
            this.city = "";
            this.state = "";
            this.postalcode = "";
            this.country = "";
            this.note = "";
            console.log("testing" + this.datashare.edit_site);
        }
    }
    SitesComponent.prototype.cancelSites = function () {
    };
    SitesComponent.prototype.addSites = function () {
        if (this.device) {
            this.site_enabled = "1";
        }
        else {
            this.site_enabled = "0";
        }
        var data1 = new http_2.URLSearchParams();
        data1.append('name', this.name);
        data1.append('phone', this.phone);
        data1.append('address', this.address1);
        data1.append('address_line_2', this.address2);
        data1.append('city', this.city);
        data1.append('state', this.state);
        data1.append('zipcode', this.postalcode);
        data1.append('notes', this.note);
        data1.append('country', this.country);
        data1.append('site_enabled', this.site_enabled);
        if (this.open_popup == "Edit") {
            this.url = this.datashare.Site_Edit_API;
            data1.append('site_id', this.site_id);
        }
        else {
            this.url = this.datashare.Sites_Register_API;
        }
        var body = data1.toString();
        console.log(body);
        this.webservice.getuser(body, this.url).subscribe(function (data) {
            if (data.json().status == false) {
                alert(data.json().message);
            }
            console.log(data.json());
            (function (err) {
                alert("error getting");
            });
        });
    };
    return SitesComponent;
}());
SitesComponent = __decorate([
    core_1.Component({
        selector: 'sites-example-dialog',
        templateUrl: './app/Settings/sites/add-site.component.html',
        styleUrls: ['./app/Settings/sites/add-site.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, app_service_1.WebServiceComponent, datashare_1.DataShare])
], SitesComponent);
exports.SitesComponent = SitesComponent;
var AboutComponent = (function () {
    function AboutComponent(dialogRef, dialog) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.opensourcelicense = [{ name: 'Angular' }, { name: 'ngMaterial' }, { name: 'Material Icons' }, { name: 'Electron' }, { name: 'Angular' }, { name: 'ngMaterial' }, { name: 'Material Icons' }, { name: 'Electron' }, { name: 'Angular' }, { name: 'ngMaterial' }, { name: 'Material Icons' }, { name: 'Electron' }];
    }
    AboutComponent.prototype.LicenseDialog = function () {
        this.dialog.open(LicenseComponent);
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about-component',
        templateUrl: './app/Settings/about/about.component.html',
        styleUrls: ['./app/Settings/about/about.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, material_1.MdDialog])
], AboutComponent);
exports.AboutComponent = AboutComponent;
var LicenseComponent = (function () {
    function LicenseComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return LicenseComponent;
}());
LicenseComponent = __decorate([
    core_1.Component({
        selector: 'license-component',
        templateUrl: './app/Settings/about/license/license.component.html',
        styleUrls: ['./app/Settings/about/license/license.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], LicenseComponent);
exports.LicenseComponent = LicenseComponent;
var AddClientComponent_1;
//# sourceMappingURL=setting.component.js.map