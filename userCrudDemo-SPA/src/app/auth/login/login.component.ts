import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visitor: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.visitor).subscribe((data) => {
      this.alertify.success('Login Successfull');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.route.navigate(['/home']);
    });
  }

}
