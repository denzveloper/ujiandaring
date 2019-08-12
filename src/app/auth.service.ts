import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  // Make to native PHP POST like
  // let body = new FormData();
  // body.append('nim', form.nim);
  // body.append('password', form.password);

  /*
    Usage:
    return this.http.post("-address-", form).pipe(timeout(9000));
  */

  //Test Output
  // return this.http.post("http://localhost/htdocs/api/apiup.php", form);

  dologin(form){
    //Harap ganti address
    return this.http.post("http://localhost/htdocs/api/api.php", form).pipe(timeout(10000)); //localhost
    // return this.http.post("http://f7cc64f5.ngrok.io/htdocs/api/api.php", form).pipe(timeout(10000)); //server dynamic
    // return this.http.post("http://srdoni.1603046.domainon.top/API/api.php", form).pipe(timeout(30000)); //Server
  }

  doupload(form){
    //Harap ganti address
    return this.http.post("http://localhost/htdocs/api/aps.php", form).pipe(timeout(10000)); //Localhost
    // return this.http.post("http://f7cc64f5.ngrok.io/htdocs/api/aps.php", form).pipe(timeout(10000)); //server dynamic
    // return this.http.post("http://srdoni.1603046.domainon.top/API/aps.php", form).pipe(timeout(30000)); //Server
  }

  doupasw(form){
    //Harap ganti address
    return this.http.post("http://localhost/htdocs/api/app.php", form).pipe(timeout(10000)); //Localhost
    // return this.http.post("http://srdoni.1603046.domainon.top/API/apiup.php", form).pipe(timeout(10000)); //Server
  }

}
