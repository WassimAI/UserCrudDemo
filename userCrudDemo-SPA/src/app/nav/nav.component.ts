import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  visitor: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit(): void {
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('Logout Successfull');
    this.route.navigate(['/home']);
  }

  login(){
    this.authService.login(this.visitor).subscribe(() => {
      this.alertify.success('Login Successfull');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.route.navigate(['/home']);
    });
  }

}
