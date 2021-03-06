// Global Stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';


// Services
import { VisitorService } from './_services/visitor.service';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthGuard } from './_guards/auth.guard';
import { VisitorDetailResolver } from './_resolvers/visitor-details.resolver';
import { VisitorListResolver } from './_resolvers/visitor-list.resolver';
import { VisitorEditResolver } from './_resolvers/visitor-edit.resolver';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { VisitorListComponent } from './visitor/visitor-list/visitor-list.component';
import { VisitorCardComponent } from './visitor/visitor-card/visitor-card.component';
import { VisitorDetailsComponent } from './visitor/visitor-details/visitor-details.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VisitorEditComponent } from './visitor/visitor-edit/visitor-edit.component';
import { PhotoEditorComponent } from './visitor/photo-editor/photo-editor.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisitorListComponent,
    VisitorCardComponent,
    VisitorDetailsComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    VisitorEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
      }
   }),
   BsDropdownModule.forRoot(),
   ModalModule.forRoot(),
   PaginationModule.forRoot()
  ],
  providers: [VisitorService, AuthService, AlertifyService, ErrorInterceptorProvider,
    AuthGuard, VisitorDetailResolver, VisitorListResolver, VisitorEditResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
