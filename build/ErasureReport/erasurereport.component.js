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
var device = (function () {
    function device() {
    }
    return device;
}());
var ErasurereportComponent = (function () {
    function ErasurereportComponent(http) {
        this.http = http;
        this.visible = true;
        //        this.testjsondata.push(new TestJson());
    }
    ErasurereportComponent.prototype.getDevices = function () {
        var _this = this;
        this.device_subscribe = this.http.request('http://localhost:3000/devicesList')
            .subscribe(function (res) {
            _this.devices = res.json();
        });
    };
    ErasurereportComponent.prototype.installAPK = function () {
        this.device_subscribe = this.http.request('http://localhost:3000/install')
            .subscribe(function (res) {
            //this.devices = res.json() as device[];
            console.log('APK is installed');
        });
    };
    ErasurereportComponent.prototype.ngOnInit = function () {
        this.getDevices();
    };
    ErasurereportComponent.prototype.ngAfterViewInit = function () {
        console.log('View INITALIZED');
        //this.device_timer = setInterval(() => {this.getDevices();}, 5000);
    };
    ErasurereportComponent.prototype.ngOnDestroy = function () {
        //clearInterval(this.device_timer);
        this.device_subscribe.unsubscribe();
        console.log('COMP DESTROYED');
    };
    return ErasurereportComponent;
}());
ErasurereportComponent = __decorate([
    core_1.Component({
        selector: 'erasurereport-page',
        templateUrl: './app/ErasureReport/erasurereport.component.html',
        styleUrls: ['./app/ErasureReport/erasurereport.component.css'],
        providers: [device]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ErasurereportComponent);
exports.ErasurereportComponent = ErasurereportComponent;
//# sourceMappingURL=erasurereport.component.js.map