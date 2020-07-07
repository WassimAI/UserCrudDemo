import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Visitor } from '../_models/visitor';
import {VisitorService} from '../_services/visitor.service';
import {AuthService} from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VisitorEditResolver implements Resolve<Visitor> {
    constructor(private visitorService: VisitorService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Visitor> {
        return this.visitorService.getVisitor(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/visitor']);
                return of(null);
            })
        );
    }
}
