import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewSchoolComponent } from '../new-school/new-school.component';
import { Router } from '@angular/router';
import { School } from '../_services/interfaces';
import { HttpService } from '../_services/http/http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private http: HttpService) {}

  ngOnInit(): void {}

  openNewSchoolDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '200px';

    dialogConfig.data = {
      title: 'Criar Nova Escola'
    };
    const dialogRef = this.dialog.open(NewSchoolComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: string) => {
      if (data !== 'cancel') {
        const schoolToCreate: School = {
          name: data,
          address: null,
          city: null,
          classes: null,
          headmaster: null,
          phoneNumber: null
        };
        this.http.createSchool(schoolToCreate).subscribe((schoolId: number) => {
          this.router.navigateByUrl(`/school/${schoolId}`);
        });
      } else {
        console.log('canceled');
      }
    });
  }
}
