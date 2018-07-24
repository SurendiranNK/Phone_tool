
import { NgModule }             from '@angular/core';
import { ModuleWithProviders }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { EditProfileComponent } from './Editprofile/editprofile.component';
import { PreviousreportComponent } from './PreviousReport/previousreport.component';
import { ErasurereportComponent } from './ErasureReport/erasurereport.component';
import { FunctionalityReportComponent } from './FunctionalityReport/functionalityreport.component';
import { SettingComponent } from './Settings/setting.component';

export const router: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
{ path: 'editprofile', component: EditProfileComponent },
{ path: 'previousreport', component: PreviousreportComponent },
{ path: 'erasurereport', component: ErasurereportComponent },
{ path: 'functionalityreport', component: FunctionalityReportComponent },
{ path: 'settings', component: SettingComponent },

  
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);
