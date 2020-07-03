import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/_services/visitor.service';
import { Visitor } from 'src/app/_models/visitor';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {

  visitors: Visitor[];
  constructor(private visitorService: VisitorService) { }

  ngOnInit(): void {
    this.visitorService.getAll().subscribe((visitors: Visitor[]) => {
      console.log(visitors);
      this.visitors = visitors;
    });
  }

}
