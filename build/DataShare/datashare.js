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
var DataShare = (function () {
    function DataShare() {
        /*
       
       public login_API: string ='http://localhost:3000/api/authenticate';
       
       public Changepassword_API:string ='http://localhost:3000/api/editpassword';
       
       //public Previous_Report_API: string ='http://aryvartdev.com/clara_phonetool/api/Report/reports'
       public Previous_Report_API: string ='http://localhost:3000/getprereport';
       
       public Display_Clientdetails_API: string ='http://localhost:3000/api/client_details';
       
       public Display_Techniciandetails_API: string ='http://localhost:3000/api/technician_details';
       
       public Display_Sitesdetails_API: string ='http://localhost:3000/api/site_details';
       
       
       public Client_Register_API: string ='http://localhost:3000/api/client_register';
       
       
       public Technician_Register_API: string ='http://localhost:3000/api/technician_register';
       
       public Sites_Register_API: string ='http://localhost:3000/api/site_register';
       
       public Test_Suites_API: string ='http://localhost:3000/api/testsuites_register';
       
       
       public Client_Edit_API: string ='http://localhost:3000/api/edit_client';
       
       
       
       public Site_Edit_API: string ='http://localhost:3000/api/edit_site';
       
       public Technician_Edit_API: string ='http://localhost:3000/api/edit_technician';
       
       
       public Display_Testsuites_API: string ='http://localhost:3000/api/testsuites_details';
       
       public Display_Deviceimages_API: string='http://localhost:3000/api/device_images_details'; */
        this.login_API = 'http://localhost:3000/login';
        this.Changepassword_API = 'http://localhost:3000/editpassword';
        //public Previous_Report_API: string ='http://aryvartdev.com/clara_phonetool/api/Report/reports'
        this.Previous_Report_API = 'http://localhost:3000/getprereport';
        this.Display_Clientdetails_API = 'http://localhost:3000/client_details';
        this.Display_Techniciandetails_API = 'http://localhost:3000/technician_details';
        this.Display_Sitesdetails_API = 'http://localhost:3000/site_details';
        this.Client_Register_API = 'http://localhost:3000/client_register';
        this.Technician_Register_API = 'http://localhost:3000/technician_register';
        this.Sites_Register_API = 'http://localhost:3000/site_register';
        this.Test_Suites_API = 'http://localhost:3000/testsuites_register';
        this.Client_Edit_API = 'http://localhost:3000/edit_client';
        this.Site_Edit_API = 'http://localhost:3000/edit_site';
        this.Technician_Edit_API = 'http://localhost:3000/edit_technician';
        this.Display_Testsuites_API = 'http://localhost:3000/testsuites_details';
        this.Display_Deviceimages_API = 'http://localhost:3000/device_images_details';
        this.Display_register_devicimages_API = 'http://localhost:3000/device_images_register';
        this.Register_Deviceimages_API = 'http://localhost:3000/device_images_register';
        this.Edit_Deviceimages_API = 'http://localhost:3000/device_images_edit';
    }
    return DataShare;
}());
DataShare = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], DataShare);
exports.DataShare = DataShare;
//# sourceMappingURL=datashare.js.map