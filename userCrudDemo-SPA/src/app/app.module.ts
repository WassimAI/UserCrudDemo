// Global Stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FormsModule} from '@angular/forms';

// Services
import { VisitorService } from './_services/visitor.service';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { VisitorListComponent } from './visitor/visitor-list/visitor-list.component';
import { VisitorCardComponent } from './visitor/visitor-card/visitor-card.component';
import { VisitorDetailsComponent } from './visitor/visitor-details/visitor-details.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisitorListComponent,
    VisitorCardComponent,
    VisitorDetailsComponent,
    NavComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [VisitorService, AuthService, AlertifyService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
