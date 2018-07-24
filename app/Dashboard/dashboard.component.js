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
var datashare_1 = require("../DataShare/datashare");
var DashboardComponent = (function () {
    function DashboardComponent(route, datashare) {
        this.route = route;
        this.datashare = datashare;
        console.log("venkatesh" + this.datashare.logindetails[0].username);
        this.username = this.datashare.logindetails[0].username;
        this.usertype = this.datashare.logindetails[0].user_type;
    }
    DashboardComponent.prototype.getloginDetails = function () {
        if (this.hide) {
            this.hide = false;
        }
        else {
            this.hide = true;
        }
    };
    DashboardComponent.prototype.hidedata = function () {
        console.log("venkatesh testing");
    };
    DashboardComponent.prototype.shutdown = function () {
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard-data',
        templateUrl: "./app/Dashboard/dashboard.component.html",
        styleUrls: ['./app/Dashboard/dashboard.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, datashare_1.DataShare])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map