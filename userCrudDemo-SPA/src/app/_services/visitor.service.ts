import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class VisitorService {

    baserUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(this.baserUrl + 'visitor');
    }

}
