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
var TestJson = (function () {
    function TestJson() {
    }
    return TestJson;
}());
var device = (function () {
    function device() {
    }
    return device;
}());
var FunctionalityReportComponent = (function () {
    function FunctionalityReportComponent(http) {
        this.http = http;
        this.done_device = [];
        this.testjsondata = [];
        this.visible = true;
        //        this.testjsondata.push(new TestJson());
    }
    FunctionalityReportComponent.prototype.getDevices = function () {
        var _this = this;
        console.log("get devices called");
        this.device_subscribe = this.http.request('http://localhost:3000/devicesList').subscribe(function (res) { _this.devices = res.json(); });
    };
    FunctionalityReportComponent.prototype.ngOnInit = function () {
        this.installAPK();
        this.getDevices();
    };
    FunctionalityReportComponent.prototype.ngAfterViewInit = function () {
        console.log('View INITALIZED');
        //this.device_timer = setInterval(() => {this.getDevices();}, 10000);
        this.getDevices();
        this.updateReadyList();
    };
    FunctionalityReportComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.device_timer);
        clearInterval(this.test_timer);
        if (this.report_subscribe) {
            this.report_subscribe.unsubscribe();
        }
        this.device_subscribe.unsubscribe();
        console.log('COMP DESTROYED');
    };
    FunctionalityReportComponent.prototype.gettestdata = function (serialNo) {
        var _this = this;
        console.log('looking for test data file');
        console.log("get Report for : " + serialNo);
        var reqURL = "";
        if (serialNo == null || serialNo == "") {
            reqURL = 'http://localhost:3000/testreport';
        }
        else {
            reqURL = 'http://localhost:3000/testreport?sNo=' + serialNo;
        }
        console.log(reqURL);
        this.http.request(reqURL)
            .subscribe(function (res) {
            console.log("response for get data :" + res.text());
            if (res.text() == 'FILE_NOT_FOUND') {
                console.log('FILE_NOT_FOUND Try again');
            }
            else {
                _this.testjsondata = res.json();
            }
        });
    };
    FunctionalityReportComponent.prototype.onStart = function () {
        var _this = this;
        this.visible = false;
        this.http.request('http://localhost:3000/autorunapk')
            .subscribe(function (res) { alert(res); }).unsubscribe();
        setTimeout(function () {
            console.log('lets auto run APK');
            _this.gettestdata(null);
        }, 3);
    };
    FunctionalityReportComponent.prototype.installAPK = function () {
        this.http.request('http://localhost:3000/install')
            .subscribe(function (res) {
            console.log("Install Response : " + res);
        }, function (error) { return console.log("Error: ", error); }).unsubscribe();
        setTimeout(function () { console.log('Installing the interval'); }, 3);
    };
    FunctionalityReportComponent.prototype.deviceCheck = function (serialNo) {
        this.gettestdata(serialNo);
    };
    FunctionalityReportComponent.prototype.refreshDeviceList = function () {
        console.log("Refresh devices");
        this.getDevices();
    };
    //to get ready result list
    FunctionalityReportComponent.prototype.updateReadyList = function () {
        var _this = this;
        this.http.request('http://localhost:3000/getreadymap')
            .subscribe(function (res) { _this.done_device = res.json(); });
        for (var item in this.done_device) {
            console.log(item);
        }
        setTimeout(function () { console.log('interviewing the interval'); _this.updateReadyList(); }, 3000);
        console.log("Refresh devices");
    };
    FunctionalityReportComponent.prototype.onAbort = function () {
        this.visible = true;
        clearInterval(this.test_timer);
        this.report_subscribe.unsubscribe();
        console.log('abort called');
    };
    return FunctionalityReportComponent;
}());
FunctionalityReportComponent = __decorate([
    core_1.Component({
        selector: 'functionality-page',
        templateUrl: './app/FunctionalityReport/functionalityreport.component.html',
        styleUrls: ['./app/FunctionalityReport/functionalityreport.component.css'],
        providers: [device]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], FunctionalityReportComponent);
exports.FunctionalityReportComponent = FunctionalityReportComponent;
//# sourceMappingURL=functionalityreport.component.js.map