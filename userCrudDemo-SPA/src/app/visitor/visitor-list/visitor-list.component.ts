import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/_services/visitor.service';
import { Visitor } from 'src/app/_models/visitor';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PaginationResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {

  visitors: Visitor[];
  visitor: Visitor = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};
  pagination: Pagination;
  constructor(private visitorService: VisitorService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.visitors = data['visitors'].result;
      this.pagination = data['visitors'].pagination;
    });

    console.log(this.pagination);

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadVisitors();
  }

  loadVisitors(){
      this.visitorService.getAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginationResult<Visitor[]>) => {
          this.visitors = res.result;
          this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
