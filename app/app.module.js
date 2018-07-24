"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var app_service_1 = require("./Webservice/app.service");
var datashare_1 = require("./DataShare/datashare");
var material_2 = require("@angular/material");
var login_component_1 = require("./Login/login.component");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./Dashboard/dashboard.component");
var editprofile_component_1 = require("./Editprofile/editprofile.component");
var app_routing_module_1 = require("./app-routing.module");
var previousreport_component_1 = require("./PreviousReport/previousreport.component");
var erasurereport_component_1 = require("./ErasureReport/erasurereport.component");
var functionalityreport_component_1 = require("./FunctionalityReport/functionalityreport.component");
var setting_component_1 = require("./Settings/setting.component");
var setting_component_2 = require("./Settings/setting.component");
var socketService_1 = require("./ErasureReport/socketService");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            login_component_1.LoginComponent,
            dashboard_component_1.DashboardComponent,
            app_component_1.AppComponent,
            editprofile_component_1.EditProfileComponent,
            setting_component_1.SettingComponent,
            previousreport_component_1.PreviousreportComponent,
            erasurereport_component_1.ErasurereportComponent,
            functionalityreport_component_1.FunctionalityReportComponent,
            setting_component_1.SettingComponent,
            setting_component_2.AddClientComponent,
            setting_component_2.TechnicianComponent,
            setting_component_2.SuitesComponent,
            setting_component_2.DevicesImagesComponent,
            setting_component_2.SitesComponent
        ],
        entryComponents: [
            setting_component_2.AddClientComponent,
            setting_component_2.TechnicianComponent,
            setting_component_2.SuitesComponent,
            setting_component_2.DevicesImagesComponent,
            setting_component_2.SitesComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            material_1.MaterialModule,
            material_1.MdButtonModule,
            material_1.MdCheckboxModule,
            animations_1.BrowserAnimationsModule, forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule,
            app_routing_module_1.routes,
            material_2.MdDialogModule
        ],
        providers: [app_service_1.WebServiceComponent, datashare_1.DataShare, socketService_1.SocketService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map