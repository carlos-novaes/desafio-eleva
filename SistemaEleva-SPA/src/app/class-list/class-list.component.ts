import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http/http.service';
import { Router } from '@angular/router';
import { Class } from '../_services/interfaces';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}

  schoolId: number;
  classes: Array<any>;

  ngOnInit(): void {
    this.schoolId = Number(this.router.url.split('/')[2]);
    this.getClasses(this.schoolId);
  }

  getClasses(schoolId: number) {
    this.http.getClasses(schoolId).subscribe((data: Array<Class>) => {
      this.classes = data;
    });
  }
}
