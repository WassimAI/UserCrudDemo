import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Visitor } from '../_models/visitor';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
decodedToken;

constructor(private http: HttpClient) { }

register(visitor: Visitor){
  return this.http.post(this.baseUrl + 'register', visitor);
}

login(visitor: any){
  return this.http.post(this.baseUrl + 'login', visitor).pipe(
    map((response: any) => {
      const visitor = response;
      this.decodedToken = this.jwtHelper.decodeToken(visitor.token);
      if (visitor) {
        localStorage.setItem('token', visitor.token);
      }
    })
  );
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
