import { Component, OnInit, TemplateRef } from '@angular/core';
import { VisitorService } from 'src/app/_services/visitor.service';
import { ActivatedRoute } from '@angular/router';
import { Visitor } from '../../_models/visitor';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.css']
})
export class VisitorDetailsComponent implements OnInit {

  visitor: Visitor;
  modalRef: BsModalRef;

  constructor(private visitorService: VisitorService, private route: ActivatedRoute, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.visitor = data['visitor'];
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}
