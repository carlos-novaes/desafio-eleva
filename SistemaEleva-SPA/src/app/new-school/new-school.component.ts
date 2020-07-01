import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { School } from '../_services/interfaces';

@Component({
  selector: 'app-new-school',
  templateUrl: './new-school.component.html',
  styleUrls: ['./new-school.component.scss']
})
export class NewSchoolComponent implements OnInit {
  form: FormGroup;
  title: string;

  school: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, []]
    });
  }

  save() {
    this.dialogRef.close(this.school);
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
