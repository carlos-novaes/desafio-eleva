import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { School, Class } from '../_services/interfaces';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewClassComponent } from '../new-class/new-class.component';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-school-update',
  templateUrl: './school-update.component.html',
  styleUrls: ['./school-update.component.scss']
})
export class SchoolUpdateComponent implements OnInit {
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  private sub: any;
  id: number;
  name: string;
  address: string;
  headmaster: string;
  city: string;
  phoneNumber: string;
  classes: Array<Class>;

  displayedColumns: string[] = ['id', 'schoolId', 'name', 'year', 'students'];
  dataSource: MatTableDataSource<any>;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getSchoolDetails(this.id);
    this.getClasses(this.id);
  }

  getSchoolDetails(schoolId: number) {
    this.http.getSchoolDetails(schoolId).subscribe((school: School) => {
      this.id = schoolId;
      this.name = school.name;
      this.address = school.address;
      this.headmaster = school.headmaster;
      this.city = school.city;
      this.phoneNumber = school.phoneNumber;
    });
  }

  getClasses(schoolId: number) {
    this.http.getClasses(schoolId).subscribe((ans: Array<any>) => {
      console.log(ans);
      this.classes = ans;
      this.dataSource = new MatTableDataSource(this.classes);
    });
  }

  createClass() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '225px';

    dialogConfig.data = {
      schoolId: this.id,
      title: 'Create Class'
    };
    const dialogRef = this.dialog.open(NewClassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: Class) => {
      if (typeof data === 'object') {
        this.http.createClass(data).subscribe();
      } else {
        console.log('canceled');
      }
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
