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
var http_2 = require("@angular/http");
//import 'Adb';
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Observable_1 = require("rxjs/Observable");
var WebServiceComponent = (function () {
    // Adb:any;   
    function WebServiceComponent(http) {
        this.http = http;
    }
    WebServiceComponent.prototype.getuser = function (data, url) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, data, { headers: headers })
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    WebServiceComponent.prototype.devicesList = function (url) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    WebServiceComponent.prototype.installApk = function (url) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    WebServiceComponent.prototype.Uploadimages = function (formData, url) {
        return this.http.post(url, formData)
            .map(function (response) {
            return response;
        }).catch(this.handleError);
    };
    WebServiceComponent.prototype.handleError = function (err) {
        var errMessage;
        if (err instanceof http_2.Response) {
            var body = err.json() || '';
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + err.statusText + " || ''} " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable_1.Observable.throw(errMessage);
    };
    return WebServiceComponent;
}());
WebServiceComponent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WebServiceComponent);
exports.WebServiceComponent = WebServiceComponent;
//# sourceMappingURL=app.service.js.map