import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Visitor } from '../_models/visitor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';

constructor(private http: HttpClient) { }

register(visitor: Visitor){
  return this.http.post(this.baseUrl + 'register', visitor);
}

}
