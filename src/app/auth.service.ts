import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  dologin(form){
    //Harap ganti address
    // return this.http.post("http://1603046.domainon.top/api.php", form);
    return this.http.post("http://localhost/htdocs/api/api.php", form);
  }

  doupload(form){
    //Harap ganti address
    return this.http.post("http://stahrul.1603046.domainon.top/api.php", form);
  }

}
