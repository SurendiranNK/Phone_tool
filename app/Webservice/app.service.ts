import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Response, Headers} from '@angular/http';
//import 'Adb';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
 
@Injectable()

export class WebServiceComponent
{
   // Adb:any;   
    constructor (private http: Http) {     
    }

	getuser(data:string, url:string)
	{
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
       
      return this.http.post(
            url, 
            data,
            {headers:headers}
        )
.map(res => res)
.catch(this.handleError);



	}

  devicesList(url:string)
  {
    var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            
          return this.http.get(
                url, 
                {headers:headers}
            )
    .map(res => res)
    .catch(this.handleError);

  }

  installApk(url:string)
  {
    var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            
          return this.http.get(
                url, 
                {headers:headers}
            )
    .map(res => res)
    .catch(this.handleError);

  }
  
  
  
  
  
  Uploadimages(formData:FormData,url:string)  
  {     
     return this.http.post(url,formData)  
            .map((response: Response) => {  
              return response;                 
            }).catch(this.handleError);             
  }  



  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }
  
  
  
  
}