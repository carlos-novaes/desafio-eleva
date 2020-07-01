import { Component, OnInit } from '@angular/core';
import { School } from '../_services/interfaces';
import { HttpService } from '../_services/http/http.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  constructor(private http: HttpService) {}

  schools: Array<any>;

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools() {
    this.http.getSchools().subscribe((data: Array<School>) => {
      console.log(data);
      this.schools = data;
    });
  }
}
