import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolUpdateComponent } from './school-update/school-update.component';
import { NewSchoolComponent } from './new-school/new-school.component';
import { NewClassComponent } from './new-class/new-class.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { StudentListComponent } from './student-list/student-list.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'schools-list', component: SchoolListComponent },
  { path: 'school/:id', component: SchoolUpdateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainPageComponent,
    SchoolListComponent,
    SchoolUpdateComponent,
    NewSchoolComponent,
    NewClassComponent,
    NewStudentComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatExpansionModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // debugging purposes only
    )
  ],
  entryComponents: [
    NewSchoolComponent,
    NewClassComponent,
    NewStudentComponent,
    StudentListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
