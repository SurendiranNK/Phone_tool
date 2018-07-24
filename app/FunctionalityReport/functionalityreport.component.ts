import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ISubscription} from "rxjs/Subscription";

class TestJson {
    name: string;
    result: string;
}

class device {
    model: string;
    manufacturer: string;
    serialNo: string;
    version: string;
}

@Component({
    selector: 'functionality-page',
    templateUrl: './app/FunctionalityReport/functionalityreport.component.html',
    styleUrls: ['./app/FunctionalityReport/functionalityreport.component.css'],
    providers: [device]
})


export class FunctionalityReportComponent implements OnInit, OnDestroy, AfterViewInit {
    public devices: device[];
    public done_device: String[] = [];
    public testjsondata: TestJson[] = [];
    test_timer: any;
    device_timer: any;
    report_subscribe: ISubscription;
    device_subscribe: ISubscription;
    visible: boolean = true;

    constructor(private http: Http) {
        //        this.testjsondata.push(new TestJson());
    }

    getDevices() {
        console.log("get devices called");
        this.device_subscribe = this.http.request('http://localhost:3000/devicesList').subscribe(res => {this.devices = res.json() as device[];});

    }

    ngOnInit() {
        this.installAPK();
        this.getDevices();
    }

    ngAfterViewInit() {
        console.log('View INITALIZED');
        //this.device_timer = setInterval(() => {this.getDevices();}, 10000);
        this.getDevices();
        this.updateReadyList();
    }

    ngOnDestroy() {
        clearInterval(this.device_timer);
        clearInterval(this.test_timer);
        if (this.report_subscribe) {
            this.report_subscribe.unsubscribe();
        }
        this.device_subscribe.unsubscribe();
        console.log('COMP DESTROYED');
    }

    gettestdata(serialNo : any) {
        console.log('looking for test data file');
        console.log("get Report for : "+serialNo);
        var reqURL = "";
        if(serialNo == null || serialNo == "") {
            reqURL = 'http://localhost:3000/testreport';
        } else {
            reqURL = 'http://localhost:3000/testreport?sNo='+serialNo;
        }
        console.log(reqURL);
        this.http.request(reqURL)
        .subscribe(res => {
                console.log("response for get data :"+res.text());
                if (res.text() == 'FILE_NOT_FOUND') {
                    console.log('FILE_NOT_FOUND Try again');
                } else {
                    this.testjsondata = res.json() as TestJson[];
                }
        });
    }

    onStart() {
        this.visible = false;
        this.http.request('http://localhost:3000/autorunapk')
              .subscribe(res => {alert(res)}).unsubscribe();
          setTimeout(() => {
            console.log('lets auto run APK'); this.gettestdata(null)}, 3);
    }

    installAPK(){
      this.http.request('http://localhost:3000/install')
          .subscribe(res => {
                console.log("Install Response : " +res);
          },
          error => console.log("Error: ", error),
        ).unsubscribe();
      setTimeout(() => {console.log('Installing the interval');},3);
    }

    deviceCheck(serialNo){
        this.gettestdata(serialNo);
    }

    refreshDeviceList() {
        console.log("Refresh devices");
        this.getDevices();
    }

    //to get ready result list
    updateReadyList(){
        this.http.request('http://localhost:3000/getreadymap')
            .subscribe(res => { this.done_device = res.json() as String[];});

        for (var item in this.done_device) {
            console.log(item);
        }

        setTimeout(() => {console.log('interviewing the interval'); this.updateReadyList()}, 3000);
        console.log("Refresh devices");
    }

    onAbort() {
        this.visible = true;
        clearInterval(this.test_timer);
        this.report_subscribe.unsubscribe();
        console.log('abort called');
    }
}
