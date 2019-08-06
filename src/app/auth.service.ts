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

  dologin(form){
    //Harap ganti address
    // return this.http.post("http://localhost/htdocs/api/api.php", form).pipe(timeout(10000));;
    // return this.http.post("http://localhost/htdocs/api/apiup.php", form);
    return this.http.post("http://srdoni.1603046.domainon.top/API/api.php", form).pipe(timeout(30000));
  }

  doupload(form){
    //Harap ganti address
    // return this.http.post("http://localhost/htdocs/api/aps.php", form);
    return this.http.post("http://srdoni.1603046.domainon.top/API/aps.php", form).pipe(timeout(30000));
  }

  doupasw(form){
    //Harap ganti address
    return this.http.post("http://localhost/htdocs/api/apiup.php", form);
    // return this.http.post("http://srdoni.1603046.domainon.top/API/apiup.php", form).pipe(timeout(10000));
  }

}
