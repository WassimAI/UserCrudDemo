import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VisitorListComponent} from './visitor/visitor-list/visitor-list.component';

export const appRoutes: Routes = [] = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'visitor', component: VisitorListComponent}
];
