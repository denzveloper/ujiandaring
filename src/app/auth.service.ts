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
    return this.http.post("http://localhost/htdocs/api/api.php", form);
  }

}
