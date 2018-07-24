import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {NavigationExtras} from "@angular/router";

import {HttpModule} from '@angular/http';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {URLSearchParams} from "@angular/http"
import {WebServiceComponent} from '../Webservice/app.service';
import {DataShare} from '../DataShare/datashare';

@Component({
    selector: 'previousreport-page',
    templateUrl: './app/PreviousReport/previousreport.component.html',
    styleUrls: ['./app/PreviousReport/previousreport.component.css']
})

export class PreviousreportComponent implements OnInit {

    PreviousReport: Array<any>;
    tempdate: string = "x";
    userid: string;
    showDetails: boolean = true;
    constructor(private http: Http, private webservice: WebServiceComponent, private router: Router, public datashare: DataShare) {


        if (this.datashare.logindetails[0].user_type == "admin") {
            this.userid = this.datashare.logindetails[0].admin_id;
        }
        else {
            this.userid = this.datashare.logindetails[0].technician_id;
        }

    }
    ngOnInit() {
        console.log("sample" + this.userid);
        console.log("sample" + this.datashare.logindetails[0].admin_id);

        let data1 = new URLSearchParams();
        data1.append('technician_id', this.userid);
        let body = data1.toString();

        this.http.request(this.datashare.Previous_Report_API).subscribe(data => {
            this.PreviousReport = data.json();
            err => {
                alert("error getting")
            }
        });

    }

    ngOnChanges() {
        // changes.prop contains the old and the new value...
        console.log(this.showDetails);
    }


}

