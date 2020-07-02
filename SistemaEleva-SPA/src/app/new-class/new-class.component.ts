import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../_services/http/http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from '../_services/interfaces';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss']
})
export class NewClassComponent implements OnInit {
  title: string;
  schoolId: number;
  name: string;
  year: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewClassComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.schoolId = data.schoolId;
    this.title = data.title;
  }

  ngOnInit(): void {}

  saveChanges() {
    const classroom: Class = {
      schoolId: this.schoolId,
      name: this.name,
      year: this.year,
      students: null
    };
    console.log(classroom);

    this.dialogRef.close(classroom);
  }

  close() {
    this.dialogRef.close('canceled');
  }
}
