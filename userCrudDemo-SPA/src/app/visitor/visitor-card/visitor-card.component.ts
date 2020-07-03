import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visitor-card',
  templateUrl: './visitor-card.component.html',
  styleUrls: ['./visitor-card.component.css']
})
export class VisitorCardComponent implements OnInit {

  @Input() visitor;
  constructor() { }

  ngOnInit(): void {
  }

}
