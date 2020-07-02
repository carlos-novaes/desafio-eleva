import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { School, Class, Student } from '../_services/interfaces';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewClassComponent } from '../new-class/new-class.component';
import { MatTableDataSource } from '@angular/material/table';
import { NewStudentComponent } from '../new-student/new-student.component';
import { StudentListComponent } from '../student-list/student-list.component';

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
        this.http.createClass(data).subscribe(() => {
          this.getClasses(this.id);
        });
      } else {
        console.log('canceled');
      }
    });
  }

  createStudent(classId: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '275px';

    dialogConfig.data = {
      classId,
      title: 'Cadastrar Estudante'
    };
    console.log(classId);
    const dialogRef = this.dialog.open(NewStudentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: Student) => {
      if (typeof data === 'object') {
        this.http.createStudent(data).subscribe();
      } else {
        console.log('canceled');
      }
    });
  }

  listStudents(classId: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';

    dialogConfig.data = {
      classId,
      title: 'Lista de Alunos'
    };
    console.log(classId);
    const dialogRef = this.dialog.open(StudentListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
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
      this.getSchoolDetails(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
