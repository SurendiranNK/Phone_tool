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
var PreviousreportComponent = (function () {
    function PreviousreportComponent(http, webservice, router, datashare) {
        this.http = http;
        this.webservice = webservice;
        this.router = router;
        this.datashare = datashare;
        this.tempdate = "x";
        this.showDetails = true;
        if (this.datashare.logindetails[0].user_type == "admin") {
            this.userid = this.datashare.logindetails[0].admin_id;
        }
        else {
            this.userid = this.datashare.logindetails[0].technician_id;
        }
    }
    PreviousreportComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("sample" + this.userid);
        console.log("sample" + this.datashare.logindetails[0].admin_id);
        var data1 = new http_2.URLSearchParams();
        data1.append('technician_id', this.userid);
        var body = data1.toString();
        this.http.request(this.datashare.Previous_Report_API).subscribe(function (data) {
            _this.PreviousReport = data.json();
            (function (err) {
                alert("error getting");
            });
        });
    };
    PreviousreportComponent.prototype.ngOnChanges = function () {
        // changes.prop contains the old and the new value...
        console.log(this.showDetails);
    };
    return PreviousreportComponent;
}());
PreviousreportComponent = __decorate([
    core_1.Component({
        selector: 'previousreport-page',
        templateUrl: './app/PreviousReport/previousreport.component.html',
        styleUrls: ['./app/PreviousReport/previousreport.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, app_service_1.WebServiceComponent, router_1.Router, datashare_1.DataShare])
], PreviousreportComponent);
exports.PreviousreportComponent = PreviousreportComponent;
//# sourceMappingURL=previousreport.component.js.map