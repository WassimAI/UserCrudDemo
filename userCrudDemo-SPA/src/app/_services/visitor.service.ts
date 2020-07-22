import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Visitor } from '../_models/visitor';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable()
export class VisitorService {

    baserUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll(page?, pageSize?): Observable<PaginationResult<Visitor[]>>{

        const paginationResult: PaginationResult<Visitor[]> = new PaginationResult<Visitor[]>();
        let params = new HttpParams();

        if( page != null && pageSize != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', pageSize);
        }


        return this.http.get<Visitor[]>(this.baserUrl + 'visitor', {observe: 'response', params})
        .pipe(
            map(response => {
                paginationResult.result = response.body;
                if(response.headers.get('Pagination') != null) {
                    paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }
                return paginationResult;
            })
        );
    }

    getVisitor(id: number): Observable<Visitor>{
        return this.http.get<Visitor>(this.baserUrl + 'visitor/' + id);
    }

    updateVisitor(id: number, visitor: Visitor) {
        return this.http.put(this.baserUrl + 'visitor/' + id, visitor);
    }

}
