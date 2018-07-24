import { Component } from '@angular/core';
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
  selector: 'editprofile-page',
 
  templateUrl: './app/Editprofile/editprofile.component.html',
  styleUrls: ['./app/Editprofile/editprofile.component.css']
})
export class EditProfileComponent{

editusername:string;
password : string;
confirmpassword:string;
userid : string;
usertype: string;



 constructor(private http: Http,private webservice: WebServiceComponent,private datashare:DataShare) {

this.editusername=this.datashare.logindetails[0].username;
this.usertype=this.datashare.logindetails[0].user_type;
console.log(this.usertype);
console.log(this.editusername);
console.log(this.datashare.logindetails[0].admin_id);





 }

getEditprofileDetails()
{

if (this.password == this.confirmpassword)
{
	let data1 = new URLSearchParams();

if(this.usertype == "admin")
{
  
  data1.append('admin_id', this.datashare.logindetails[0].admin_id);

  
}
else
{
  

   data1.append('technician_id', this.datashare.logindetails[0].technician_id);
}


  
  data1.append('password',this.password);
let body = data1.toString();
console.log(body);
  this.webservice.getuser(body, this.datashare.Changepassword_API).subscribe(data =>{

if(data.json().status == true)
{
 
 console.log(data.json().message);
 alert(data.json().message)

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
else
{
	alert("password and conform password not matched")

}


}




}