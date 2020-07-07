import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Visitor } from '../_models/visitor';

@Injectable()
export class VisitorService {

    baserUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Visitor[]>{
        return this.http.get<Visitor[]>(this.baserUrl + 'visitor');
    }

    getVisitor(id: number): Observable<Visitor>{
        return this.http.get<Visitor>(this.baserUrl + 'visitor/' + id);
    }

    updateVisitor(id: number, visitor: Visitor) {
        return this.http.put(this.baserUrl + 'visitor/' + id, visitor);
    }

}
