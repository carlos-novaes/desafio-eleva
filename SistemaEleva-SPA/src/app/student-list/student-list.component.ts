import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../_services/http/http.service';
import { Student } from '../_services/interfaces';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentListComponent>,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.classId = data.classId;
    this.title = data.title;
  }
  title: string;
  id: number;
  name: string;
  classId: number;
  headmaster: string;
  phoneNumber: string;
  mother: string;
  students: Array<Student>;

  displayedColumns: string[] = ['id', 'classId', 'name', 'phoneNumber', 'mother'];
  dataSource: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getStudentsByClass(this.classId);
  }

  getStudentsByClass(classId: number) {
    this.http.getStudentsByClass(classId).subscribe((ans: Array<any>) => {
      console.log(ans);
      this.students = ans;
      this.dataSource = new MatTableDataSource(this.students);
    });
  }

  close() {
    this.dialogRef.close('canceled');
  }
}
