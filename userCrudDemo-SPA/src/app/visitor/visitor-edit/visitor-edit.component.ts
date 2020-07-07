import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Visitor } from 'src/app/_models/visitor';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { VisitorService } from 'src/app/_services/visitor.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-visitor-edit',
  templateUrl: './visitor-edit.component.html',
  styleUrls: ['./visitor-edit.component.css']
})
export class VisitorEditComponent implements OnInit {

  @ViewChild('editForm', {static: true}) editForm: NgForm;
  visitor: Visitor;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private visitorService: VisitorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.visitor = data['visitor'];
    });
  }

  updateVisitor(){
    this.visitorService.updateVisitor(this.authService.decodedToken.nameid, this.visitor).subscribe(next => {
      this.alertify.success('Changes are saved!');
      this.editForm.reset(this.visitor);
    }, error => {
      this.alertify.error(error);
    });

  }

}
