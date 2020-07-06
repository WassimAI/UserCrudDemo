import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Visitor } from '../_models/visitor';
import {VisitorService} from '../_services/visitor.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VisitorDetailResolver implements Resolve<Visitor> {
    constructor(private visitorService: VisitorService, private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Visitor> {
        return this.visitorService.getVisitor(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/visitor']);
                return of(null);
            })
        );
    }
}
