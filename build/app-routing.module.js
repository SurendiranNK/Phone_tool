"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("./Login/login.component");
var dashboard_component_1 = require("./Dashboard/dashboard.component");
var editprofile_component_1 = require("./Editprofile/editprofile.component");
var previousreport_component_1 = require("./PreviousReport/previousreport.component");
var erasurereport_component_1 = require("./ErasureReport/erasurereport.component");
var functionalityreport_component_1 = require("./FunctionalityReport/functionalityreport.component");
var setting_component_1 = require("./Settings/setting.component");
exports.router = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'editprofile', component: editprofile_component_1.EditProfileComponent },
    { path: 'previousreport', component: previousreport_component_1.PreviousreportComponent },
    { path: 'erasurereport', component: erasurereport_component_1.ErasurereportComponent },
    { path: 'functionalityreport', component: functionalityreport_component_1.FunctionalityReportComponent },
    { path: 'settings', component: setting_component_1.SettingComponent },
];
exports.routes = router_1.RouterModule.forRoot(exports.router);
//# sourceMappingURL=app-routing.module.js.map