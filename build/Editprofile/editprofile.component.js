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
var http_2 = require("@angular/http");
var app_service_1 = require("../Webservice/app.service");
var datashare_1 = require("../DataShare/datashare");
var EditProfileComponent = (function () {
    function EditProfileComponent(http, webservice, datashare) {
        this.http = http;
        this.webservice = webservice;
        this.datashare = datashare;
        this.editusername = this.datashare.logindetails[0].username;
        this.usertype = this.datashare.logindetails[0].user_type;
        console.log(this.usertype);
        console.log(this.editusername);
        console.log(this.datashare.logindetails[0].admin_id);
    }
    EditProfileComponent.prototype.getEditprofileDetails = function () {
        if (this.password == this.confirmpassword) {
            var data1 = new http_2.URLSearchParams();
            if (this.usertype == "admin") {
                data1.append('admin_id', this.datashare.logindetails[0].admin_id);
            }
            else {
                data1.append('technician_id', this.datashare.logindetails[0].technician_id);
            }
            data1.append('password', this.password);
            var body = data1.toString();
            console.log(body);
            this.webservice.getuser(body, this.datashare.Changepassword_API).subscribe(function (data) {
                if (data.json().status == true) {
                    console.log(data.json().message);
                    alert(data.json().message);
                }
                else {
                    alert(data.json().message);
                }
                (function (err) {
                    alert("error getting");
                });
            });
        }
        else {
            alert("password and conform password not matched");
        }
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    core_1.Component({
        selector: 'editprofile-page',
        templateUrl: './app/Editprofile/editprofile.component.html',
        styleUrls: ['./app/Editprofile/editprofile.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, app_service_1.WebServiceComponent, datashare_1.DataShare])
], EditProfileComponent);
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=editprofile.component.js.map