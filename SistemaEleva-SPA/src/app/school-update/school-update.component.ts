import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { School, Class } from '../_services/interfaces';

@Component({
  selector: 'app-school-update',
  templateUrl: './school-update.component.html',
  styleUrls: ['./school-update.component.scss']
})
export class SchoolUpdateComponent implements OnInit {
  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {}

  private sub: any;
  id: number;
  name: string;
  address: string;
  headmaster: string;
  city: string;
  phoneNumber: string;
  classes: Array<Class>;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getSchoolDetails(this.id);
  }

  getSchoolDetails(schoolId: number) {
    this.http.getSchoolDetails(schoolId).subscribe((school: School) => {
      this.id = schoolId;
      this.name = school.name;
      this.address = school.address;
      this.headmaster = school.headmaster;
      this.city = school.city;
      this.phoneNumber = school.phoneNumber;
      this.classes = school.classes;
    });
  }

  saveChanges() {
    const school = {
      id: this.id,
      name: this.name,
      address: this.address,
      city: this.city,
      classes: this.classes,
      headmaster: this.headmaster,
      phoneNumber: this.phoneNumber
    };

    this.http.updateSchool(school).subscribe(() => {
      this.router.navigateByUrl(`/schools-list`);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
