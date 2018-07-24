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
var app_service_1 = require("../Webservice/app.service");
var datashare_1 = require("../DataShare/datashare");
var socketService_1 = require("./socketService");
var ErasurereportComponent = (function () {
    function ErasurereportComponent(http, webservice, router, datashare, socketService) {
        var _this = this;
        this.http = http;
        this.webservice = webservice;
        this.router = router;
        this.datashare = datashare;
        this.socketService = socketService;
        this.url = 'http://localhost:3000/devicesList';
        this.webservice.devicesList(this.url)
            .subscribe(function (data) {
            _this.devices = data.json();
        });
    }
    ErasurereportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.devices = new Array();
        this.socketService.on('addDevice', function (device) {
            _this.devices.push(device);
        });
        this.socketService.on('removeDevice', function (device) {
            var vendorId = device.vendorId;
            var updatedDevices;
            updatedDevices = _this.devices.filter(function (el) {
                return el.vendorId !== vendorId;
            });
            _this.devices = updatedDevices;
        });
    };
    // Let's disconnect
    ErasurereportComponent.prototype.ngOnDestroy = function () {
    };
    return ErasurereportComponent;
}());
ErasurereportComponent = __decorate([
    core_1.Component({
        selector: 'erasurereport-page',
        templateUrl: './app/ErasureReport/erasurereport.component.html',
        styleUrls: ['./app/ErasureReport/erasurereport.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, app_service_1.WebServiceComponent, router_1.Router, datashare_1.DataShare, socketService_1.SocketService])
], ErasurereportComponent);
exports.ErasurereportComponent = ErasurereportComponent;
//# sourceMappingURL=erasurereport.component.js.map