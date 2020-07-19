import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitor } from '../_models/visitor';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  visitor: Visitor;
  constructor(private fb: FormBuilder, private auth: AuthService,
              private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.visitor = Object.assign({}, this.registerForm.value);
      this.auth.register(this.visitor).subscribe(() => {
        this.alertify.success('Visitor Registered Successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.auth.login(this.visitor).subscribe(() => {
          this.router.navigate(['/visitor']);
        });
      });
    }
  }

  loggedIn() {
    return this.auth.loggedIn();
  }
}
