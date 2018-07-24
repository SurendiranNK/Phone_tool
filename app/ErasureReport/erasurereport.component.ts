import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {WebServiceComponent} from '../Webservice/app.service';
import {DataShare} from '../DataShare/datashare';
import {Observable} from 'rxjs/Rx';
import {ISubscription} from "rxjs/Subscription";
import * as io from 'socket.io-client';


class device {
    model: string;
    manufacturer: string;
    serialNo: string;
    version: string;
}

@Component({
    selector: 'erasurereport-page',
    templateUrl: './app/ErasureReport/erasurereport.component.html',
    styleUrls: ['./app/ErasureReport/erasurereport.component.css'],
    providers: [device]
})
export class ErasurereportComponent implements OnInit, OnDestroy {
    public devices: device[];
    test_timer: any;
    device_timer: any;
    device_subscribe: ISubscription;
    visible: boolean = true;
    
    constructor(private http: Http) {
//        this.testjsondata.push(new TestJson());
    }

    getDevices() {
        this.device_subscribe = this.http.request('http://localhost:3000/devicesList')
            .subscribe(res => {
                this.devices = res.json() as device[];
            });
    }

    installAPK() {
        this.device_subscribe = this.http.request('http://localhost:3000/install')
            .subscribe(res => {
                //this.devices = res.json() as device[];
                console.log('APK is installed');
            });
    }

    ngOnInit() {
        this.getDevices();
    }

    ngAfterViewInit() {
        console.log('View INITALIZED');
        //this.device_timer = setInterval(() => {this.getDevices();}, 5000);
    }

    ngOnDestroy() {
        //clearInterval(this.device_timer);
        this.device_subscribe.unsubscribe();
        console.log('COMP DESTROYED');
    }

}