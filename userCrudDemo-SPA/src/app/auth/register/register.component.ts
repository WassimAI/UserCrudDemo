import { Component, OnInit } from '@angular/core';
import { Visitor } from 'src/app/_models/visitor';
import { AuthService } from 'src/app/_services/auth.service';
import { VisitorService } from 'src/app/_services/visitor.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  visitor: any ={};

  constructor(private authService: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(this.visitor).subscribe((data) => {
      console.log(data);
      this.alertify.success('Registration Successfull');
      this.route.navigateByUrl('/home');
    }, error => {
      this.alertify.error(error);
    });
  }

}
