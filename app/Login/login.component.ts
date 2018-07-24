import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {NavigationExtras} from "@angular/router";

import { HttpModule } from '@angular/http';
import {Http} from '@angular/http';
import { Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

import { URLSearchParams } from "@angular/http"
import { WebServiceComponent } from '../Webservice/app.service';
import { DataShare } from '../DataShare/datashare';

@Component({
  selector: 'login-page',
 
  templateUrl: './app/Login/login.component.html',
  styleUrls: ['./app/Login/login.component.css']
})
export class LoginComponent implements OnInit{
	
username:string;
password:string;

private url:string='http://192.168.0.62/clara_phonetool/index.php/api/Admin/login';

 constructor(private http: Http,private webservice: WebServiceComponent,private router: Router, private datashare:DataShare) {
 }
ngOnInit()
{

}

getloginDetails()
{
let data1 = new URLSearchParams();
  data1.append('username', this.username);
  data1.append('password',this.password);
let body = data1.toString();
  this.webservice.getuser(body, this.datashare.login_API).subscribe(data =>{

if(data.json().status == true)
{
 this.datashare.logindetails = data.json().login;
 this.router.navigate(['/editprofile']);
}
else
{
  alert(data.json().message)
}
  err =>
  {
alert("error getting")

  }

});







}




}
