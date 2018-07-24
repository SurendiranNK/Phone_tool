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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var app_service_1 = require("../Webservice/app.service");
var datashare_1 = require("../DataShare/datashare");
var LoginComponent = (function () {
    function LoginComponent(http, webservice, router, datashare) {
        this.http = http;
        this.webservice = webservice;
        this.router = router;
        this.datashare = datashare;
        this.url = 'http://192.168.0.62/clara_phonetool/index.php/api/Admin/login';
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.getloginDetails = function () {
        var _this = this;
        var data1 = new http_2.URLSearchParams();
        data1.append('username', this.username);
        data1.append('password', this.password);
        var body = data1.toString();
        this.webservice.getuser(body, this.datashare.login_API).subscribe(function (data) {
            if (data.json().status == true) {
                _this.datashare.logindetails = data.json().login;
                console.log(_this.datashare.logindetails);
                _this.router.navigate(['/editprofile']);
            }
            else {
                alert(data.json().message);
            }
            (function (err) {
                alert("error getting");
            });
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-page',
        templateUrl: './app/login/login.component.html',
        styleUrls: ['./app/login/login.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, app_service_1.WebServiceComponent, router_1.Router, datashare_1.DataShare])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map