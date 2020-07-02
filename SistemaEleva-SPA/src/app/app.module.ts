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

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolUpdateComponent } from './school-update/school-update.component';
import { NewSchoolComponent } from './new-school/new-school.component';
import { ClassListComponent } from './class-list/class-list.component';
import { NewClassComponent } from './new-class/new-class.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'schools-list', component: SchoolListComponent },
  { path: 'school/:id', component: SchoolUpdateComponent },
  { path: 'classes/:schoolId', component: ClassListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainPageComponent,
    SchoolListComponent,
    SchoolUpdateComponent,
    NewSchoolComponent,
    ClassListComponent,
    NewClassComponent
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
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // debugging purposes only
    )
  ],
  entryComponents: [NewSchoolComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
