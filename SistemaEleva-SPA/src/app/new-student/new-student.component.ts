import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../_services/interfaces';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  title: string;
  classId: number;
  name: string;
  mother: string;
  father: string;
  phoneNumber: string;
  dob: Date;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewStudentComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.classId = data.classId;
    this.title = data.title;
  }

  ngOnInit(): void {}

  saveChanges() {
    const student: Student = {
      classId: this.classId,
      dateOfBirth: this.dob,
      father: this.father,
      mother: this.mother,
      phoneNumber: this.phoneNumber,
      name: this.name
    };
    console.log(student);

    this.dialogRef.close(student);
  }

  close() {
    this.dialogRef.close('canceled');
  }
}
