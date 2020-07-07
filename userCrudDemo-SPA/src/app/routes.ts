import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VisitorListComponent} from './visitor/visitor-list/visitor-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { VisitorDetailsComponent } from './visitor/visitor-details/visitor-details.component';
import { VisitorDetailResolver } from './_resolvers/visitor-details.resolver';
import { VisitorListResolver } from './_resolvers/visitor-list.resolver';
import { VisitorEditComponent } from './visitor/visitor-edit/visitor-edit.component';
import { VisitorEditResolver } from './_resolvers/visitor-edit.resolver';
// import { VisitorEditResolver } from './_resolvers/visitor-edit.resolver';

export const appRoutes: Routes = [] = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'visitor', component: VisitorListComponent, canActivate: [AuthGuard], resolve: {visitors: VisitorListResolver}},
    {path: 'visitor/:id', component: VisitorDetailsComponent, canActivate: [AuthGuard], resolve: {visitor: VisitorDetailResolver}},
    {path: 'profile/edit', component: VisitorEditComponent, resolve: {visitor: VisitorEditResolver}},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];
